# 📦 ESTADO ACTUAL DEL BACKEND — ETAPA 8 FINALIZADA

# 🏭 Sistema Inteligente de Monitoreo Ambiental para Almacenes Industriales

---

# ✅ OBJETIVO DEL DOCUMENTO

Este documento describe el estado REAL actual del backend Node.js en contraste con:

* la arquitectura global oficial del sistema
* el firmware embebido final
* el protocolo serial definitivo
* el README objetivo del backend
* el cierre oficial de hardware + firmware

El propósito es documentar:

* qué partes ya están alineadas
* qué partes quedaron desactualizadas
* qué diferencias existen respecto al firmware final
* qué debe corregirse en ETAPA 9

---

# ✅ ESTADO GENERAL DEL BACKEND

## Estado actual

| Área                                           | Estado         |
| ---------------------------------------------- | -------------- |
| Arquitectura base                              | ✅ IMPLEMENTADA |
| Express Server                                 | ✅ FUNCIONAL    |
| Socket.IO Gateway                              | ✅ FUNCIONAL    |
| Provider SERIAL                                | ✅ FUNCIONAL    |
| Provider SIMULATION                            | ✅ FUNCIONAL    |
| Provider WIFI                                  | ⏳ PLACEHOLDER  |
| Parser serial                                  | ⚠️ DESALINEADO |
| Mapper de datos                                | ⚠️ DESALINEADO |
| Integración firmware final                     | ⚠️ PENDIENTE   |
| Persistencia Prisma                            | ⚠️ PARCIAL     |
| Compatibilidad con serial final                | ❌ INCOMPLETA   |
| Compatibilidad con alertas globales            | ❌ INCOMPLETA   |
| Compatibilidad con arquitectura firmware final | ⚠️ PARCIAL     |

---

# ✅ ESTADO DE LA ARQUITECTURA

El backend ya implementa correctamente la filosofía desacoplada definida en la arquitectura global del sistema.

Actualmente existe separación clara entre:

* providers de adquisición
* servicios
* gateway WebSocket
* parser serial
* persistencia
* controladores HTTP

---

# ✅ ARQUITECTURA ACTUAL IMPLEMENTADA

```text
┌─────────────────────────────┐
│     FUENTES DE DATOS       │
├─────────────────────────────┤
│ Serial Provider            │
│ Simulation Provider        │
│ WiFi Provider (placeholder)│
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       SENSOR SERVICE       │
├─────────────────────────────┤
│ Parseo                     │
│ Normalización              │
│ Emisión WebSocket          │
│ Persistencia Prisma        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      SOCKET GATEWAY        │
├─────────────────────────────┤
│ Socket.IO                  │
│ sensor:data                │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       FRONTEND REACT       │
└─────────────────────────────┘
```

---

# ✅ COMPONENTES YA FUNCIONALES

## Express Server

Implementado en:

```text
src/server.js
```

Estado:

✅ FUNCIONAL

Responsabilidades:

* iniciar servidor HTTP
* inicializar Socket.IO
* arrancar adquisición de datos

---

## Socket.IO Gateway

Implementado en:

```text
src/modules/sensor/sensor.gateway.js
```

Estado:

✅ FUNCIONAL

Responsabilidades:

* emitir eventos en tiempo real
* broadcast de `sensor:data`
* desacoplar frontend del hardware

---

## SERIAL Provider

Implementado en:

```text
src/datasources/serial/serial.provider.js
```

Estado:

✅ FUNCIONAL

Responsabilidades:

* abrir puerto serial
* leer datos del Arduino
* interpretar líneas seriales

---

## SIMULATION Provider

Implementado en:

```text
src/datasources/simulation/simulation.provider.js
```

Estado:

✅ FUNCIONAL

Responsabilidades:

* pruebas desacopladas
* simulación frontend
* validación sin hardware

---

## WIFI Provider

Implementado en:

```text
src/datasources/wifi/wifi.provider.js
```

Estado:

⏳ PLACEHOLDER

Actualmente:

```js
function start() {
  console.log("Modo WIFI aún no implementado");
}
```

Alineado con decisión oficial:

# estabilidad > complejidad

y con el descarte temporal del ESP-01.

---

# ✅ ESTADO DEL PARSER SERIAL

## Parser actual

Archivo:

```text
src/utils/parser.js
```

Implementación actual:

```js
const [key, value] = p.split(":");
data[key.toLowerCase()] = Number(value);
```

---

# ⚠️ PROBLEMA ACTUAL

El parser fue construido antes de definirse oficialmente el protocolo serial final del firmware.

Por ello:

## Sí interpreta correctamente:

```text
TEMP
HUM
DIST
FLAME
LIGHT
```

pero NO está alineado completamente con:

```text
FIRE
INTRUSION
TEMP_ALERT
HIGH_HUM
LOW_LIGHT
ANY_ALERT
```

---

# ⚠️ DESALINEACIÓN CRÍTICA

El firmware final implementa:

```text
TEMP:24.0,
HUM:58.0,
DIST:120,
FLAME:0,
LIGHT:650,
FIRE:0,
INTRUSION:0,
TEMP_ALERT:0,
HIGH_HUM:0,
LOW_LIGHT:0,
ANY_ALERT:0
```

pero el backend actual todavía utiliza un modelo parcial heredado de versiones anteriores.

---

# ✅ ESTADO DEL MAPPER

Archivo:

```text
src/modules/sensor/sensor.mapper.js
```

Estado:

⚠️ DESALINEADO

---

## Mapper actual

Actualmente solo contempla:

```js
{
  temp,
  hum,
  gas,
  flame,
  mov,
  dist,
  source
}
```

---

# ❌ VARIABLES OBSOLETAS

Las siguientes variables YA NO EXISTEN en firmware final:

| Variable backend | Estado     |
| ---------------- | ---------- |
| gas              | ❌ OBSOLETA |
| mov              | ❌ OBSOLETA |

Porque:

* MQ sensor fue descartado
* PIR fue descartado

durante consolidación final de hardware.

---

# ❌ VARIABLES FALTANTES

El backend NO contempla aún:

| Variable firmware | Estado  |
| ----------------- | ------- |
| fire              | ❌ FALTA |
| intrusion         | ❌ FALTA |
| temp_alert        | ❌ FALTA |
| high_hum          | ❌ FALTA |
| low_light         | ❌ FALTA |
| any_alert         | ❌ FALTA |

---

# ✅ ESTADO DEL SENSOR SERVICE

Archivo:

```text
src/modules/sensor/sensor.service.js
```

Estado:

⚠️ PARCIALMENTE ALINEADO

---

## Funcionalidades correctas

✅ adquisición de datos
✅ integración provider → gateway
✅ persistencia Prisma
✅ cambio dinámico de provider
✅ desacoplamiento modular

---

## Problema principal

La lógica fue diseñada para un modelo de sensores previo a la arquitectura definitiva del firmware.

---

# ✅ ESTADO DE PRISMA

Archivo:

```text
prisma/schema.prisma
```

Estado:

⚠️ DESALINEADO

---

## Modelo actual

```prisma
model SensorLog {
  id        Int
  temp      Float
  hum       Float
  gas       Float
  flame     Int
  mov       Int
  dist      Float
  source    String
  createdAt DateTime
}
```

---

# ❌ PROBLEMAS ACTUALES

## Campos obsoletos

| Campo | Estado     |
| ----- | ---------- |
| gas   | ❌ OBSOLETO |
| mov   | ❌ OBSOLETO |

---

## Campos faltantes

| Campo     | Estado  |
| --------- | ------- |
| light     | ❌ FALTA |
| fire      | ❌ FALTA |
| intrusion | ❌ FALTA |
| tempAlert | ❌ FALTA |
| highHum   | ❌ FALTA |
| lowLight  | ❌ FALTA |
| anyAlert  | ❌ FALTA |

---

# ✅ ESTADO DEL PROTOCOLO SERIAL

## Firmware final REAL

Actualmente el Arduino transmite:

```text
TEMP:24.0,
HUM:58.0,
DIST:120,
FLAME:0,
LIGHT:650,
FIRE:0,
INTRUSION:0,
TEMP_ALERT:0,
HIGH_HUM:0,
LOW_LIGHT:0,
ANY_ALERT:0
```

Implementado en:

```text
serial_protocol.cpp
```

---

# ⚠️ ESTADO DEL BACKEND RESPECTO AL SERIAL

| Área                        | Estado     |
| --------------------------- | ---------- |
| Lectura serial              | ✅          |
| Puerto serial               | ✅          |
| Baud rate 9600              | ✅          |
| Parseo básico               | ✅          |
| Compatibilidad serial final | ⚠️ PARCIAL |
| Alertas globales            | ❌          |
| Consolidación de estado     | ❌          |

---

# ✅ ESTADO DE LA BASE DEL SISTEMA

A pesar de las desalineaciones, el backend YA posee correctamente:

* arquitectura desacoplada
* providers dinámicos
* Socket.IO
* Express
* integración serial
* persistencia
* modo simulación
* estructura modular

Por lo tanto:

# la base arquitectónica YA está correctamente construida

---

# ⚠️ LO QUE REALMENTE FALTA

La ETAPA 9 NO requiere rehacer el backend.

Solo requiere:

## 🔧 REALINEACIÓN

entre:

* firmware final
* protocolo serial final
* mapper
* parser
* payload WebSocket
* Prisma schema
* frontend

---

# ✅ CAMBIOS NECESARIOS PARA ETAPA 9

## 1. Actualizar parser serial

Agregar soporte completo para:

```text
FIRE
INTRUSION
TEMP_ALERT
HIGH_HUM
LOW_LIGHT
ANY_ALERT
```

---

## 2. Actualizar mapper

Eliminar:

```text
gas
mov
```

Agregar:

```text
light
fire
intrusion
temp_alert
high_hum
low_light
any_alert
```

---

## 3. Actualizar Prisma

Modificar modelo `SensorLog`.

---

## 4. Actualizar payload WebSocket

El payload debe alinearse al firmware final.

---

## 5. Actualizar frontend

El frontend aún espera:

```text
gas
mov
```

y NO espera:

```text
fire
intrusion
high_hum
any_alert
```

---

# ✅ CONCLUSIÓN OFICIAL

## Estado real del backend

| Área                       | Estado         |
| -------------------------- | -------------- |
| Arquitectura               | ✅ SÓLIDA       |
| Modularidad                | ✅ IMPLEMENTADA |
| WebSockets                 | ✅ FUNCIONALES  |
| Providers                  | ✅ FUNCIONALES  |
| Serial físico              | ✅ FUNCIONAL    |
| Integración firmware final | ⚠️ PENDIENTE   |
| Persistencia final         | ⚠️ PENDIENTE   |
| Payload final              | ⚠️ PENDIENTE   |

---

# ✅ DECLARACIÓN OFICIAL

El backend:

# ✅ YA ESTÁ CORRECTAMENTE CONSTRUIDO

pero:

# ⚠️ NO ESTÁ AÚN ALINEADO AL FIRMWARE FINAL

---

# ✅ ESTADO OFICIAL PARA CIERRE DEL DÍA

## Hardware

✅ TERMINADO

## Firmware

✅ TERMINADO

## Arquitectura embebida

✅ TERMINADA

## Scheduler cooperativo

✅ TERMINADO

## Serial estructurado

✅ TERMINADO

## Backend base

✅ TERMINADO

## Backend alineado al firmware final

⏳ ETAPA 9

## Frontend alineado al firmware final

⏳ ETAPA 10

---

# ✅ SIGUIENTE PASO OFICIAL

Próxima sesión:

# 🔷 ETAPA 9 — REALINEACIÓN BACKEND

Objetivos:

* actualizar parser
* actualizar mapper
* actualizar Prisma
* actualizar payloads
* validar serial real
* integrar firmware ↔ backend

para posteriormente continuar con:

# 🔷 ETAPA 10 — REALINEACIÓN FRONTEND + DASHBOARD FINAL
