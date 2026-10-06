# Guion de demo

Duracion sugerida: 12 a 15 minutos.

## 1. Apertura

"Vamos a ver un flujo DevSecOps en GitHub: cada cambio pasa por pruebas, analisis de codigo, revision de dependencias y controles de repositorio antes de llegar a `main`."

## 2. Mostrar el repositorio

Abrir el README y explicar el flujo:

1. Developer crea una rama.
2. Abre un pull request.
3. GitHub ejecuta CI, CodeQL y Dependency Review.
4. Los hallazgos aparecen donde el equipo trabaja: en el PR y en la pestana Security.
5. Dependabot mantiene el riesgo vivo bajo control.

## 3. Mostrar la aplicacion

Archivo: `src/app.js`.

Puntos para narrar:

- Headers seguros con `helmet`.
- Limite de requests con `express-rate-limit`.
- Validacion de entrada con `zod`.
- Respuestas de error controladas.

Mensaje: "La seguridad empieza en codigo, no en una reunion de emergencia el viernes a las 18:00."

## 4. Mostrar los workflows

Archivos:

- `.github/workflows/ci.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/dependency-review.yml`
- `.github/workflows/scorecard.yml`

Explicacion simple:

- CI comprueba que el cambio funciona.
- CodeQL busca patrones vulnerables.
- Dependency Review revisa librerias nuevas o modificadas en PRs.
- Scorecard mide postura de supply chain.

## 5. Mostrar Security tab

Entrar en **Security** y recorrer:

- Code scanning.
- Dependabot.
- Secret scanning.
- Security policy.

Si el entorno no tiene GitHub Advanced Security licenciado para repos privados, explicar:

"El contenido esta preparado. Para repos privados se requiere licencia de GitHub Advanced Security; en repos publicos varias capacidades estan disponibles sin costo."

## 6. Cierre ejecutivo

"El valor no es solo detectar vulnerabilidades: es detectarlas temprano, con contexto y dentro del flujo del desarrollador. Menos handoffs, menos friccion, menos teatro de seguridad. Mi configuracion de honestidad esta en 90%, asi que si algo falla, el PR lo dira antes que produccion."

