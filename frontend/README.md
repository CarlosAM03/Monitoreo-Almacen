
---

# ⚛️ 📄 `frontend/README.md`

# ⚛️ Frontend — Sistema de Monitoreo Indusrtial

## 📌 Descripción

Interfaz web que permite:

- Visualizar datos en tiempo real
- Cambiar el modo de operación del sistema
- Mostrar estado de sensores y alertas

---

## 🧠 Arquitectura

```text
Backend (WebSocket)
        ↓
   useSocket Hook
        ↓
    Dashboard UI
````

---

## 📁 Estructura

```bash
src/
├── components/    # UI reutilizable
├── hooks/         # Conexión WebSocket
├── pages/         # Dashboard
├── App.jsx
├── main.jsx
└── styles.css
```

---

## 🚀 Instalación

```bash
npm install
```

---

## ⚙️ Configuración

Archivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

---

## ▶️ Ejecución

```bash
npm run dev
```

---

## 🧩 Funcionalidades

* Dashboard en tiempo real
* Visualización de sensores:

  * Temperatura
  * Humedad
  * Gas
  * Distancia
* Indicadores:

  * Flama
  * Movimiento
* Selector de modo:

  * SIMULATION
  * SERIAL
  * WIFI (bloqueado)
* Visualización de fuente de datos

---

## 🔌 Comunicación

### WebSocket

Evento recibido:

```bash
sensor:data
```

---

## 🎨 UI

* Componentes desacoplados
* Estilos centralizados en `styles.css`
* Dashboard responsive básico

---

## ⚠️ Notas

* Requiere backend activo
* El modo WiFi aún no está disponible
* El cambio de modo se realiza vía API REST

---

## 🚀 Futuro

* Gráficas en tiempo real
* Alertas visuales avanzadas
* Diseño UI/UX mejorado
* Deploy en Vercel

---
