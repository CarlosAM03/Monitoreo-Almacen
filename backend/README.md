
---

# 📦 📄 `backend/README.md`


# ⚙️ Backend — Sistema de Monitoreo Industrial

## 📌 Descripción

Servidor encargado de:

- Procesar datos de sensores
- Manejar múltiples fuentes de datos (simulación, serial, futuro WiFi)
- Emitir datos en tiempo real mediante WebSockets
- Persistir información con Prisma

---

## 🧠 Arquitectura

```text
Datasource (Simulation / Serial / WiFi)
                ↓
         Sensor Service
                ↓
        WebSocket Gateway
                ↓
            Frontend
````

---

## 🔄 Modos de operación

| Modo       | Descripción         |
| ---------- | ------------------- |
| SIMULATION | Datos aleatorios    |
| SERIAL     | Datos desde Arduino |
| WIFI       | (No implementado)   |

---

## 📁 Estructura

```bash
src/
├── config/        # Configuración y constantes
├── core/          # Logger y manejo de errores
├── datasources/   # Fuentes de datos
├── modules/       # Lógica de negocio (sensor)
├── prisma/        # Cliente Prisma
├── utils/         # Parser y validadores
├── app.js
└── server.js
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
PORT=3000
MODE=SIMULATION
SERIAL_PORT=COM3
DATABASE_URL="file:./dev.db"
```

---

## 🗄️ Base de datos

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## ▶️ Ejecución

```bash
npm run dev
```

---

## 🔌 API

### Obtener modo actual

```http
GET /mode
```

### Cambiar modo

```http
POST /mode
Content-Type: application/json

{
  "mode": "SIMULATION" | "SERIAL"
}
```

---

## 📡 WebSocket

Evento:

```bash
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
  "source": "simulation"
}
```

---

## 🧪 Notas

* El sistema inicia en modo **SIMULATION**
* El cambio de modo es dinámico
* El modo WiFi está preparado pero no implementado
* Pendiente integrar hardware via serial port

---

## 🚀 Futuro

* Integración con ESP32 (Modulo wifi externo)

### Posibles evoluciones

* Deploy en la nube
* Sistema de alertas
* Análisis histórico

---