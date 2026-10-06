# Arquitectura de seguridad

## Controles por etapa

| Etapa | Control | Resultado esperado |
| --- | --- | --- |
| Codigo | Validacion con Zod, Helmet, rate limiting | Menos riesgo de input malicioso y configuracion insegura |
| Pull request | CI, Dependency Review, CodeQL | Feedback antes del merge |
| Repositorio | CODEOWNERS, branch protection, PR template | Gobierno simple y visible |
| Operacion | Dependabot, secret scanning, Scorecard | Monitoreo continuo de riesgo |

## Decisiones de diseno

- La API usa un header `x-demo-user` solo para mantener la demo simple.
- No hay base de datos real: evita datos sensibles y reduce ruido.
- Los hallazgos se muestran en GitHub, no en herramientas externas, para mantener una narrativa unica.

