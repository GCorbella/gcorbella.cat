# GitHub y CI/CD

## Resumen

El proyecto se trabajara en GitHub y se desplegara con una pipeline basada en contenedores.

Decision cerrada:

- repositorio principal en GitHub
- rama `main` protegida
- trabajo por Pull Request
- CI con GitHub Actions
- imagen Docker publicada en GHCR
- despliegue al servidor con Docker Compose
- Nginx como punto de entrada publico

## Flujo de trabajo en GitHub

### Ramas

- `main`
  rama estable y desplegable
- `feature/<nombre>`
  nuevas funcionalidades
- `fix/<nombre>`
  correcciones
- `chore/<nombre>`
  mantenimiento y tooling

### Pull Requests

Reglas base:

- no trabajar directamente sobre `main`
- cada PR debe tener un objetivo claro
- solo se fusiona si los checks pasan
- las ramas se eliminan tras merge

### Commits

Convencion recomendada:

- `feat:`
- `fix:`
- `docs:`
- `refactor:`
- `test:`
- `chore:`

## Arquitectura de despliegue

Servicios previstos:

- `proxy`
  Nginx expuesto en `80/443`
- `web`
  aplicacion Next.js en contenedor
- `db`
  PostgreSQL en red privada

Reglas de exposicion:

- solo Nginx sera publico
- la app no expondra puertos al exterior
- la base de datos no sera publica

## CI

La integracion continua se ejecutara en cada Pull Request y en pushes a ramas relevantes.

Checks iniciales:

- instalacion limpia de dependencias
- comprobacion de tipos
- lint
- build de Next.js
- build de la imagen Docker

Objetivo:

- asegurar que la aplicacion compila
- evitar merges que rompan produccion
- validar que la imagen es construible antes de desplegar

## CD

La entrega continua se activara al hacer merge en `main`.

Flujo previsto:

1. GitHub Actions valida el codigo
2. construye la imagen Docker
3. publica la imagen en GHCR
4. se conecta por SSH al servidor
5. ejecuta `docker compose pull`
6. ejecuta `docker compose up -d`
7. la nueva version queda servida por Nginx

## Registry de imagenes

Se usara GitHub Container Registry.

Ventajas:

- integrado con GitHub Actions
- control simple de permisos
- buena trazabilidad entre commits, imagenes y despliegues

## Secretos y configuracion

Los secretos no viviran en el repositorio.

### En GitHub

Secretos probables:

- `SSH_HOST`
- `SSH_PORT`
- `SSH_USER`
- `SSH_PRIVATE_KEY`
- `GHCR_TOKEN` si hiciera falta un token explicito

### En el servidor

Variables probables:

- `DATABASE_URL`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- variables publicas de la app si fueran necesarias

## Seguridad de la cadena de entrega

Medidas base:

- acceso al servidor por clave SSH
- usuario de despliegue dedicado
- secretos en GitHub Secrets y ficheros de entorno del servidor
- imagenes versionadas
- base de datos solo en red interna
- actualizacion controlada con Compose

## Entornos

Base inicial:

- `local`
- `production`

El entorno `preview` puede llegar mas adelante, pero no es necesario para arrancar bien.

## Decisiones cerradas

- repo privado al inicio
- GitHub como origen de verdad
- `main` protegida
- pipeline con GitHub Actions
- despliegue con contenedores
- imagen publicada en GHCR
- servidor actualizado con Docker Compose

## Pendientes antes de implementar la pipeline

- elegir la estructura exacta de `docker-compose`
- decidir estrategia de migraciones
- definir politica de tags para imagenes
- preparar usuario y claves de despliegue en el servidor
