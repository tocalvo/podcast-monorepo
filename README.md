# **Podcast Monorepo**

**URL:** [Podcast App](https://podcast-app-u6fxzaqbqq-no.a.run.app/)

---

## **Estructura general**

Este proyecto es un monorepo creado con **Nx**, diseñado para tener una organización clara mediante librerías separadas por dominios y aplicaciones. Además, permite homogeneizar procesos como **build**, **test**, **deploy**, **pipelines** y **versionado de librerías**.

- **Optimización**: 
  - Construye o ejecuta tests/linter solo para los cambios realizados en el código.
  - Con una caché remota, reduce tiempos de compilación en local y en los pipelines de CI.

- **Flexibilidad tecnológica**:
  - Facilita migraciones entre frameworks (por ejemplo, de React a Next.js) y reutilización de componentes.
  - Simplifica la adopción de nuevas tecnologías.

- **Eficiencia organizativa**:
  - Permite dividir la aplicación en pequeñas apps según área o equipo, compartiendo componentes y gestionadas de forma unificada.
  - Es posible redirigir tráfico por URL hacia proyectos específicos, desplegándolos juntos desde el mismo repositorio.

---

## **Estructura de carpetas**

Dentro de cada librería (según dominio), se organiza así:
- `/components`: Componentes reutilizables.
- `/hooks`: Hooks personalizados.
- `/models`: Modelos de datos.
- `/utils`: Utilidades y helpers.

**Temas de diseño:**
- Diseño con **CSS puro** por requerimiento (suelo usar una librería de componentes y un tema en una librería).
- Estructura con **Flexbox** para facilitar la adaptación entre mobile y desktop.

---


## **Componentes**

### **Librería Podcasts**
- **Contenedores**:
  - `podcasts`: Vista principal de podcasts.
  - `podcastDetail`: Detalle de un podcast.
  - `episodeDetail`: Detalle de un episodio.
- **Componentes**:
  - `podcastCard`: Tarjeta de podcast en el listado.
  - `podcastBar`: Barra lateral reutilizable en contenedores.

### **Aplicación**
Componentes acoplados directamente a la aplicación (en este caso a modo de ejemplo):
- `header`
- `loader`

---

## **Herramientas principales**

### **Vite**
- Usado como constructor rápido y eficiente para React. Salvo necesidad de plugins no actualizados lo prefiero a webpack por su velocidad en cuanto crece mucho el repositorio.

### **TanStack Query**
- Simplifica el almacenamiento y la persistencia de datos. Se crean hooks para manejar peticiones con un tiempo de vida específico.
- Por el tamaño de la app y no tener muchos datos derivados que persistir o compartir, no he usado contextapi ni Redux ni Zustand.

### **Vitest**
- Framework de testing unitario rápido y ligero.

### **Playwright**
- Herramienta para pruebas E2E muy extendida, lo que más me gusta a la hora de seleccionarla es su extensión para vscode que permite acelerar mucho el desarrollo de tests por su generación de código, su compatibilidad y fácil integración con **Cucumber.js** para soportar features escritas en Gherkin.

---

## **Comandos habituales**

### **Comandos generales para el monorepo**
Se pueden ejecutar comandos para todo el monorepo con "nx run-many"
Por ejemplo linter o tests en toda la aplicación con:
```bash
# Ejecutar linter o tests en todas las aplicaciones
nx run-many -t=lint
nx run-many -t=test
```

### **Comandos específicos para una aplicación**
Se usa la sintaxis de "nx <comando> <aplicación>" por ejemplo:

```bash
# Ejecutar pruebas E2E
nx e2e podcast-reader-e2e

# Modo desarrollo con live reloading
nx serve podcast-reader

# Crear entorno para despliegue
nx createenv podcast-reader

# Desplegar aplicación
nx deploy podcast-reader
```

---
## **Despliegue**

### **Cloud Functions (GCP)**
- **Requisitos**:
  1. [Terraform](https://www.terraform.io/)
  2. [Gcloud cli](https://cloud.google.com/sdk/docs/install)
- **Pasos**:
  1. Crear entorno con `nx createenv podcast-reader` cambiando las variables de terraform.
  2. Desplegar con `nx deploy podcast-reader`.

- **Ventajas**:
El uso de cloud y su escritura mediante un lenguaje declarativo como terraform permite un mayor control de la infraestructura, su reproducibilidad y añadirlo a un control de versiones como mayores ventajas.
Al ser una web con ficheros estáticos lo mejor sería por precio, disponibilidad y escalabilidad añadirla a un bucket, pero al no tener un dominio propio la he incliudo en una cloud function para aprovechar el tier gratuito y la url que proporcionan gratuitamente.

### **Alternativas**:
- Si se cuenta con un clúster Kubernetes (K8s), se puede preparar un Dockerfile para desplegar.
- Sin embargo, **Cloud Functions o AWS Lambda** suelen ser más económicas para webs ligeras combinadas con un **CDN** y buenas configuraciones de cabeceras HTTP.

---

Este enfoque asegura **modularidad, escalabilidad y eficiencia en costos**, adaptándose a futuras necesidades de tecnología y equipo.
