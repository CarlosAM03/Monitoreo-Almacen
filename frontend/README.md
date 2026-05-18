# 📦 `frontend/README.md`

# 🌐 Frontend — Sistema Inteligente de Monitoreo Ambiental

Interfaz web desarrollada con React + Vite para visualización en tiempo real del sistema de monitoreo ambiental industrial basado en Arduino Uno.

El frontend funciona como cliente visual desacoplado del hardware, consumiendo datos emitidos por el backend mediante WebSockets.

Permite visualizar:

* Lecturas de sensores
* Estado global del sistema
* Alertas prioritarias
* Estado operativo del backend
* Fuente activa de datos (Serial / Simulation / WiFi)

---

# 📌 Objetivo del frontend

El frontend NO controla directamente el hardware.

Su función es:

* visualizar telemetría en tiempo real
* mostrar alertas activas
* reflejar el estado del sistema embebido
* consumir eventos Socket.IO
* desacoplar la interfaz del firmware físico
* permitir monitoreo remoto desde navegador

---

# 🧠 Arquitectura del frontend

```text
┌─────────────────────────────┐
│       BACKEND NODE.JS      │
├─────────────────────────────┤
│ Socket.IO Gateway          │
│ Providers desacoplados     │
│ Parser serial              │
└──────────────┬──────────────┘
               │ WebSockets
               ▼
┌─────────────────────────────┐
│        FRONTEND REACT      │
├─────────────────────────────┤
│ Dashboard                  │
│ Sensor Cards               │
│ Status Indicators          │
│ Mode Selector              │
│ Socket Hook                │
└─────────────────────────────┘
```

---

# 🎯 Funcionalidades implementadas

## ✅ Dashboard en tiempo real

Visualización continua del estado del sistema.

---

## ✅ Lectura de sensores

Monitoreo de:

| Sensor      | Descripción    |
| ----------- | -------------- |
| Temperatura | Lectura DHT11  |
| Humedad     | Lectura DHT11  |
| Distancia   | HC-SR04        |
| Flama       | Sensor digital |
| Iluminación | LDR analógico  |

---

## ✅ Indicadores de alertas

Visualización de:

| Alerta           | Condición            |
| ---------------- | -------------------- |
| Fire             | Flama detectada      |
| Intrusion        | Distancia ≤ 20 cm    |
| High Temperature | Temperatura ≥ 35°C   |
| High Humidity    | Humedad ≥ 70%        |
| Low Light        | Iluminación ≤ 100    |
| Any Alert        | Consolidación global |

---

## ✅ Estado global del sistema

El frontend refleja:

* estado normal
* alertas activas
* modo de operación
* origen de datos
* conectividad con backend

---

## ✅ Integración Socket.IO

Actualización automática en tiempo real sin recargar página.

---

## ✅ Compatibilidad con múltiples providers

El frontend puede consumir datos provenientes de:

| Provider   | Estado       |
| ---------- | ------------ |
| SERIAL     | ✅ Compatible |
| SIMULATION | ✅ Compatible |
| WIFI       | ⏳ Planeado   |

---

# 🔌 Integración con hardware real

El frontend consume datos emitidos por el backend, el cual interpreta el protocolo serial generado por el firmware Arduino.

Formato serial real implementado:

```text
TEMP:24.0,HUM:58.0,DIST:120,FLAME:0,LIGHT:650,FIRE:0,INTRUSION:0,TEMP_ALERT:0,HIGH_HUM:0,LOW_LIGHT:0,ANY_ALERT:0
```

El frontend NO interpreta serial directamente.

Todo el procesamiento ocurre en backend.

---

# 📡 Payload recibido vía WebSocket

Evento principal:

```text
sensor:data
```

Ejemplo real:

```json
{
  "temperature": 24,
  "humidity": 58,
  "distance": 120,
  "flame": false,
  "light": 650,

  "alerts": {
    "fire": false,
    "intrusion": false,
    "highTemperature": false,
    "highHumidity": false,
    "lowLight": false,
    "anyAlert": false
  },

  "source": "serial"
}
```

---

# 📂 Estructura del frontend

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── ModeSelector.jsx
│   │   ├── SensorCard.jsx
│   │   └── StatusIndicator.jsx
│   │
│   ├── hooks/
│   │   └── useSocket.js
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── .env
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# 🧩 Componentes principales

## `Dashboard.jsx`

Vista principal del sistema.

Responsable de:

* organizar visualización
* renderizar sensores
* mostrar alertas
* reflejar estado general

---

## `SensorCard.jsx`

Tarjeta reutilizable para visualización de sensores.

---

## `StatusIndicator.jsx`

Indicadores visuales de estado y alertas.

---

## `ModeSelector.jsx`

Selector visual del provider activo:

* SERIAL
* SIMULATION
* WIFI (bloqueado para integracion futura)

---

## `useSocket.js`

Hook personalizado encargado de:

* conexión Socket.IO
* escucha de eventos
* actualización reactiva del dashboard

---

# 🚀 Instalación

## 1. Entrar al frontend

```bash
cd frontend
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

# ⚙️ Variables de entorno

Archivo:

```text
frontend/.env
```

Ejemplo:

```env
VITE_API_URL=http://localhost:3000
```

---

# ▶️ Ejecución

Modo desarrollo:

```bash
npm run dev
```

---

# 🌐 Acceso local

Por defecto:

```text
http://localhost:5173
```

---

# 🔄 Flujo operativo

```text
Sensores físicos
        ↓
Arduino Uno
        ↓
Firmware modular
        ↓
Serial estructurado
        ↓
Backend Node.js
        ↓
Socket.IO
        ↓
Frontend React
```

---

# 🎨 Filosofía de diseño

El frontend fue diseñado bajo principios de:

* desacoplamiento del hardware
* simplicidad visual
* monitoreo en tiempo real
* arquitectura modular
* reutilización de componentes
* compatibilidad multi-provider

La interfaz puede operar con hardware real o simulación sin modificaciones internas.

---

# 🧪 Desarrollo desacoplado

Gracias al modo `SIMULATION` del backend, el frontend puede desarrollarse sin Arduino conectado.

Esto permite:

* pruebas UI
* validación de WebSockets
* desarrollo remoto
* demostraciones
* testing visual

---

# 📌 Estado actual

| Área                  | Estado         |
| --------------------- | -------------- |
| Dashboard React       | ✅ Funcional    |
| Socket.IO Client      | ✅ Funcional    |
| Integración backend   | ✅ Funcional    |
| Compatibilidad serial | ✅ Lista        |
| Simulación            | ✅ Funcional    |
| Arquitectura modular  | ✅ Implementada |
| Provider WiFi         | ⏳ Planeado     |

---

# 🔮 Evolución futura

Posibles mejoras posteriores:

* gráficas históricas
* historial de alertas
* autenticación
* múltiples dashboards
* diseño responsive avanzado
* notificaciones en tiempo real
* dark mode
* integración MQTT
* PWA
* despliegue cloud

---

# 👨‍💻 Autor

Carlos Benjamin Armenta Marquez

Proyecto académico orientado a:

* IoT
* sistemas embebidos
* monitoreo ambiental
* automatización industrial
* arquitectura desacoplada frontend/backend
