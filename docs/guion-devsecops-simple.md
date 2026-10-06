# Guion simple: Demo DevSecOps con GitHub

Duracion sugerida: 12 a 15 minutos.

Objetivo: explicar DevSecOps sin jerga tecnica. La idea principal es mostrar que GitHub ayuda a revisar seguridad antes de que el codigo llegue a produccion.

## Mensaje principal

DevSecOps significa:

> "Poner seguridad dentro del proceso normal de desarrollo, no al final."

Antes, muchas veces se desarrollaba primero y seguridad revisaba al final. Eso generaba problemas tarde, urgencias y retrabajo.

Con DevSecOps, cada cambio pasa por controles automaticos:

1. El desarrollador propone un cambio.
2. GitHub abre o revisa un Pull Request.
3. Se ejecutan pruebas.
4. Se revisa el codigo.
5. Se revisan dependencias.
6. Se pide aprobacion humana.
7. Si todo esta bien, se puede unir a la rama principal.

La seguridad deja de ser una inspeccion final y pasa a ser parte del flujo diario.

## Que mostrar primero

Abrir el repositorio:

https://github.com/DaniDiazMenendez/devsecops-ghas-demo

Mostrar la pestaña **Pull requests**.

### Que digo

"Esta es la vista mas importante de la demo. Un Pull Request es una propuesta de cambio. Antes de que el cambio entre a la rama principal, GitHub revisa automaticamente varias cosas."

"Aca vemos que GitHub no solo espera a que alguien haga cambios. Tambien Dependabot propone actualizaciones cuando detecta componentes viejos."

## Como explicar los Pull Requests de Dependabot

### Frase simple

"Estos Pull Requests no son errores ni duplicados. Son propuestas automaticas de actualizacion."

Dependabot revisa varias partes del repositorio. Cuando encuentra algo que puede actualizarse, abre un Pull Request separado.

Por eso aparecen varios:

| Pull Request | Que significa en simple | Por que aparece separado |
| --- | --- | --- |
| `actions/checkout` | Actualiza la pieza que descarga el codigo dentro del pipeline | Es una herramienta del pipeline |
| `actions/setup-node` | Actualiza la pieza que prepara Node.js para ejecutar pruebas | Es otra herramienta distinta del pipeline |
| `github/codeql-action` | Actualiza la herramienta que analiza seguridad del codigo | Es el scanner de seguridad |
| `dependency-review-action` | Actualiza la herramienta que revisa dependencias nuevas | Es el control de librerias |
| `node:alpine` | Actualiza la imagen base del contenedor Docker | Es el entorno donde corre la app |

### Como lo explico hablando

"Parecen repetidos porque todos dicen 'Bump', que significa 'actualizar de una version a otra'. Pero no son lo mismo. Cada Pull Request actualiza una pieza distinta."

"Es como mantenimiento de un auto: una alerta puede ser para frenos, otra para aceite, otra para bateria. Todas son mantenimiento, pero no arreglan la misma cosa."

"GitHub lo separa para que el equipo pueda revisar cada cambio de forma individual. Si una actualizacion falla, no bloquea todas las demas."

## Que mostrar dentro de un Pull Request

Abrir primero el Pull Request de `actions/checkout`, porque es el mas claro.

### 1. Titulo

Ejemplo:

`Bump actions/checkout from 4 to 7`

### Que digo

"El titulo dice que se quiere actualizar una pieza del pipeline desde la version 4 a la version 7."

"No es codigo de negocio. Es una herramienta que usa GitHub Actions para traer el codigo y ejecutar los controles."

### 2. Autor

Mostrar que el autor es `dependabot[bot]`.

### Que digo

"El autor es Dependabot. Eso significa que GitHub detecto automaticamente que habia una actualizacion disponible y preparo el cambio."

### 3. Review required

Mostrar el bloque rojo **Review required**.

### Que digo

"Esto significa que, aunque el robot propuso el cambio, una persona todavia tiene que aprobarlo."

"La automatizacion ayuda, pero no decide sola. Esto es importante para gobierno."

### 4. All checks have passed

Mostrar el bloque verde **All checks have passed**.

### Que digo

"Esto significa que las validaciones automaticas salieron bien."

"Aca vemos cuatro controles pasando: pruebas, analisis de codigo, resultado de CodeQL y revision de dependencias."

### 5. Merging is blocked

Mostrar que el merge esta bloqueado.

### Que digo

"Aunque las pruebas esten verdes, el merge sigue bloqueado porque falta aprobacion humana. Este es el equilibrio correcto: automatizacion mas control."

"Verde no significa merge automatico. Verde significa: esta listo para que una persona lo revise."

## Como explicar los checks

En el Pull Request se ven checks con nombres tecnicos. Explicalos asi:

| Check en GitHub | Explicacion simple | Para que sirve |
| --- | --- | --- |
| `ci / test` | Pruebas automaticas | Confirma que la aplicacion no se rompio |
| `CodeQL` | Revision automatica de seguridad del codigo | Busca patrones riesgosos en el codigo |
| `Code scanning results` | Resultado publicado en la pestaña Security | Muestra si el cambio agrega alertas nuevas |
| `dependency-review` | Revision de librerias y dependencias | Detecta si entra una dependencia vulnerable o no permitida |

### Speech

"Estos checks son como controles de aeropuerto para el codigo. Uno revisa que funcione, otro revisa seguridad del codigo, otro revisa dependencias. Si algo falla, el cambio no deberia avanzar."

## Que pasa cuando algunos checks fallan

En algunos Pull Requests se puede ver:

`Some checks were not successful`

### Que digo

"Esto tambien es bueno para la demo. Significa que GitHub no deja pasar todo automaticamente."

"Cuando un check falla, el equipo debe revisar el motivo antes de aprobar. Puede ser una incompatibilidad, una regla de seguridad o un cambio que requiere ajuste."

"La parte importante es que el problema aparece antes del merge, no despues en produccion."

### Como manejarlo en la demo

Si un PR tiene checks fallidos, decir:

"Este PR no lo mergearia todavia. Lo usaria para mostrar que el control funciona: detecta que algo requiere revision."

Si un PR tiene todos los checks en verde, decir:

"Este PR esta listo para revision humana. Si el reviewer aprueba, se podria mergear."

## Como explicar la aplicacion sin terminos tecnicos

Abrir `src/app.js`.

No hace falta explicar librerias por nombre. Explicar que la aplicacion tiene controles basicos.

| Lo que se ve en codigo | Como lo explico simple | Para que sirve |
| --- | --- | --- |
| Headers de seguridad | La app responde con protecciones basicas para el navegador | Reduce configuraciones inseguras |
| Limite de requests | La app pone un limite a la cantidad de pedidos por minuto | Evita abuso o ataques simples por exceso de trafico |
| Validacion de datos | La app revisa que los datos recibidos tengan sentido | Evita procesar datos incorrectos o peligrosos |
| Errores controlados | La app responde con mensajes claros cuando algo esta mal | Evita fallas raras y mejora control |

### Como decirlo sin mencionar librerias

"Aca no voy a entrar en detalle tecnico. Lo importante es que la aplicacion no acepta cualquier cosa. Tiene controles para validar datos, limitar abuso y responder de forma controlada."

"Esto se relaciona con DevSecOps porque la seguridad no esta solo en GitHub. Tambien empieza en como escribimos la aplicacion."

## Si alguien pregunta por los codigos 401, 400, 404 y 409

Explicarlo asi:

| Codigo | Que significa | Ejemplo simple |
| --- | --- | --- |
| `401` | Falta identificarse | "No dijiste quien sos" |
| `400` | El pedido esta mal armado | "Me mandaste datos invalidos" |
| `404` | No se encontro lo pedido | "Esa cuenta no existe o no la podes ver" |
| `409` | Hay un conflicto con la operacion | "No hay saldo suficiente" |

### Speech

"Estos codigos son respuestas ordenadas. En vez de que la aplicacion falle de forma rara, responde de manera previsible. Eso ayuda a seguridad, soporte y operacion."

## Como explicar GitHub Actions

Abrir `.github/workflows/ci.yml`.

### Que digo

"Este archivo define que controles se ejecutan automaticamente."

"Cada vez que hay un cambio, GitHub instala la aplicacion, ejecuta pruebas y revisa dependencias."

### Que mostrar

Mostrar estas lineas:

- `npm ci`
- `npm test`
- `npm run audit`

### Explicacion simple

| Linea | Que significa |
| --- | --- |
| `npm ci` | Instala las piezas necesarias de la app |
| `npm test` | Ejecuta pruebas automaticas |
| `npm run audit` | Revisa si hay vulnerabilidades conocidas en paquetes |

## Como explicar CodeQL

Abrir `.github/workflows/codeql.yml`.

### Que digo

"CodeQL es una revision automatica de seguridad del codigo. Busca patrones que podrian ser vulnerabilidades."

"No reemplaza a una persona experta, pero ayuda a encontrar problemas temprano y de forma constante."

### Que mostrar

Mostrar:

- El workflow `codeql`.
- La ejecucion exitosa en la pestaña **Actions**.
- Si hay datos, mostrar **Security > Code scanning**.

### Para que sirve

"Sirve para detectar problemas antes de que el codigo llegue a main."

## Como explicar Dependency Review

Abrir `.github/workflows/dependency-review.yml`.

### Que digo

"Dependency Review mira las librerias que entran al proyecto. Muchas vulnerabilidades vienen de dependencias externas, no del codigo que escribimos nosotros."

"Si alguien agrega una dependencia riesgosa, GitHub puede frenar el Pull Request."

### Para que sirve

"Sirve para controlar la cadena de suministro de software."

Si la frase suena compleja, decir:

"Sirve para revisar las piezas de terceros que usamos."

## Como explicar Secret Scanning

Ir a **Settings > Code security and analysis**.

### Que digo

"Secret scanning busca claves, tokens o credenciales que alguien podria subir por error."

"Push protection intenta bloquear esos secretos antes de que entren al repositorio."

### Que mostrar

Mostrar:

- Secret scanning habilitado.
- Push protection habilitado.
- Dependabot habilitado.

### Advertencia para la demo

No mostrar ni crear secretos reales.

"Aca no vamos a pegar una credencial real para probar. Mi configuracion de supervivencia esta por encima de cero."

## Como explicar Branch Protection

Mostrar la proteccion de la rama `main`.

### Que digo

"La rama principal esta protegida. Eso significa que no cualquiera puede empujar cambios directamente sin pasar por el proceso."

"Se requiere Pull Request, revision y checks."

### Que mostrar

Mostrar:

- Pull request requerido.
- Revision requerida.
- CODEOWNERS.
- Force push deshabilitado.
- Borrado de rama deshabilitado.

### Para que sirve

"Sirve para que el proceso no dependa de la memoria o buena voluntad de las personas. GitHub lo hace cumplir."

## Orden recomendado para presentar

1. Abrir el repositorio.
2. Mostrar Pull Requests.
3. Explicar que Dependabot abrio propuestas automaticas.
4. Abrir PR `actions/checkout`.
5. Mostrar autor, checks verdes, review requerido y merge bloqueado.
6. Explicar que eso es DevSecOps: automatizacion mas aprobacion humana.
7. Mostrar `ci.yml`.
8. Mostrar `codeql.yml`.
9. Mostrar `dependency-review.yml`.
10. Mostrar settings de seguridad.
11. Cerrar con el mensaje ejecutivo.

## Cierre ejecutivo

"Esta demo muestra DevSecOps en GitHub de punta a punta. El codigo no entra directo a la rama principal. Primero pasa por pruebas, analisis de seguridad, revision de dependencias y aprobacion."

"Dependabot agrega una capa mas: no solo detecta que algo esta viejo, sino que propone el cambio en forma de Pull Request."

"La diferencia clave es esta: antes la seguridad aparecia tarde. Con este flujo, aparece temprano, visible y dentro del trabajo diario del equipo."

## Frase final

"DevSecOps con GitHub es simple: cada cambio se propone, se revisa, se prueba y se aprueba antes de llegar a produccion."

