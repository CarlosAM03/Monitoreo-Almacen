# 🏭 Sistema Inteligente de Monitoreo Ambiental para Almacenes Industriales

Sistema IoT de monitoreo ambiental en tiempo real para almacenes industriales, basado en Arduino Uno, sensores físicos, automatización local y visualización web mediante arquitectura backend/frontend desacoplada.

El proyecto implementa monitoreo de:

* Temperatura
* Humedad
* Detección de flama/incendio
* Intrusión/proximidad
* Iluminación ambiental

Además incorpora:

* Automatización local mediante actuadores
* Sistema de alertas prioritarias
* Comunicación serial estructurada
* Backend Node.js con WebSockets
* Frontend React + Vite para monitoreo en tiempo real

---

# 📌 Estado actual del proyecto

## ✅ Hardware

COMPLETADO Y VALIDADO.

## ✅ Firmware

COMPLETADO Y ESTABILIZADO.

## ✅ Comunicación serial estructurada

COMPLETADA.

## 🔄 Backend + Frontend

LISTOS PARA INTEGRACIÓN FINAL CON HARDWARE REAL.

---

# 🧠 Arquitectura global del sistema

```text
┌─────────────────────────────┐
│        SENSORES            │
├─────────────────────────────┤
│ DHT11                      │
│ HC-SR04                    │
│ Sensor de flama            │
│ LDR analógico              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       ARDUINO UNO          │
├─────────────────────────────┤
│ Firmware modular           │
│ Scheduler cooperativo      │
│ Sistema de alertas         │
│ Automatización local       │
│ Serial estructurado        │
└──────────────┬──────────────┘
               │ Serial USB
               ▼
┌─────────────────────────────┐
│      BACKEND NODE.JS       │
├─────────────────────────────┤
│ Parser serial              │
│ WebSocket Gateway          │
│ Servicios de sensores      │
│ Prisma ORM                 │
│ Providers desacoplados     │
└──────────────┬──────────────┘
               │ Socket.IO
               ▼
┌─────────────────────────────┐
│     FRONTEND REACT         │
├─────────────────────────────┤
│ Dashboard en tiempo real   │
│ Estado de sensores         │
│ Alertas visuales           │
│ Indicadores de sistema     │
└─────────────────────────────┘
```

---

# 📂 Estructura del monorepo

```text
Monitoreo-Almacen/
│
├── backend/
├── firmware/
├── frontend/
├── Docs/
└── README.md
```

---

# 🔧 Hardware implementado

## 🧩 Microcontrolador

* Arduino Uno

---

## 🌡 Sensores

### DHT11

Lectura de:

* Temperatura
* Humedad

---

### HC-SR04

Detección de proximidad/intrusión.

---

### Sensor de flama

Detección digital de incendio/flama.

---

### LDR analógico

Monitoreo de iluminación ambiental.

---

# ⚙️ Actuadores implementados

## 🔴 LED rojo

Indica estado de alerta.

---

## 🟢 LED verde

Indica estado normal.

---

## 🔊 Buzzer activo

Alarma sonora continua e intensa durante alertas.

---

## 🔄 Servo motor

Automatización física según prioridad de alertas:

| Estado           | Acción           |
| ---------------- | ---------------- |
| Incendio         | Apertura total   |
| Humedad alta     | Ventilación      |
| Temperatura alta | Apertura parcial |
| Estado normal    | Cerrado          |

---

## 📟 LCD I2C 16x2

Visualización local del sistema:

* Sensores en tiempo real
* Alertas prioritarias
* Estado operativo

---

# 🧠 Arquitectura del firmware

El firmware fue desarrollado bajo arquitectura modular desacoplada.

## Componentes principales

| Módulo               | Responsabilidad                  |
| -------------------- | -------------------------------- |
| `scheduler`          | Ejecución periódica de tareas    |
| `tasks`              | Orquestación del sistema         |
| `alert_service`      | Evaluación de alertas            |
| `automation_service` | Automatización de actuadores     |
| `display_service`    | Control de LCD                   |
| `serial_protocol`    | Comunicación serial estructurada |
| `system_state`       | Estado global compartido         |

---

# ⏱ Scheduler cooperativo

El sistema utiliza ejecución no bloqueante basada en `millis()`.

| Tarea            | Intervalo |
| ---------------- | --------- |
| Sensores rápidos | 200 ms    |
| DHT11            | 2000 ms   |
| Alertas          | 100 ms    |
| Automatización   | 100 ms    |
| Actuadores       | 100 ms    |
| LCD              | 1000 ms   |
| Serial           | 1000 ms   |

---

# 🚨 Sistema de alertas

## Alertas implementadas

| Alerta           | Condición          |
| ---------------- | ------------------ |
| Fire             | Flama detectada    |
| Intrusion        | Distancia ≤ 20 cm  |
| High Temperature | Temperatura ≥ 35°C |
| High Humidity    | Humedad ≥ 70%      |
| Low Light        | Luz ≤ 100          |

---

## Prioridad de alertas

| Prioridad | Evento                |
| --------- | --------------------- |
| 1         | Incendio              |
| 2         | Temperatura / Humedad |
| 3         | Intrusión             |
| 4         | Baja iluminación      |

---

# 🔌 Protocolo serial final

La comunicación serial quedó definida como transmisión estructurada CSV-like.

## Formato real implementado

```text
TEMP:24.0,HUM:58.0,DIST:120,FLAME:0,LIGHT:650,FIRE:0,INTRUSION:0,TEMP_ALERT:0,HIGH_HUM:0,LOW_LIGHT:0,ANY_ALERT:0
```

---

## Variables transmitidas

| Campo      | Descripción               |
| ---------- | ------------------------- |
| TEMP       | Temperatura               |
| HUM        | Humedad                   |
| DIST       | Distancia                 |
| FLAME      | Sensor de flama           |
| LIGHT      | Nivel de iluminación      |
| FIRE       | Alerta de incendio        |
| INTRUSION  | Alerta de intrusión       |
| TEMP_ALERT | Temperatura alta          |
| HIGH_HUM   | Humedad alta              |
| LOW_LIGHT  | Baja iluminación          |
| ANY_ALERT  | Alerta global consolidada |

---

# 🖥 Backend

## Stack

* Node.js
* Express
* Socket.IO
* Prisma ORM
* SerialPort

---

## Responsabilidades

* Lectura del puerto serial
* Parseo de datos del firmware
* Validación
* Emisión en tiempo real vía WebSockets
* Simulación desacoplada
* Abstracción de providers

---

# 📂 Estructura backend

```text
backend/src/
│
├── config/
├── core/
├── datasources/
│   ├── serial/
│   ├── simulation/
│   └── wifi/
├── modules/
│   └── sensor/
├── prisma/
├── utils/
├── app.js
└── server.js
```

---

# 📡 Providers soportados

| Provider   | Estado   |
| ---------- | -------- |
| Serial     | Activo   |
| Simulation | Activo   |
| WiFi       | Planeado |

---

# 🌐 Frontend

## Stack

* React
* Vite
* Socket.IO Client

---

## Funcionalidades

* Dashboard en tiempo real
* Indicadores visuales
* Tarjetas de sensores
* Estado de alertas
* Estado global del sistema
* Visualización desacoplada del backend

---

# 📂 Estructura frontend

```text
frontend/src/
│
├── components/
│   ├── ModeSelector.jsx
│   ├── SensorCard.jsx
│   └── StatusIndicator.jsx
├── hooks/
│   └── useSocket.js
├── pages/
│   └── Dashboard.jsx
├── App.jsx
├── main.jsx
└── styles.css
```

---

# 🔄 Flujo operativo completo

```text
Sensores físicos
        ↓
Firmware Arduino
        ↓
Sistema de alertas
        ↓
Automatización local
        ↓
Serial estructurado
        ↓
Backend Node.js
        ↓
WebSocket Gateway
        ↓
Frontend React Dashboard
```

---

# 🚀 Instalación del proyecto

## 1. Clonar repositorio

```bash
git clone https://github.com/CarlosAM03/Monitoreo-Almacen.git
```

---

# 🔧 Backend

## Instalar dependencias

```bash
cd backend
npm install
```

---

## Configurar variables de entorno

Archivo:

```text
backend/.env
```

Ejemplo:

```env
PORT=3000
SERIAL_PORT=COM3
BAUD_RATE=9600
```

---

## Ejecutar backend

```bash
npm run dev
```

---

# 🌐 Frontend

## Instalar dependencias

```bash
cd frontend
npm install
```

---

## Ejecutar frontend

```bash
npm run dev
```

---

# 🔌 Firmware Arduino

## Requisitos

* Arduino IDE
* Librería Servo
* Librería DHT
* Librería LiquidCrystal_I2C

---

## Cargar firmware

Abrir:

```text
firmware/firmware.ino
```

Compilar y cargar al Arduino Uno.

---

# 📚 Documentación del proyecto

```text
Docs/
├── Arquitectura.md
├── hardware/
│   ├── EstadosDelProyecto/
│   ├── Planeacion/
│   └── Pruebas/
```

---

# ✅ Estado de cierre actual

## Hardware

* COMPLETADO
* VALIDADO
* ESTABILIZADO

---

## Firmware

* COMPLETADO
* MODULARIZADO
* ESTABILIZADO
* SERIAL FINAL DEFINIDO

---

## Backend

* LISTO PARA INTEGRACIÓN CON HARDWARE REAL

---

## Frontend

* LISTO PARA CONSUMIR DATOS EN TIEMPO REAL

---

# 📌 Próxima etapa

## ETAPA 9 — Integración completa backend + frontend + hardware

Objetivos:

* Conexión serial real con Arduino
* Parseo final del protocolo serial
* Emisión Socket.IO
* Dashboard en tiempo real
* Persistencia opcional de lecturas
* Historial de alertas

---

# 👨‍💻 Autor

Carlos Benjamin Armenta Marquez

Proyecto académico y de investigación orientado a sistemas embebidos, IoT y monitoreo ambiental inteligente para almacenes industriales.
