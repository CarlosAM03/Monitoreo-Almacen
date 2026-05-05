# 🏭 Sistema Inteligente de Monitoreo Ambiental para Almacenes Industriales

## 📌 Descripción General

Este proyecto implementa un sistema IoT híbrido para el monitoreo ambiental en almacenes industriales, utilizando una arquitectura desacoplada basada en:

* **Hardware (Arduino Uno + sensores)**
* **Backend (Node.js + WebSockets + Prisma + PostgreSQL)**
* **Frontend (React + Vite)**

El sistema permite visualizar en tiempo real variables ambientales críticas y generar alertas ante condiciones peligrosas.

---

## 🎯 Objetivo

Desarrollar un sistema completo que:

* Adquiera datos desde sensores físicos
* Procese y transmita información en tiempo real
* Visualice datos en una interfaz web interactiva
* Permita simulación del sistema sin hardware
* Sea escalable hacia comunicación IoT vía WiFi (futuro)

---

## 🧠 Arquitectura del Sistema

```text
[ Arduino / Simulación ]
          ↓
     (Serial / Simulado)
          ↓
       Backend
 (Node.js + WebSocket)
          ↓
       Frontend
     (React UI)
```

---

## 🔄 Modos de Operación

El sistema soporta múltiples modos de operación controlados dinámicamente desde el frontend:

| Modo          | Descripción                                      |
| ------------- | ------------------------------------------------ |
| 🟢 SIMULATION | Genera datos aleatorios desde el backend         |
| 🔵 SERIAL     | Lee datos reales desde Arduino vía puerto serial |
| 🟡 WIFI       | (Próximamente) Comunicación IoT                  |

✔ El sistema inicia por defecto en modo **SIMULATION**
✔ El modo se puede cambiar en tiempo real sin reiniciar el servidor

---

## 📁 Estructura del Monorepo

```bash
root/
│
├── frontend/   # React + Vite
├── backend/    # Node.js + Prisma + WebSockets
│
└── README.md
```

---

## 📦 Backend

### ⚙️ Tecnologías

* Node.js
* Express
* Socket.io
* Prisma ORM
* PostgreSQL
* SerialPort

---

### 📁 Estructura

```bash
backend/
├── src/
│   ├── modules/sensor/
│   ├── datasources/
│   │   ├── simulation/
│   │   ├── serial/
│   │   └── wifi/
│   ├── utils/
│   ├── prisma/
│   ├── app.js
│   └── server.js
├── prisma/schema.prisma
├── .env
└── package.json
```

---

### 🚀 Instalación

```bash
cd backend
npm install
```

---

### ⚙️ Configuración `.env`

```env
PORT=3000
MODE=SIMULATION
DATABASE_URL="postgresql://user:password@localhost:5432/monitor"
SERIAL_PORT=COM3
```

---

### 🗄️ Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

### ▶️ Ejecutar backend

```bash
npm run dev
```

---

### 🔌 API

#### Obtener modo actual

```http
GET /mode
```

#### Cambiar modo

```http
POST /mode
Content-Type: application/json

{
  "mode": "SIMULATION" | "SERIAL"
}
```

---

### 📡 WebSocket

Evento emitido:

```json
sensor:data
```

Ejemplo:

```json
{
  "temp": 25,
  "hum": 60,
  "gas": 320,
  "flame": 0,
  "mov": 1,
  "dist": 45,
  "source": "serial"
}
```

---

## ⚛️ Frontend

### ⚙️ Tecnologías

* React
* Vite
* Socket.io-client

---

### 📁 Estructura

```bash
frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
```

---

### 🚀 Instalación

```bash
cd frontend
npm install
```

---

### ▶️ Ejecutar frontend

```bash
npm run dev
```

---

### 🧩 Funcionalidades

* Dashboard en tiempo real
* Visualización de sensores:

  * Temperatura
  * Humedad
  * Gas
  * Distancia
* Indicadores:

  * Flama
  * Movimiento
* Selector de modo dinámico
* Estado de fuente de datos

---

## 🔌 Hardware

### 🔧 Plataforma

* Arduino Uno

---

### 🌡️ Sensores

* DHT11 → Temperatura y humedad
* MQ-2 → Gas
* Flame Sensor → Fuego
* PIR HC-SR501 → Movimiento
* HC-SR04 → Distancia

---

### 📟 Salidas

* LCD 16x2 I2C
* Buzzer
* LED Verde (normal)
* LED Rojo (alerta)

---

### 🔗 Comunicación

* Serial USB (9600 baudios)

Formato:

```text
TEMP:25,HUM:60,GAS:320,FLAME:0,MOV:1,DIST:45
```

---

## 🧪 Flujo de Desarrollo

### 1️⃣ Backend + Base de Datos

* Configurar Prisma + PostgreSQL
* Implementar datasources
* Implementar WebSocket

### 2️⃣ Frontend

* Dashboard
* WebSocket
* Selector de modo

### 3️⃣ Hardware

* Montaje en protoboard
* Integración sensores
* Firmware en Arduino (C++)

### 4️⃣ Integración final

* Arduino → Serial → Backend → Frontend

---

## ⚠️ Consideraciones

* Tinkercad **NO permite conexión real al backend**
* El modo simulación se implementa en backend
* El modo WiFi está preparado pero no implementado

---

## 🚀 Escalabilidad futura

* Integración con ESP32 (WiFi real)
* Deploy en la nube (backend + frontend)
* Historial de datos
* Gráficas en tiempo real
* Sistema de alertas avanzado

---

## ✅ Entregables

* ✔ Prototipo físico funcional
* ✔ Simulación (backend + Tinkercad)
* ✔ Interfaz web en tiempo real
* ✔ Arquitectura escalable
* ✔ Documentación técnica

---

## 👨‍💻 Autor

Carlos Benjamin Armenta Marquez

---

## 📄 Licencia

Uso académico
