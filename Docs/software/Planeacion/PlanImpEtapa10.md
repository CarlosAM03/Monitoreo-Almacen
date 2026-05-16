# 📘 PLAN OFICIAL DE IMPLEMENTACIÓN — ETAPA 10

# 🔷 Refactor Completo del Frontend React

## Sistema Inteligente de Monitoreo Ambiental para Almacenes Industriales

---

# ✅ CONTEXTO OFICIAL

La ETAPA 9 dejó oficialmente estabilizado:

| Área                  | Estado |
| --------------------- | ------ |
| Firmware modular      | ✅      |
| Scheduler cooperativo | ✅      |
| Arquitectura embebida | ✅      |
| Backend Node.js       | ✅      |
| Parser serial         | ✅      |
| Prisma                | ✅      |
| WebSocket             | ✅      |
| Persistencia          | ✅      |
| Payload consolidado   | ✅      |

---

# ✅ SITUACIÓN ACTUAL DEL FRONTEND

El frontend actual:

# NO está roto

pero:

# quedó arquitectónicamente desalineado

respecto a:

* firmware final
* protocolo serial definitivo
* sistema de alertas consolidado
* payload WebSocket oficial
* arquitectura IoT final

---

# ✅ PRINCIPIO DE ETAPA 10

La ETAPA 10:

# NO ES UNA RECONSTRUCCIÓN TOTAL

sino:

# un refactor arquitectónico controlado

sobre una base React ya funcional.

---

# ✅ OBJETIVO GENERAL

Transformar el frontend actual en:

# Dashboard industrial IoT definitivo en tiempo real

alineado completamente con:

* firmware final
* backend consolidado
* alertas oficiales
* telemetría estructurada
* arquitectura distribuida final

---

# ✅ OBJETIVOS TÉCNICOS DE ETAPA 10

---

# 1. REALINEAR MODELO DE DATOS FRONTEND

## Objetivo

Eliminar completamente variables heredadas del prototipo inicial.

---

## Eliminar

```js
gas
mov
```

---

## Consumir oficialmente

```js
temp
hum
dist
flame
light

fire
intrusion
temp_alert
high_hum
low_light
any_alert

source
```

---

## Resultado esperado

Frontend 100% alineado al payload oficial.

---

# 2. REFACTORIZAR DASHBOARD.jsx

Archivo:

```text
frontend/src/pages/Dashboard.jsx
```

---

# Objetivo

Convertir el dashboard prototipo en:

# panel consolidado industrial en tiempo real

---

# Problemas actuales

## Actualmente:

* mezcla sensores y alertas
* usa variables obsoletas
* no representa prioridades
* no interpreta estados globales
* no existe agrupación lógica

---

# Nueva arquitectura visual requerida

```text
Dashboard
│
├── Header Sistema
│
├── Estado Global
│
├── Panel de Alertas
│
├── Sensores Ambientales
│
├── Sensores de Seguridad
│
├── Telemetría General
│
└── Estado de Conectividad
```

---

# Resultado esperado

Dashboard modular escalable.

---

# 3. CREAR PANEL GLOBAL DEL SISTEMA

## Objetivo

Representar visualmente el estado consolidado del firmware.

---

# Nuevo componente

```text
SystemStatus.jsx
```

---

# Debe mostrar

| Estado | Condición       |
| ------ | --------------- |
| NORMAL | `any_alert = 0` |
| ALERTA | `any_alert = 1` |

---

# Comportamiento visual

## NORMAL

* verde
* estable
* animación mínima

## ALERTA

* rojo
* destacado
* persistente
* prioridad visual máxima

---

# Resultado esperado

Estado global visible inmediatamente.

---

# 4. REFACTORIZAR StatusIndicator.jsx

Archivo:

```text
frontend/src/components/StatusIndicator.jsx
```

---

# Objetivo

Convertir indicador binario simple en:

# sistema de alertas industriales

---

# Alertas oficiales a representar

| Alerta           | Variable     |
| ---------------- | ------------ |
| Incendio         | `fire`       |
| Intrusión        | `intrusion`  |
| Temperatura alta | `temp_alert` |
| Humedad alta     | `high_hum`   |
| Baja iluminación | `low_light`  |

---

# Requerimientos visuales

## Estados

```text
NORMAL
ADVERTENCIA
CRÍTICO
```

---

# Prioridades

## CRÍTICO

* incendio
* intrusión

## MEDIA

* temperatura alta
* humedad alta

## BAJA

* baja iluminación

---

# Resultado esperado

Sistema visual jerárquico de alertas.

---

# 5. AGREGAR SENSOR DE ILUMINACIÓN

## Objetivo

Consumir oficialmente:

```js
light
```

---

# Nueva card requerida

```text
Iluminación
```

---

# Unidad

```text
lux aproximado / valor ADC
```

---

# Resultado esperado

Frontend alineado al firmware físico real.

---

# 6. CREAR PANEL DE ALERTAS CONSOLIDADAS

## Nuevo componente

```text
AlertsPanel.jsx
```

---

# Objetivo

Centralizar alertas activas del sistema.

---

# Debe mostrar

## Alertas activas en tiempo real

Ejemplo:

```text
🔥 Incendio detectado
🚨 Intrusión detectada
🌡 Temperatura crítica
💧 Humedad elevada
💡 Baja iluminación
```

---

# Reglas

## Si no hay alertas

Mostrar:

```text
Sistema operando normalmente
```

---

# Resultado esperado

Interpretación inmediata del estado del almacén.

---

# 7. IMPLEMENTAR TELEMETRÍA CONSOLIDADA

## Objetivo

Separar:

* sensores físicos
* decisiones del firmware
* estados derivados

---

# Nueva estructura recomendada

## Sensores ambientales

```text
temp
hum
light
```

---

## Sensores físicos

```text
dist
flame
```

---

## Alertas lógicas

```text
fire
intrusion
temp_alert
high_hum
low_light
any_alert
```

---

# Resultado esperado

Dashboard coherente con arquitectura embebida modular.

---

# 8. REFACTORIZAR ModeSelector.jsx

Archivo:

```text
frontend/src/components/ModeSelector.jsx
```

---

# Situación arquitectónica actual

El sistema ya opera oficialmente sobre:

# SERIAL como modo principal

---

# Problema

Actualmente el selector mantiene:

```text
SIMULATION
SERIAL
WIFI
```

aunque:

| Modo       | Estado            |
| ---------- | ----------------- |
| SERIAL     | ✅ oficial         |
| SIMULATION | ⚠️ solo pruebas   |
| WIFI       | ❌ no implementado |

---

# Estrategia recomendada

## Opción oficial

Mantener selector solo como:

# herramienta de diagnóstico

---

# Cambios visuales

## SERIAL

* modo principal
* destacado

## SIMULATION

* secundario
* etiquetado como TEST

## WIFI

* bloqueado temporalmente

---

# Resultado esperado

UI alineada al estado real del proyecto.

---

# 9. REFACTORIZAR useSocket.js

Archivo:

```text
frontend/src/hooks/useSocket.js
```

---

# Objetivos

Agregar:

* reconexión robusta
* estados offline
* manejo de errores
* indicador de conexión
* timeout visual

---

# Nuevos estados

| Estado       | Significado   |
| ------------ | ------------- |
| CONNECTED    | conectado     |
| DISCONNECTED | backend caído |
| RECONNECTING | reconectando  |

---

# Resultado esperado

Dashboard tolerante a fallos.

---

# 10. IMPLEMENTAR INDICADOR DE CONECTIVIDAD

## Nuevo componente

```text
ConnectionStatus.jsx
```

---

# Objetivo

Mostrar:

* conexión WebSocket
* backend online
* estado tiempo real

---

# Estados visuales

## ONLINE

Verde.

## OFFLINE

Rojo.

## RECONNECTING

Amarillo.

---

# Resultado esperado

Diagnóstico visual inmediato.

---

# 11. REFACTOR CSS — DASHBOARD INDUSTRIAL

Archivo:

```text
frontend/src/styles.css
```

---

# Estado actual

⚠️ prototipo visual académico

---

# Objetivo

Convertir UI en:

# dashboard industrial moderno

---

# Nueva línea visual

## Inspiración

* SCADA ligero
* dashboards IoT industriales
* monitoreo en tiempo real
* telemetría crítica

---

# Requerimientos visuales

## Fondo

```text
oscuro industrial
```

---

## Cards

* alto contraste
* bordes suaves
* sombras moderadas
* responsive

---

## Alertas

* rojo crítico
* amarillo advertencia
* verde estable

---

## Layout

```text
CSS Grid
```

---

# Resultado esperado

Interfaz profesional coherente con sistema industrial.

---

# 12. IMPLEMENTAR ESTADO GLOBAL PERSISTENTE

## Objetivo

El frontend debe reflejar:

```js
any_alert
```

como:

# estado dominante del sistema

---

# Reglas

## Si cualquier alerta existe

Todo el dashboard cambia de estado visual:

* bordes
* header
* banner
* glow
* indicadores

---

# Resultado esperado

Retroalimentación visual inmediata.

---

# 13. PREPARAR FRONTEND PARA ESCALABILIDAD

## Objetivo

Dejar arquitectura lista para futuras ETAPAS:

| Futuro módulo     | Estado |
| ----------------- | ------ |
| Historial         | futuro |
| Gráficas          | futuro |
| MQTT              | futuro |
| WiFi ESP32        | futuro |
| Multi-dispositivo | futuro |
| Analytics         | futuro |

---

# Estrategia

## Crear carpetas futuras

```text
services/
context/
layouts/
utils/
```

---

# Resultado esperado

Frontend preparado para crecimiento real.

---

# 14. NUEVA ESTRUCTURA RECOMENDADA

```text
frontend/src/

components/
│
├── SensorCard.jsx
├── StatusIndicator.jsx
├── AlertsPanel.jsx
├── SystemStatus.jsx
├── ConnectionStatus.jsx
├── ModeSelector.jsx
│
hooks/
│
├── useSocket.js
│
pages/
│
└── Dashboard.jsx
│
services/
│
└── socket.service.js
│
styles/
│
├── dashboard.css
├── alerts.css
├── cards.css
└── globals.css
│
App.jsx
main.jsx
```

---

# 15. NUEVO FLUJO ARQUITECTÓNICO

```text
Backend Node.js
        │
        ▼
Socket.IO
        │
        ▼
useSocket()
        │
        ▼
Dashboard.jsx
        │
 ┌──────┼─────────────┬─────────────┐
 ▼      ▼             ▼             ▼
Cards  AlertsPanel  SystemStatus  ConnectionStatus
```

---

# 16. ESTRATEGIA OFICIAL DE IMPLEMENTACIÓN

# IMPLEMENTACIÓN INCREMENTAL CONTROLADA

---

# Orden obligatorio

| Orden | Acción                |
| ----- | --------------------- |
| 1     | Refactor Dashboard    |
| 2     | Refactor modelo datos |
| 3     | Nuevas alertas        |
| 4     | Estado global         |
| 5     | Conectividad          |
| 6     | Refactor visual       |
| 7     | Responsividad         |
| 8     | Validación final      |

---

# ⚠️ REGLAS CRÍTICAS

---

# NO MODIFICAR

| Área     | Estado    |
| -------- | --------- |
| Backend  | ✅ estable |
| Firmware | ✅ estable |
| Serial   | ✅ estable |
| Parser   | ✅ estable |
| Prisma   | ✅ estable |

---

# SOLO ALINEAR FRONTEND

* visualización
* payloads
* UX
* alertas
* telemetría

---

# ✅ RIESGOS IDENTIFICADOS

| Riesgo             | Mitigación            |
| ------------------ | --------------------- |
| Re-render excesivo | componentización      |
| UI inconsistente   | estado global central |
| Alertas duplicadas | panel consolidado     |
| Socket inestable   | reconexión robusta    |
| CSS caótico        | separación modular    |
| Datos undefined    | fallback visual       |

---

# ✅ ESTIMACIÓN DE TIEMPO

| Bloque              | Tiempo |
| ------------------- | ------ |
| Refactor Dashboard  | 2 h    |
| Sistema alertas     | 2 h    |
| Estado global       | 1 h    |
| Conectividad        | 1 h    |
| Refactor CSS        | 3 h    |
| Testing tiempo real | 2 h    |
| Ajustes UX          | 2 h    |

---

# Tiempo total estimado

```text
≈ 13 horas efectivas
```

---

# ✅ CRITERIOS DE ÉXITO

La ETAPA 10 se considerará completada cuando:

---

## Frontend

✅ consuma payload oficial completo

## Dashboard

✅ represente todas las alertas

## UI

✅ refleje prioridades críticas

## WebSocket

✅ sea estable y tolerante

## Telemetría

✅ esté consolidada

## UX

✅ sea industrial y profesional

## Integración

✅ firmware ↔ backend ↔ frontend alineados

---

# ✅ RESULTADO ESPERADO FINAL

## Sistema embebido

✅ terminado

## Backend

✅ consolidado

## Frontend

✅ alineado

## Dashboard industrial

✅ operativo

## Arquitectura IoT distribuida

✅ completamente integrada

---

# ✅ ESTADO POST-ETAPA 10

| Área                     | Estado      |
| ------------------------ | ----------- |
| Hardware                 | ✅ TERMINADO |
| Firmware                 | ✅ TERMINADO |
| Backend                  | ✅ TERMINADO |
| Persistencia             | ✅ TERMINADA |
| Dashboard IoT            | ✅ TERMINADO |
| Telemetría tiempo real   | ✅ TERMINADA |
| Arquitectura distribuida | ✅ TERMINADA |

---

# ✅ DECLARACIÓN OFICIAL

La ETAPA 10 representa:

# el cierre visual y operativo definitivo

del:

# Sistema Inteligente de Monitoreo Ambiental para Almacenes Industriales

con arquitectura IoT modular completamente funcional en tiempo real.
