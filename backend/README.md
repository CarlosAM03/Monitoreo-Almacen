# 📦 `backend/README.md`

# ⚙️ Backend — Sistema Inteligente de Monitoreo Ambiental

Backend desacoplado encargado de recibir, procesar y distribuir en tiempo real las lecturas y alertas generadas por el sistema embebido basado en Arduino Uno.

Este servicio actúa como puente entre el firmware físico y la interfaz web React, permitiendo monitoreo remoto mediante WebSockets y múltiples fuentes de datos.

---

# 📌 Responsabilidades del backend

El backend NO controla hardware directamente.

Su función es:

* recibir telemetría del firmware
* interpretar datos seriales estructurados
* normalizar información
* emitir eventos en tiempo real
* abstraer providers de comunicación
* permitir simulación desacoplada
* preparar persistencia futura

---

# 🧠 Arquitectura del backend

```text
┌─────────────────────────────┐
│     FUENTES DE DATOS       │
├─────────────────────────────┤
│ Serial Provider            │
│ Simulation Provider        │
│ WiFi Provider (planeado)   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       SENSOR SERVICE       │
├─────────────────────────────┤
│ Parseo                     │
│ Validación                 │
│ Normalización              │
│ Gestión de estado          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      SOCKET GATEWAY        │
├─────────────────────────────┤
│ WebSockets                 │
│ Eventos en tiempo real     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       FRONTEND REACT       │
└─────────────────────────────┘
```

---

# 🔄 Modos de operación

El backend soporta múltiples providers de adquisición de datos.

| Provider   | Estado     | Descripción                              |
| ---------- | ---------- | ---------------------------------------- |
| SERIAL     | ✅ Activo   | Comunicación real con Arduino            |
| SIMULATION | ✅ Activo   | Datos simulados para pruebas             |
| WIFI       | ⏳ Planeado | Provider preparado para expansión futura |

---

# 🔌 Integración con hardware real

El firmware Arduino transmite datos mediante comunicación serial estructurada.

Formato real implementado:

```text
TEMP:24.0,HUM:58.0,DIST:120,FLAME:0,LIGHT:650,FIRE:0,INTRUSION:0,TEMP_ALERT:0,HIGH_HUM:0,LOW_LIGHT:0,ANY_ALERT:0
```

El backend:

1. Lee el puerto serial
2. Interpreta el protocolo
3. Convierte datos a JSON
4. Emite eventos WebSocket al frontend

---

# 📡 Variables recibidas desde firmware

| Campo      | Descripción               |
| ---------- | ------------------------- |
| TEMP       | Temperatura               |
| HUM        | Humedad                   |
| DIST       | Distancia                 |
| FLAME      | Detección de flama        |
| LIGHT      | Nivel de iluminación      |
| FIRE       | Alerta de incendio        |
| INTRUSION  | Alerta de intrusión       |
| TEMP_ALERT | Temperatura alta          |
| HIGH_HUM   | Humedad alta              |
| LOW_LIGHT  | Baja iluminación          |
| ANY_ALERT  | Alerta global consolidada |

---

# 📂 Estructura del backend

```text
backend/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   ├── constants.js
│   │   └── env.js
│   │
│   ├── core/
│   │   ├── errors.js
│   │   └── logger.js
│   │
│   ├── datasources/
│   │   ├── serial/
│   │   │   └── serial.provider.js
│   │   ├── simulation/
│   │   │   └── simulation.provider.js
│   │   ├── wifi/
│   │   │   └── wifi.provider.js
│   │   └── index.js
│   │
│   ├── modules/
│   │   └── sensor/
│   │       ├── sensor.controller.js
│   │       ├── sensor.gateway.js
│   │       ├── sensor.mapper.js
│   │       └── sensor.service.js
│   │
│   ├── prisma/
│   │   └── client.js
│   │
│   ├── utils/
│   │   ├── parser.js
│   │   └── validators.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# 🧩 Componentes principales

## `serial.provider.js`

Responsable de:

* abrir conexión serial
* escuchar datos del Arduino
* transmitir datos al sistema interno

---

## `simulation.provider.js`

Genera datos simulados para:

* pruebas frontend
* desarrollo desacoplado
* validación sin hardware

---

## `wifi.provider.js`

Provider preparado para futura integración mediante:

* ESP8266
* ESP-01
* ESP32
* comunicación TCP/IP

Actualmente no implementado por alcance del proyecto.

---

## `sensor.service.js`

Gestiona:

* flujo principal de datos
* integración entre providers
* actualización del estado global

---

## `sensor.gateway.js`

Implementa:

* WebSockets
* emisión en tiempo real
* eventos Socket.IO

---

## `parser.js`

Convierte el protocolo serial del firmware a objetos JSON utilizables.

---

# 🚀 Instalación

## 1. Entrar al backend

```bash
cd backend
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
backend/.env
```

Ejemplo:

```env
PORT=3000

MODE=SERIAL

SERIAL_PORT=COM3

BAUD_RATE=9600

DATABASE_URL="file:./dev.db"
```

---

# 🗄️ Base de datos (Prisma)

Inicializar Prisma:

```bash
npx prisma generate
```

Migraciones:

```bash
npx prisma migrate dev --name init
```

---

# ▶️ Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

---

# 📡 WebSocket en tiempo real

## Evento principal

```text
sensor:data
```

---

## Payload emitido

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

# 🔄 Flujo operativo

```text
Arduino Uno
     ↓
Puerto Serial USB
     ↓
Serial Provider
     ↓
Parser
     ↓
Sensor Service
     ↓
Socket Gateway
     ↓
Frontend React
```

---

# 🧪 Simulación desacoplada

El backend puede operar sin hardware real utilizando:

```env
MODE=SIMULATION
```

Esto permite:

* desarrollar frontend sin Arduino
* probar dashboard
* validar WebSockets
* realizar demostraciones

---

# 📌 Estado actual

| Área                  | Estado      |
| --------------------- | ----------- |
| Serial provider       | ✅ Funcional |
| Parser serial         | ✅ Funcional |
| WebSockets            | ✅ Funcional |
| Arquitectura modular  | ✅ Funcional |
| Simulación            | ✅ Funcional |
| Integración hardware  | ✅ Lista     |
| Persistencia avanzada | ⏳ Futuro    |
| Provider WiFi         | ⏳ Planeado  |

---

# 🧠 Filosofía de diseño

El backend fue diseñado bajo principios de:

* desacoplamiento
* modularidad
* extensibilidad
* tolerancia a múltiples providers
* independencia del hardware

El firmware continúa siendo autónomo y funcional incluso sin backend conectado.

---

# 🔮 Evolución futura

Posibles mejoras posteriores:

* Persistencia histórica avanzada
* Dashboard multiusuario
* Sistema de autenticación
* Alertas remotas
* Integración MQTT
* Provider WiFi real
* API REST completa
* Dockerización
* Deploy cloud

---

# 👨‍💻 Autor

Carlos Benjamin Armenta Marquez

Proyecto académico orientado a:

* IoT
* sistemas embebidos
* monitoreo ambiental
* automatización industrial
* arquitectura desacoplada backend/frontend
