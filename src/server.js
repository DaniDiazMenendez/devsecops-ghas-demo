const { createApp } = require('./app');

const port = Number(process.env.PORT || 3000);
const app = createApp();

app.listen(port, () => {
  console.log(`DevSecOps demo API listening on port ${port}`);
});

