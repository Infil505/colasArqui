# Bookstore Queue

CRUD **diferido** para **Autores** y **Editoriales** con **CloudAMQP (RabbitMQ)**, **Netlify Functions** y **Vue 3 + Vite**.

## ✅ Checklist de requisitos
1. **CloudAMQP y cola `bookstore`**: usa `CLOUDAMQP_URL` y `QUEUE_NAME=bookstore`.
2. **Autores**: componentes y funciones para **listar** y **administrar** (agregar/modificar/eliminar) en **forma diferida** (`/api/queue-authors` + `/api/authors-get`).
3. **Editoriales**: idem autores (`/api/queue-publishers` + `/api/publishers-get`).
4. **Botón frontend**: `Actualizar datos` → llama **`POST /api/run-queue`** y **refresca** automáticamente las listas (evento `refresh-data`).
5. **Publicación**: **backend** en **Netlify**. **frontend** puede ir en Netlify/Vercel/GitHub Pages. El FE permite configurar `VITE_API_BASE` para apuntar al backend en Netlify.
6. **Entrega ZIP**: este paquete excluye `node_modules` y `dist` por `.gitignore`.


## Frontend: `VITE_API_BASE` (opcional)
Si publicas el FE fuera de Netlify y necesitas apuntar al backend absoluto, crea un `.env` en `web/`:
```
VITE_API_BASE=https://tu-sitio-backend.netlify.app
```

## Scripts útiles
- `npm install` (raíz) → dependencias backend
- `cd web && npm install` → dependencias frontend
- `netlify dev` → backend local en `http://localhost:8888`
- `cd web && npm run dev` → frontend local en `http://localhost:5173`
- `cd web && npm run build` → generar `dist/` del frontend

## Notas
- Los `POST` envían `Content-Type: application/json`.
- Tras **Actualizar datos**, se dispara un evento global `refresh-data` que recarga las listas.
