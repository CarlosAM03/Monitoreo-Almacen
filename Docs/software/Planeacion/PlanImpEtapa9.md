# 📘 PLAN OFICIAL DE IMPLEMENTACIÓN — ETAPA 9

# 🔷 Realineación Backend ↔ Firmware Final

## Sistema Inteligente de Monitoreo Ambiental para Almacenes Industriales

---

# ✅ CONTEXTO OFICIAL

Las primeras 8 etapas del proyecto fueron completadas exitosamente entre:

* 13 de mayo de 2026
* 14 de mayo de 2026

Tiempo real utilizado:

```text
14 horas efectivas
```

contra:

```text
16 horas estimadas
```

Resultado:

# ✅ adelanto respecto al cronograma autoimpuesto

---

# ✅ ESTADO ACTUAL DEL SISTEMA

## Hardware

✅ COMPLETAMENTE FUNCIONAL

## Firmware

✅ ESTABLE
✅ MODULAR
✅ CERRADO FUNCIONALMENTE

## Arquitectura embebida

✅ FINALIZADA

## Scheduler cooperativo

✅ ESTABLE

## Servicios de automatización

✅ OPERATIVOS

## Protocolo serial estructurado

✅ DEFINITIVO

## Backend base

✅ IMPLEMENTADO

## Frontend base

✅ IMPLEMENTADO

---

# ⚠️ PROBLEMA ACTUAL

El backend y frontend fueron desarrollados antes del cierre definitivo del firmware.

Por ello:

# existe una desalineación estructural parcial

entre:

* firmware final
* parser serial
* mapper backend
* esquema Prisma
* payload WebSocket
* dashboard frontend

---

# ✅ OBJETIVO DE ETAPA 9

La ETAPA 9 tiene como objetivo:

# consolidar completamente la integración firmware ↔ backend

sin modificar la arquitectura base ya construida.

---

# ✅ PRINCIPIO ARQUITECTÓNICO

La arquitectura NO debe rehacerse.

La ETAPA 9 consiste únicamente en:

# REALINEACIÓN CONTROLADA

---

# ✅ OBJETIVOS TÉCNICOS DE ETAPA 9

---

# 1. VALIDAR PROTOCOLO SERIAL FINAL

## Objetivo

Confirmar que el firmware transmite correctamente:

```text
TEMP
HUM
DIST
FLAME
LIGHT
FIRE
INTRUSION
TEMP_ALERT
HIGH_HUM
LOW_LIGHT
ANY_ALERT
```

---

## Resultado esperado

Backend capaz de interpretar:

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

sin pérdida de datos.

---

# 2. ACTUALIZAR PARSER SERIAL

Archivo objetivo:

```text
backend/src/utils/parser.js
```

---

## Objetivo

Expandir soporte completo del parser hacia el protocolo definitivo.

---

## Acciones

### Mantener

```text
temp
hum
dist
flame
light
```

### Agregar

```text
fire
intrusion
temp_alert
high_hum
low_light
any_alert
```

---

## Resultado esperado

Payload serial completamente normalizado.

---

# 3. ACTUALIZAR SENSOR MAPPER

Archivo objetivo:

```text
backend/src/modules/sensor/sensor.mapper.js
```

---

# Objetivo

Eliminar estructura heredada de hardware descartado.

---

## Eliminar

```text
gas
mov
```

---

## Agregar

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

## Resultado esperado

Modelo backend 100% alineado al firmware real.

---

# 4. ACTUALIZAR SENSOR SERVICE

Archivo objetivo:

```text
backend/src/modules/sensor/sensor.service.js
```

---

# Objetivos

## Validar

* integración provider → parser
* integración parser → mapper
* integración mapper → gateway
* integración mapper → Prisma

---

## Verificar

* consistencia de payloads
* estabilidad de emisión
* ausencia de errores undefined
* persistencia correcta

---

# Resultado esperado

Servicio completamente alineado y estable.

---

# 5. ACTUALIZAR PAYLOAD WEBSOCKET

Evento:

```text
sensor:data
```

---

# Objetivo

Emitir payload final oficial del sistema.

---

## Payload objetivo

```json
{
  "temp": 24,
  "hum": 58,
  "dist": 120,
  "flame": 0,
  "light": 650,
  "fire": 0,
  "intrusion": 0,
  "temp_alert": 0,
  "high_hum": 0,
  "low_light": 0,
  "any_alert": 0,
  "source": "SERIAL"
}
```

---

# Resultado esperado

Frontend recibe estructura definitiva estable.

---

# 6. ACTUALIZAR PRISMA

Archivo:

```text
backend/prisma/schema.prisma
```

---

# Objetivo

Realinear persistencia con arquitectura embebida final.

---

## Eliminar

```prisma
gas
mov
```

---

## Agregar

```prisma
light
fire
intrusion
tempAlert
highHum
lowLight
anyAlert
```

---

# Resultado esperado

Persistencia completamente compatible con firmware final.

---

# 7. EJECUTAR MIGRACIÓN FINAL

## Objetivo

Actualizar base de datos local.

---

## Acciones

```bash
npx prisma migrate dev
```

---

## Verificar

* generación correcta
* ausencia de conflictos
* integridad del modelo

---

# 8. VALIDAR SERIAL REAL

## Objetivo

Probar integración física REAL.

---

## Verificaciones

### Serial

✅ lectura continua

### Parser

✅ parseo correcto

### Gateway

✅ emisión estable

### Frontend

✅ actualización en tiempo real

### Persistencia

✅ inserción correcta

---

# Resultado esperado

Sistema completamente operativo extremo a extremo.

---

# 9. PRUEBAS DE ALERTAS

## Objetivo

Verificar coherencia total entre firmware y backend.

---

## Casos mínimos

| Evento            | Resultado esperado |
| ----------------- | ------------------ |
| Flama detectada   | `fire=1`           |
| Distancia crítica | `intrusion=1`      |
| Temperatura alta  | `temp_alert=1`     |
| Humedad alta      | `high_hum=1`       |
| Baja iluminación  | `low_light=1`      |
| Cualquier alerta  | `any_alert=1`      |

---

# Resultado esperado

Backend reflejando exactamente el estado del firmware.

---

# 10. PREPARACIÓN PARA ETAPA 10

## Objetivo

Dejar backend completamente estabilizado para:

# 🔷 ETAPA 10 — DASHBOARD FINAL

---

# ETAPA 10 incluirá

* rediseño visual
* tarjetas dinámicas
* indicadores globales
* alertas visuales
* panel consolidado
* estado global
* integración total firmware ↔ backend ↔ frontend

---

# ✅ ESTRATEGIA DE IMPLEMENTACIÓN

La ETAPA 9 debe ejecutarse bajo:

# enfoque incremental controlado

---

# Orden obligatorio

| Orden | Acción            |
| ----- | ----------------- |
| 1     | Parser            |
| 2     | Mapper            |
| 3     | Service           |
| 4     | Prisma            |
| 5     | Migración         |
| 6     | WebSocket         |
| 7     | Validación serial |
| 8     | Pruebas reales    |

---

# ⚠️ REGLAS DE ESTABILIDAD

---

## NO modificar

### Firmware

✅ YA ESTABLE

### Scheduler

✅ YA ESTABLE

### Arquitectura modular

✅ YA ESTABLE

### Providers

✅ YA ESTABLE

---

# SOLO REALINEAR

* modelos
* payloads
* parser
* persistencia
* frontend expectations

---

# ✅ ESTIMACIÓN DE TIEMPO

## Tiempo proyectado

| Bloque                    | Tiempo |
| ------------------------- | ------ |
| Parser + mapper           | 45 min |
| Prisma + migración        | 45 min |
| Payload + gateway         | 45 min |
| Validación serial         | 60 min |
| Ajustes y debugging       | 90 min |
| Frontend mínimo funcional | 60 min |

---

# Total estimado

```text
≈ 6 horas efectivas
```

---

# ✅ RIESGOS IDENTIFICADOS

| Riesgo                        | Mitigación                |
| ----------------------------- | ------------------------- |
| Payload inconsistente         | Validación incremental    |
| Variables undefined           | Mapper centralizado       |
| Prisma fuera de sync          | Migración inmediata       |
| Frontend roto                 | Compatibilidad progresiva |
| Errores seriales              | Logs temporales           |
| Estados booleanos incorrectos | Normalización explícita   |

---

# ✅ CRITERIOS DE ÉXITO

La ETAPA 9 se considerará completada cuando:

---

## Backend

✅ interprete correctamente el serial final

## Prisma

✅ almacene el modelo definitivo

## WebSocket

✅ emita payload consolidado

## Frontend

✅ reciba datos sin errores

## Integración física

✅ funcione en tiempo real

## Alertas

✅ reflejen exactamente el firmware

---

# ✅ RESULTADO ESPERADO AL FINAL DEL DÍA 15 DE MAYO DE 2026

## Sistema embebido

✅ FINALIZADO

## Backend

✅ ALINEADO AL FIRMWARE FINAL

## Persistencia

✅ CONSOLIDADA

## Comunicación serial

✅ ESTABLE

## Arquitectura distribuida

✅ OPERATIVA

## Integración física real

✅ VALIDADA

---

# ✅ ESTADO PROYECTADO POST-ETAPA 9

| Área                  | Estado esperado |
| --------------------- | --------------- |
| Hardware              | ✅ TERMINADO     |
| Firmware              | ✅ TERMINADO     |
| Arquitectura embebida | ✅ TERMINADA     |
| Backend               | ✅ TERMINADO     |
| Persistencia          | ✅ TERMINADA     |
| Integración serial    | ✅ TERMINADA     |
| Frontend visual final | ⏳ ETAPA 10      |

---

# ✅ DECLARACIÓN OFICIAL

La ETAPA 9:

# NO ES UNA RECONSTRUCCIÓN

sino:

# una consolidación final de integración

sobre una arquitectura ya funcional y correctamente diseñada.

---

# ✅ PRÓXIMO HITO

Tras completar ETAPA 9:

# 🔷 ETAPA 10 — DASHBOARD FINAL + UX + VISUALIZACIÓN CONSOLIDADA

---

# ✅ CIERRE OFICIAL DEL DÍA

## Estado emocional/técnico del proyecto

✅ arquitectura sólida
✅ firmware estable
✅ hardware validado
✅ cronograma adelantado
✅ riesgos controlados
✅ integración claramente definida

---

# ✅ ESTADO FINAL ANTES DE DESCANSO

El proyecto:

# ya superó la fase crítica de incertidumbre

y entró oficialmente en:

# fase de consolidación final del sistema.
