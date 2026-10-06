const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');

const accounts = new Map([
  ['1001', { id: '1001', owner: 'demo-user', balance: 1500 }],
  ['2002', { id: '2002', owner: 'demo-user', balance: 800 }]
]);

const transferSchema = z.object({
  fromAccountId: z.string().regex(/^\d{4}$/),
  toAccountId: z.string().regex(/^\d{4}$/),
  amount: z.number().positive().max(5000)
});

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: '10kb' }));
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 60,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', (req, res, next) => {
    const user = req.header('x-demo-user');
    if (!user) {
      return res.status(401).json({ error: 'Missing x-demo-user header' });
    }

    req.user = user;
    return next();
  });

  app.get('/api/accounts/:id', (req, res) => {
    const account = accounts.get(req.params.id);
    if (!account || account.owner !== req.user) {
      return res.status(404).json({ error: 'Account not found' });
    }

    return res.json(account);
  });

  app.post('/api/transfers', (req, res) => {
    const parsed = transferSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid transfer request' });
    }

    const { fromAccountId, toAccountId, amount } = parsed.data;
    const source = accounts.get(fromAccountId);
    const target = accounts.get(toAccountId);

    if (!source || source.owner !== req.user || !target) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (source.balance < amount) {
      return res.status(409).json({ error: 'Insufficient funds' });
    }

    source.balance -= amount;
    target.balance += amount;

    return res.status(201).json({
      status: 'accepted',
      transfer: { fromAccountId, toAccountId, amount }
    });
  });

  return app;
}

module.exports = { createApp };

