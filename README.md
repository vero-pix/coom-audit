# Auditoria Contable COOM

Dashboard interactivo de auditoria para la Cooperativa de Trabajo Moda y Diseno de Autor (COOM).

## Deploy en Render

1. Sube este proyecto a un repositorio en GitHub
2. En Render, crea un nuevo **Static Site**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
5. Click en **Create Static Site**

El sitio estara disponible en la URL que Render te asigne (ej: `https://coom-auditoria.onrender.com`).

## Estructura

```
coom-audit/
  package.json
  public/
    index.html
  src/
    index.js
    App.js        <- Dashboard principal (React)
```

## Desarrollo local

```bash
npm install
npm start
```

Abre http://localhost:3000
