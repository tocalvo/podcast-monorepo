# **Podcast Monorepo**

**URL:** [Podcast App](https://podcast-app-u6fxzaqbqq-no.a.run.app/)

---

## **Estructura general**

Este proyecto es un monorepo creado con **Nx**, diseñado para tener una organización clara mediante librerías separadas por dominios y aplicaciones.
Además, permite homogeneizar procesos como **build**, **test**, **deploy**, **pipelines** y **versionado de librerías**.
La separación por librerías y aplicaciones permite la compilación del código como la ejecución de tests de aquellos que han sido realmente afectados. 

Por ejemplo, modificar la página de podcasts no provocará un compilado de la librería de podcasts, y lanzar un "nx affected -t tests" solo ejecuta los tests de las librerías y  aplicaciones realmente afectadas por los cambios. Esto acelera mucho los pipelines y ejecuciones de tests, sobre todo si se le añade la caché compartida que permite que una compilación o unos tests lanzados en local, no se repitan en el entorno de CI y muestre los resultados cacheados.

Los mayores beneficios son: 
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

Se ha dividido en 
- `/apps` : que contiene las aplicaciones que son desplegables, como la web y el proyecto de e2e, que acaba generando un html con el report.
  - `podcast-reader`: Proyecto principal con la aplicación de podcasts y los elementos ligados por completo (pages, header, loader)
  - `podcast-reader-e2e`: El proyecto de e2e para poder crear tests e2e de los podcasts
- `libs`: librerías que contiene las distintas piezas en las que queramos organizar el repositorio para mejorar su rendimiento/organización
  -`podcasts`: Librería con todo el dominio de podcasts, componentes "sencillos" que permitan ser reusados en más apps, hooks con los datos, modelos, utils vinculadas al dominio.


Ya dentro de la app de podcast-reader tenemos:
- `/deploy`: Ficheros que permiten su deploy al entorno.
- `/public`: Ficheros que irán en la raiz del servidor con el index.html como el favicon
- `/src`: 
  - `/app/components`: Componentes que están vinculados al 100% a esta app (Header, loader)
  - `/app/pages`: Páginas con URL que están vinculados al 100% a esta app que tiene la lógica y luego envían los contenidos a los componentes más sencillos
- `/.env.development`: variables para desarrollo
- `/.env.production`: variables para producción

* Los ficheros de entornos se han añadido para poder evitar el uso del servicio de all origins al lanzarlo en local ya que ralentiza mucho, pero es el recomendado en los requisitos y necesario para poder desplegar en una URL y que no dé error de CORS

Y dentro de la carpeta libs cada dominio debería de tener su propia librería con estos fichero en la carpeta de su tipo.
- `<dominio>/components`
- `<dominio>/hooks` 
- `<dominio>/models`
- `<dominio>/utils`

La separación por dominios hace fácil:
1. La localización y el mantenimiento: 
Tener todos los elementos de un dominio en un solo lugar simplifica la búsqueda de componentes, hooks o modelos específicos, evitando confusión o duplicación.

2. Encapsulación del dominio:
Cada dominio gestiona su lógica y dependencias de manera aislada, reduciendo acoplamientos innecesarios entre diferentes partes del sistema.

3. Transpilación optimizada:
Al estar todos los elementos de un dominio dentro de la misma librería, se compilan juntos, lo que acelera los tiempos de build y minimiza problemas relacionados con dependencias entre dominios.

4. Reutilización y escalabilidad:
Este enfoque permite compartir fácilmente elementos de un dominio entre distintas aplicaciones sin afectar a otros dominios. Además, facilita escalar o migrar partes del sistema sin alterar su estructura global.

5. Pruebas aisladas:
Al mantener la lógica de cada dominio en una librería específica, las pruebas unitarias y de integración se pueden ejecutar de forma más precisa, enfocándose en el impacto real de los cambios.



**Temas de diseño:**

- Diseño con **CSS puro** por requerimiento, ya que suelo usar una librería de componentes (MUI, gluestack o similar) que permita proporcionar un theme por prop o contexto y que suelo colocar en una librería independiente.
- Estructura con **Flexbox** para facilitar la adaptación entre mobile y desktop.
- Al usarse solo CSS, y no saber la metodologia a seguir para su nomenclatura, se accede a los estilos mediante indexación para dar soporte al más habitual que es el kebab-case, por ejemplo "block--modifier" de forma que se accedería mediante "styles["block--modifier"]"

---

## **Herramientas principales**

### **Vite**

- Usado como constructor rápido y eficiente para React. Salvo necesidad de plugins no actualizados lo prefiero a webpack por su velocidad en cuanto crece mucho el repositorio.

### **TanStack Query**

- Simplifica el almacenamiento y la persistencia de datos. Se crean hooks para recubrirlo y manejar la lógica alrededor de los podcast.
- Permite añadirle persistencia por localStorage o definir una propia.
- Tiene opciones para establecerle el tiempo de cacheo de las peticiones para cumplir el requisito de las 24h.
- Por el tamaño de la app y no tener muchos datos derivados que persistir o compartir, no he usado contextapi ni Redux ni Zustand.

### **Vitest**

- Framework de testing unitario rápido y ligero.

### **Playwright**

- Herramienta para pruebas E2E muy extendida
- Potente extensión para VSCode que permite acelerar mucho el desarrollo de tests por su generación de código y debug,
- Fácil integración con **Cucumber.js** para soportar features escritas en Gherkin.

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

(Se pueden modificar las reglas por defecto para ser más o menos reestrictivos modificando el fichero de eslint en la raiz del monorepo)

También se pueden lanzar los comandos solo de los elementos (apps o libs) que se han visto afectados por los cambios que se tengan realizados
```bash
# Ejecutar linter o tests en todas las aplicaciones
nx affected -t=lint
nx affected -t=test
```

Para ver las dependecias entre proyectos y librerías de manera sencillas:

```bash
nx graph
```

O formatear todo el código con prettier:
```bash
nx format

# Si solo se quiere ver los ficheros afectados pero sin ejecutarlo se pueden añadiendo check
nx format:check
```

### **Comandos específicos para una aplicación**

Se usa la sintaxis de "nx <comando> <aplicación>" por ejemplo:

```bash
# Modo desarrollo con live reloading
nx serve podcast-reader

# Ejecutar pruebas E2E (requiere tener el modo desarrollo lanzado o especificarle una URl para probar)
nx e2e podcast-reader-e2e

# Construir un artefacto desplegable que se almacena en la carpeta "/dist" del monorepo
nx build podcast-reader

# Construir un artefacto como prod y lanzarlo en local
nx preview podcast-reader

# Crear entorno para despliegue (requiere terraform y gcloud en el sistema y especificar el id del proyecto)
nx createenv podcast-reader

# Desplegar aplicación (requiere modificar el id del proyecto)
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
  Al ser una web con ficheros estáticos lo mejor sería por precio, disponibilidad y escalabilidad añadirla a un bucket, pero al no tener un dominio propio la he incluido en una cloud function para aprovechar el tier gratuito y la url que proporcionan gratuitamente.

### **Alternativas**:

- Si se cuenta con un clúster Kubernetes (K8s), se puede preparar un Dockerfile para desplegar.
- Sin embargo, **Cloud Functions o AWS Lambda** suelen ser más económicas para webs ligeras combinadas con un **CDN** y buenas configuraciones de cabeceras HTTP.

---

Este enfoque asegura **modularidad, escalabilidad y eficiencia en costos**, adaptándose a futuras necesidades de tecnología y equipo.

## **Puntos a mejorar**
- Modificar el naming de los ficheros para usar kebab-case para evitar problemas entre SO con las mayúsculas
- Reemplazar el servicio de allOrigin por otro que no ralentice tanto
- Desplegar en cada Rama con PR y lanzar los lint/test/e2e
- Añadir caché compartida
