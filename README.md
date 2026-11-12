# gcorbella.cat

Documentacion inicial del proyecto para la web personal de Guille Corbella.

## Objetivo

Construir una web personal profesional que sirva a la vez como:

- presentacion personal como desarrollador
- portfolio de proyectos
- escaparate de habilidades de frontend, backend, datos y despliegue
- canal de contacto para oportunidades freelance y empleo

## Enfoque del proyecto

La web no sera solo una tarjeta de visita. Sera un producto completo, cuidado a nivel visual y tecnico, con una arquitectura pensada para crecer.

Objetivos principales:

- explicar quien soy y que valor puedo aportar
- mostrar proyectos con detalle tecnico y de producto
- facilitar contacto profesional
- ofrecer acceso al CV
- demostrar criterio en desarrollo, seguridad y despliegue

## Alcance de la v1

La primera version incluira rutas reales y contenido multiidioma.

### Rutas principales

- `/[locale]`
  pagina principal con presentacion, propuesta de valor y accesos a las secciones clave
- `/[locale]/about`
  experiencia, perfil, stack, servicios y CV
- `/[locale]/projects`
  listado general de proyectos
- `/[locale]/projects/[slug]`
  detalle individual de cada proyecto
- `/[locale]/contact`
  formulario de contacto y datos profesionales

### Idiomas

- catalan (`ca`)
- castellano (`es`)
- ingles (`en`)

Cada idioma tendra URL propia para mejorar claridad, SEO y mantenimiento.

Decisiones cerradas para la v1:

- libreria de i18n: `next-intl`
- locale por defecto: `ca`
- segmentos de ruta no traducidos en la v1
- slugs de proyecto compartidos entre idiomas

## Stack tecnico acordado

- frontend y backend web: Next.js
- lenguaje principal: TypeScript
- base de datos: PostgreSQL
- contenedores: Docker y Docker Compose
- registry de imagenes: GitHub Container Registry (GHCR)
- despliegue: servidor propio con Nginx como reverse proxy
- dominio: `gcorbella.cat`
- control de versiones y automatizacion: GitHub + GitHub Actions

## Principios de arquitectura

- una unica aplicacion web para reducir complejidad inicial
- rutas reales en lugar de una sola pagina con estados internos
- SEO y metadatos por pagina
- separacion clara entre contenido fijo, contenido traducible y datos persistentes
- despliegue reproducible con contenedores
- base preparada para crecer hacia blog, panel privado o CMS ligero en el futuro

## Modelo funcional

### Home

- resumen personal
- que puedo ofrecer
- proyectos destacados
- llamadas a la accion hacia portfolio, CV y contacto
- tono profesional y tecnico con suficiente personalidad para invitar a explorar el resto del sitio

### About

- experiencia y trayectoria
- stack y fortalezas
- forma de trabajar
- servicios o perfiles profesionales que puedo cubrir
- CV en version web y descarga en PDF

### Projects

- listado de proyectos
- filtros por tecnologia o categoria
- destacados

### Project detail

- contexto
- problema
- solucion
- stack
- decisiones tecnicas
- capturas o demo
- aprendizajes y resultados

### Contact

- formulario
- email profesional
- GitHub
- LinkedIn

## Seguridad

La seguridad se trabajara desde el principio, aunque la v1 evitara complejidad innecesaria.

Medidas base previstas:

- HTTPS obligatorio
- Nginx como proxy inverso
- aplicacion Node no expuesta directamente a Internet
- validacion server-side de formularios
- rate limiting en contacto
- proteccion anti-spam con honeypot y limites de payload
- consultas a base de datos parametrizadas
- variables de entorno para secretos
- base de datos no expuesta publicamente
- contenedores con redes internas y minima exposicion de puertos

La v1 no incluira panel de administracion publico ni login de usuarios.

## Evolucion prevista

Posibles fases futuras:

- panel privado para gestionar proyectos y contenido
- blog tecnico o lab
- analitica propia
- sistema de contenido editable desde base de datos
- automatizacion de despliegue

## Trabajo con GitHub y CI/CD

El proyecto se trabajara desde GitHub con una estrategia simple y profesional.

Base propuesta:

- un repositorio principal para toda la aplicacion
- ramas protegidas para `main`
- trabajo por ramas cortas de feature
- cambios integrados mediante Pull Request
- validaciones automaticas con GitHub Actions
- construccion de imagen Docker en CI
- publicacion de imagen en GHCR
- despliegue automatizado hacia el servidor en merges a `main`

La propuesta detallada queda documentada en `docs/delivery.md`.

## Siguiente paso

Base inicial cerrada. El siguiente paso ya es empezar la implementacion:

- estructura interna de la home
- modelo detallado de proyectos
- scaffolding tecnico del proyecto
