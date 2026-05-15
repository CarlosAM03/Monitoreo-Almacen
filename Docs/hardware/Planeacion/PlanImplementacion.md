
---

# 🧠 OBJETIVO DE ETAPA 5

Cuando termines esta parte debes poder responder:

| Pregunta                         | Respuesta clara |
| -------------------------------- | --------------- |
| ¿Dónde vive cada cosa?           | ✅               |
| ¿Quién controla hardware?        | ✅               |
| ¿Quién toma decisiones?          | ✅               |
| ¿Quién ejecuta tareas?           | ✅               |
| ¿Cómo se comparte el estado?     | ✅               |
| ¿Cómo se agregan módulos nuevos? | ✅               |

---

# ✅ ESTRUCTURA REAL RECOMENDADA


```text id="r4nvtw"
firmware/
│
├── firmware.ino
│
├── config/
│   ├── pins.h
│   ├── constants.h
│   └── thresholds.h
│
├── core/
│   ├── scheduler.h
│   ├── scheduler.cpp
│   ├── system_state.h
│   └── system_state.cpp
│
├── hal/
│   ├── dht_sensor.h
│   ├── dht_sensor.cpp
│   │
│   ├── ultrasonic_sensor.h
│   ├── ultrasonic_sensor.cpp
│   │
│   ├── flame_sensor.h
│   ├── flame_sensor.cpp
│   │
│   ├── ldr_sensor.h
│   ├── ldr_sensor.cpp
│   │
│   ├── lcd_display.h
│   ├── lcd_display.cpp
│   │
│   ├── servo_motor.h
│   ├── servo_motor.cpp
│   │
│   ├── leds.h
│   ├── leds.cpp
│   │
│   ├── buzzer.h
│   └── buzzer.cpp
│
├── services/
│   ├── alert_service.h
│   ├── alert_service.cpp
│   │
│   ├── automation_service.h
│   ├── automation_service.cpp
│   │
│   ├── environment_service.h
│   ├── environment_service.cpp
│   │
│   ├── display_service.h
│   └── display_service.cpp
│
├── app/
│   ├── tasks.h
│   └── tasks.cpp
│
└── communication/
    ├── serial_protocol.h
    └── serial_protocol.cpp
```
# ESTRUCTURA RECOMENDADA REAL PARA ARDUINO IDE
```text id="r4nvtw"

firmware/

firmware.ino

pins.h
constants.h
thresholds.h

system_state.h
system_state.cpp

scheduler.h
scheduler.cpp

tasks.h
tasks.cpp

dht_sensor.h
dht_sensor.cpp

ultrasonic_sensor.h
ultrasonic_sensor.cpp

flame_sensor.h
flame_sensor.cpp

ldr_sensor.h
ldr_sensor.cpp

lcd_display.h
lcd_display.cpp

servo_motor.h
servo_motor.cpp

leds.h
leds.cpp

buzzer.h
buzzer.cpp

alert_service.h
alert_service.cpp

automation_service.h
automation_service.cpp

display_service.h
display_service.cpp

serial_protocol.h
serial_protocol.cpp

```

---

# 🧠 POR QUÉ ESTA ESTRUCTURA ES MUY BUENA

Porque cada carpeta tiene:

# una responsabilidad única

---

# 🔷 config/

Contiene configuración global.

---

## pins.h

Define TODOS los pines.

Ejemplo:

```cpp id="55ec8t"
#define DHT_PIN 2
#define TRIG_PIN 3
```

---

## thresholds.h

Contiene umbrales del sistema.

Ejemplo:

```cpp id="hql7pv"
#define TEMP_ALERT 35.0
#define DIST_ALERT 20
```

---

# 🧠 VENTAJA

Cambias parámetros sin tocar lógica.

---

# 🔷 core/

Contiene el núcleo del firmware.

---

## scheduler

Controla tareas.

---

## system_state

Contiene:

```cpp id="t6k4ek"
SystemState systemState;
```

---

# 🧠 ESTO ES EL CENTRO DEL SISTEMA

TODO gira alrededor del estado global.

---

# 🔷 hal/

Controla hardware directamente.

---

# REGLA ABSOLUTA

Los módulos HAL:

❌ NO toman decisiones
❌ NO activan alertas
❌ NO conocen lógica del sistema

---

# EJEMPLO CORRECTO

## dht_sensor.cpp

Solo hace:

```cpp id="1z74n5"
float dht_readTemperature()
```

---

# 🔷 services/

Aquí vive:

# la inteligencia del sistema

---

# alert_service

Evalúa:

* incendio,
* intrusión,
* temperatura.

---

# automation_service

Decide:

* servo,
* LEDs,
* buzzer.

---

# display_service

Decide:

* qué mostrar,
* prioridades LCD,
* rotación de pantallas.

---

# 🧠 ESTO ES MUY IMPORTANTE

Los services:

✅ leen `systemState`
✅ modifican `systemState`
❌ NO deben controlar hardware directamente

---

# 🔷 app/

Contiene tareas reales.

---

# tasks.cpp

Aquí están:

```cpp id="tv5kt6"
task_fastSensors();
task_alerts();
task_lcd();
```

---

# 🧠 IMPORTANTE

Las tasks:

# orquestan

NO contienen lógica compleja.

---

# 🔷 communication/

Todo lo relacionado con serial.

---

# serial_protocol.cpp

Convierte:

```cpp id="80q0w2"
systemState
```

a:

```text id="q2y46f"
TEMP:25,HUM:60,DIST:45
```

---

# 🧠 VENTAJA GIGANTE

Cuando hagas backend:

NO tendrás que tocar sensores.

---

# 🎯 DEPENDENCIAS CORRECTAS

Esto es MUY importante.

---

# ✅ DIRECCIÓN CORRECTA

```text id="4h1c8g"
App
 ↓
Services
 ↓
HAL
 ↓
Hardware
```

---

# ❌ DIRECCIÓN INCORRECTA

```text id="g80i7w"
HAL
 ↓
Services
```

El hardware NO debe conocer lógica.

---

# 🧠 EJEMPLO REAL

---

# HAL

```cpp id="k86h2r"
bool flame_detected()
```

---

# Service

```cpp id="v1yjvh"
if(systemState.sensors.flameDetected)
```

---

# Automation

```cpp id="e5v8po"
systemState.actuators.redLed = true;
```

---

# Actuator Task

```cpp id="oz0w2q"
led_red_on();
```

---

# 🧠 ESO ES DESACOPLAMIENTO REAL

---

# 🎯 ORDEN IDEAL DE IMPLEMENTACIÓN

Esto es IMPORTANTÍSIMO para no perder tiempo.

---

# ✅ FASE 1 — CORE

Primero:

## config/

## core/

---

# IMPLEMENTAR

* pins.h
* thresholds.h
* system_state
* scheduler base

---

# ⏱️ TIEMPO

1–2 horas.

---

# ✅ FASE 2 — HAL

Implementar wrappers de hardware.

---

# OBJETIVO

Convertir todos tus códigos de prueba en módulos reutilizables.

---

# EJEMPLO

Tu código actual del DHT:

❌ sketch aislado

↓

✅ dht_sensor.cpp

---

# ⏱️ TIEMPO

3–4 horas.

---

# ✅ FASE 3 — SERVICES

Implementar inteligencia.

---

# OBJETIVO

Separar:

* lectura,
* lógica,
* automatización.

---

# ⏱️ TIEMPO

2–3 horas.

---

# ✅ FASE 4 — TASKS

Integrar scheduler.

---

# OBJETIVO

Sistema completo funcionando sin `delay()`.

---

# ⏱️ TIEMPO

2–3 horas.

---

# ✅ FASE 5 — SERIAL + LCD

Última integración.

---

# OBJETIVO

* visualización estable,
* telemetría limpia.

---

# ⏱️ TIEMPO

2–3 horas.

---

# 📊 TIEMPO TOTAL REALISTA

| Etapa      | Tiempo |
| ---------- | ------ |
| Core       | 1–2 h  |
| HAL        | 3–4 h  |
| Services   | 2–3 h  |
| Tasks      | 2–3 h  |
| Serial/LCD | 2–3 h  |

---

# TOTAL

# 12–15 horas

Que coincide perfectamente con tu meta.

---

# 🧠 LA DECISIÓN MÁS IMPORTANTE

NO intentes:

* hacer clases complejas,
* patrones enterprise,
* OOP pesada,
* frameworks,
* abstracciones excesivas.

---

# 🎯 TU MEJOR OPCIÓN

# C modular simple + arquitectura limpia

Porque:

| Necesidad    | Resultado |
| ------------ | --------- |
| estabilidad  | ✅         |
| rapidez      | ✅         |
| claridad     | ✅         |
| Arduino Uno  | ✅         |
| RAM limitada | ✅         |
| tiempo corto | ✅         |

---

# 🚀 ESTADO ACTUAL REAL

En este momento ya tienes definido:

✅ arquitectura global
✅ arquitectura interna
✅ flujo del firmware
✅ scheduler
✅ estado global
✅ separación de capas
✅ estrategia modular
✅ estructura de carpetas
✅ dependencias correctas
✅ plan de implementación
