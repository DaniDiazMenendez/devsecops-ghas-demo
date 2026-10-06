# Guion simple para explicar DevSecOps con GitHub

Duracion sugerida: 15 minutos.

Objetivo: explicar DevSecOps en lenguaje simple, mostrando como GitHub ayuda a detectar riesgos temprano, corregirlos y mantener control sin frenar al equipo.

## 1. Apertura: que es DevSecOps

### Que digo

"DevSecOps significa integrar seguridad dentro del proceso normal de desarrollo. No es revisar seguridad al final, cuando la aplicacion ya esta lista. Es detectar problemas desde el pull request, cuando todavia son faciles y baratos de corregir."

"La idea es simple: cada cambio de codigo pasa por pruebas, revision de dependencias, analisis de seguridad y aprobaciones antes de llegar a la rama principal."

### Que muestro

Mostrar el `README.md`, especialmente el diagrama del flujo.

### Para que sirve

Sirve para que la audiencia entienda que DevSecOps no es una herramienta sola. Es un proceso:

1. Desarrollo hace cambios.
2. GitHub revisa automaticamente.
3. Seguridad aparece dentro del pull request.
4. El equipo corrige antes de mezclar.
5. El repositorio sigue siendo monitoreado.

## 2. Mostrar la aplicacion demo

### Que digo

"Esta demo tiene una API sencilla. No importa tanto la funcionalidad de negocio; lo importante es ver como el codigo entra a un flujo seguro."

"Aun siendo una aplicacion pequena, ya aplicamos buenas practicas: validacion de datos, headers seguros, limite de requests y pruebas automatizadas."

### Que muestro

Abrir `src/app.js`.

Mostrar estas partes:

- `helmet`: agrega headers de seguridad.
- `express-rate-limit`: limita abuso por exceso de requests.
- `zod`: valida que los datos recibidos tengan el formato correcto.
- Respuestas `401`, `400`, `404`, `409`: errores controlados.

### Para que sirve

Sirve para explicar que la seguridad empieza en el codigo. No se espera a produccion para descubrir entradas invalidas, abuso de endpoints o configuraciones inseguras.

## 3. Mostrar las pruebas automaticas

### Que digo

"Antes de hablar de seguridad avanzada, primero necesitamos saber que el cambio no rompe lo basico. Por eso el pipeline ejecuta pruebas automaticamente."

### Que muestro

Abrir `test/app.test.js`.

Mostrar que se prueban:

- `/health`.
- Rechazo de requests sin usuario.
- Consulta autorizada.
- Validacion de transferencias invalidas.

Despues abrir `.github/workflows/ci.yml`.

### Para que sirve

Sirve para mostrar que cada pull request debe demostrar que la aplicacion sigue funcionando. Seguridad sin pruebas es optimismo con logo corporativo.

## 4. Mostrar CI en GitHub Actions

### Que digo

"Este workflow es la primera puerta. Cada push o pull request instala dependencias, ejecuta pruebas y corre auditoria de paquetes."

### Que muestro

Abrir `.github/workflows/ci.yml`.

Mostrar:

- `npm ci`: instalacion limpia.
- `npm test`: pruebas.
- `npm run audit`: auditoria de vulnerabilidades conocidas.

Luego ir a la pestana **Actions** y abrir una corrida exitosa de `ci`.

### Para que sirve

Sirve para explicar que el control es automatico y repetible. No depende de que alguien se acuerde de correr comandos localmente.

## 5. Mostrar CodeQL

### Que digo

"CodeQL revisa el codigo buscando patrones inseguros. Es analisis estatico: mira el codigo sin tener que ejecutar la aplicacion."

"En vez de esperar a una revision manual tardia, el hallazgo aparece dentro del flujo de trabajo del desarrollador."

### Que muestro

Abrir `.github/workflows/codeql.yml`.

Mostrar:

- `languages: javascript-typescript`.
- `queries: +security-extended,security-and-quality`.
- La accion `github/codeql-action/analyze`.

Despues ir a **Actions** y mostrar una corrida exitosa de `codeql`.

Si hay resultados en **Security > Code scanning**, mostrarlos tambien.

### Para que sirve

Sirve para detectar vulnerabilidades de codigo, como uso inseguro de datos, malas practicas o patrones conocidos de riesgo.

## 6. Mostrar Dependency Review

### Que digo

"Muchas vulnerabilidades no nacen en nuestro codigo, sino en librerias de terceros. Dependency Review revisa los cambios de dependencias en cada pull request."

"Si alguien agrega una libreria vulnerable o con una licencia no permitida, el PR puede bloquearse antes de llegar a main."

### Que muestro

Abrir `.github/workflows/dependency-review.yml`.

Mostrar:

- `fail-on-severity: moderate`.
- `deny-licenses`.

Abrir algun pull request de Dependabot y mostrar la seccion de checks.

### Para que sirve

Sirve para controlar el riesgo de supply chain: dependencias, licencias y paquetes que entran al proyecto.

## 7. Explicar los 5 Pull Requests de Dependabot

### Que digo

"Estos pull requests no son un problema. Son la demo funcionando. Dependabot encontro componentes actualizables y propuso cambios automaticamente."

"La automatizacion propone, pero el equipo decide. Revisamos el cambio, miramos los checks y despues elegimos si mergear."

### Que muestro

Ir a la pestana **Pull requests**.

Mostrar los PRs abiertos:

| PR | Que actualiza | Que explico |
| --- | --- | --- |
| `actions/checkout` | Accion que descarga el codigo en los workflows | Seguridad tambien aplica al pipeline |
| `github/codeql-action` | Motor de analisis CodeQL | La herramienta de seguridad tambien debe mantenerse actualizada |
| `dependency-review-action` | Accion que revisa dependencias | El control de dependencias evoluciona |
| `actions/setup-node` | Entorno Node.js de CI | El entorno de build tambien se mantiene |
| `node:alpine` | Imagen base Docker | Cambios de runtime requieren validacion cuidadosa |

### Para que sirve

Sirve para mostrar remediacion automatica: GitHub no solo alerta, tambien propone el cambio en forma de pull request.

## 8. Mostrar Secret Scanning y Push Protection

### Que digo

"Secret scanning busca credenciales expuestas. Push protection intenta bloquear secretos antes de que lleguen al repositorio."

"La mejor vulnerabilidad es la que nunca entra al repositorio. Frase aburrida, pero correcta."

### Que muestro

Ir a **Settings > Code security and analysis**.

Mostrar:

- Secret scanning habilitado.
- Push protection habilitado.
- Dependabot habilitado.

No mostrar secretos reales. Nunca. Ni de broma.

### Para que sirve

Sirve para prevenir filtraciones de tokens, claves y credenciales.

## 9. Mostrar branch protection

### Que digo

"La rama principal esta protegida. Esto significa que los cambios deben pasar por pull request, revision y conversacion resuelta antes de mezclarse."

### Que muestro

Ir a **Settings > Rules / Branch protection** o mostrar la configuracion de proteccion de `main`.

Mostrar:

- Pull request requerido.
- Revision de CODEOWNERS.
- Conversaciones resueltas.
- Force push deshabilitado.
- Borrado de rama deshabilitado.

### Para que sirve

Sirve para evitar cambios directos sin control. El proceso no depende solo de buena voluntad.

## 10. Cierre ejecutivo

### Que digo

"DevSecOps no significa poner mas burocracia. Significa poner los controles correctos en el lugar correcto: el pull request."

"Con GitHub, el equipo ve pruebas, analisis de seguridad, dependencias, secretos y actualizaciones en el mismo lugar donde trabaja. Eso reduce friccion, mejora trazabilidad y baja el riesgo antes de llegar a produccion."

"El mensaje final es simple: seguridad temprana, automatica y visible. Menos sorpresas al final. Menos reuniones de emergencia. Todos ganan, incluso el robot sarcastico."

## Resumen en una frase

"DevSecOps con GitHub es convertir seguridad en parte natural del flujo de desarrollo: cada cambio se revisa, se prueba, se analiza y se gobierna antes de llegar a produccion."

