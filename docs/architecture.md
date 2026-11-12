# Arquitectura v1

## Resumen

La v1 de `gcorbella.cat` sera una web multiidioma con rutas reales, pensada para presentar el perfil profesional de Guille Corbella y demostrar capacidad tecnica de extremo a extremo.

La aplicacion se construira como un monolito web moderno:

- Next.js para interfaz, rutas y backend web
- PostgreSQL para persistencia
- Docker para empaquetado
- Docker Compose para orquestacion simple
- Nginx para exponer el sitio en produccion

## Objetivos del sistema

- servir una web publica rapida y bien estructurada
- mostrar contenido profesional en tres idiomas
- almacenar mensajes de contacto
- permitir crecimiento futuro sin rehacer la arquitectura
- reducir superficie de ataque en la primera version

## Arquitectura tecnica

### Aplicacion

Se plantea una sola aplicacion Next.js con:

- renderizado orientado a SEO
- rutas por idioma
- paginas estaticas o hibridas para contenido publico
- acciones o endpoints de servidor para contacto y lectura de datos
- `next-intl` como base para la internacionalizacion

### Base de datos

PostgreSQL almacenara:

- proyectos
- traducciones de proyectos
- mensajes de contacto
- taxonomias opcionales como tags o categorias

### Infraestructura

Produccion prevista:

- dominio `gcorbella.cat`
- Nginx en frontal
- contenedor `web` ejecutando Next.js
- contenedor `db` con PostgreSQL
- red interna entre servicios
- certificados TLS

Servicios previstos:

- `proxy`
  Nginx publico para TLS y reverse proxy
- `web`
  aplicacion Next.js en contenedor
- `db`
  PostgreSQL no expuesto publicamente

## Rutas

Rutas principales por idioma:

- `/ca`
- `/es`
- `/en`

Paginas:

- `/[locale]`
- `/[locale]/about`
- `/[locale]/projects`
- `/[locale]/projects/[slug]`
- `/[locale]/contact`

Decision tomada:

- el idioma siempre aparecera en la URL
- la v1 no traducira segmentos de ruta como `about` o `projects`
- los slugs de proyecto seran compartidos entre idiomas
- el locale por defecto sera `ca`

## Estrategia multiidioma

Se distinguen tres tipos de contenido:

### 1. Interfaz

Textos cortos de navegacion, botones, mensajes y etiquetas.

Propuesta:

- archivos de traduccion por idioma
- claves estables para mantener consistencia
- soporte gestionado con `next-intl`

### 2. Contenido fijo

Textos de presentacion, about, servicios y parte del CV.

Propuesta:

- archivos de contenido por idioma o modulos tipados
- controlados desde el repositorio en la v1
- tono profesional y tecnico, evitando una presentacion plana o generica

### 3. Contenido persistente

Proyectos y mensajes de contacto.

Propuesta:

- proyectos con datos comunes en una tabla principal
- contenido traducido en tabla separada por locale

## Modelo de datos inicial

### projects

Campos propuestos:

- `id`
- `slug`
- `repo_url`
- `demo_url`
- `cover_image`
- `featured`
- `published`
- `published_at`
- `created_at`
- `updated_at`

### project_translations

Campos propuestos:

- `id`
- `project_id`
- `locale`
- `title`
- `summary`
- `overview`
- `challenge`
- `solution`
- `technical_notes`
- `results`
- `created_at`
- `updated_at`

Restricciones:

- `project_id + locale` unico
- locales limitados a `ca`, `es`, `en`

### contact_messages

Campos propuestos:

- `id`
- `name`
- `email`
- `subject`
- `message`
- `locale`
- `ip_hash` opcional
- `user_agent` opcional
- `created_at`

## Paginas y responsabilidad

### Home

Responsabilidades:

- comunicar propuesta de valor
- orientar a recruiters y clientes
- destacar proyectos
- derivar hacia CV y contacto

Direccion acordada:

- resumen breve de quien eres
- que haces y que puedes ofrecer
- muestra corta de proyectos destacados
- suficiente intriga para empujar al usuario a explorar el resto

### About

Responsabilidades:

- explicar experiencia
- definir stack y fortalezas
- explicar servicios o capacidad de colaboracion
- mostrar CV

### Projects

Responsabilidades:

- listar trabajos con buena legibilidad
- permitir exploracion por tipo o tecnologia
- priorizar calidad narrativa frente a cantidad

### Project detail

Responsabilidades:

- contar el caso completo
- demostrar criterio tecnico
- mostrar decisiones, tradeoffs y resultados

### Contact

Responsabilidades:

- ofrecer un formulario simple y fiable
- mostrar vias alternativas de contacto
- generar confianza

## Seguridad base

La seguridad de la v1 se enfocara en reducir riesgos sin introducir sistemas complejos antes de tiempo.

### Medidas de aplicacion

- validacion estricta en servidor
- sanitizacion basica de entrada
- rate limiting en el formulario de contacto
- honeypot anti-spam
- limite de tamano de payload
- manejo seguro de errores sin exponer internals

### Medidas de infraestructura

- HTTPS obligatorio
- solo exponer `80/443`
- Nginx como unico punto de entrada publico
- aplicacion y base de datos en red privada de Docker
- base de datos no accesible publicamente
- firewall basico
- logs de acceso y errores
- backups periodicos de la base de datos
- contenedor de app ejecutado con usuario no root cuando sea viable

### Decisiones de alcance por seguridad

No incluir en la v1:

- panel admin publico
- autenticacion de usuarios
- subida publica de archivos
- integraciones innecesarias de terceros

## Despliegue previsto

Flujo esperado:

1. build de la imagen Docker de la aplicacion
2. publicacion en GHCR
3. `docker compose pull` en el servidor
4. `docker compose up -d` para actualizar servicios
5. Nginx como reverse proxy hacia la app
6. TLS para `gcorbella.cat`
7. variables de entorno para secretos y configuracion

La estrategia de entrega continua se apoyara en GitHub Actions y despliegue automatizado al servidor.

Referencia:

- ver `docs/delivery.md`

## Base ya decidida

- `next-intl` para i18n
- `ca`, `es`, `en` como idiomas soportados
- `ca` como locale por defecto
- rutas con prefijo de idioma
- segmentos de ruta sin traducir en la v1
- slugs de proyecto compartidos entre idiomas
- CV como pagina estructurada y PDF
- migraciones de base de datos dentro del flujo del proyecto

## Pendientes de implementacion

- definir bloques exactos de la home
- definir el modelo detallado de proyectos
- concretar la estrategia tecnica de migraciones con Drizzle
