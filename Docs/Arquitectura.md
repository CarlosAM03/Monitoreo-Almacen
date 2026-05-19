# Sistema Inteligente de Monitoreo Ambiental para Almacenes Industriales

## 🔷 Arquitectura General del Proyecto

```text
┌────────────────────────────────────────────┐
│         FRONTEND REACT (Dashboard)         │
│--------------------------------------------│
│ Visualización en tiempo real               │
│ Alertas visuales                           │
│ Estado de sensores                         │
│ Monitoreo remoto                           │
└────────────────────────────────────────────┘
                     ▲
                     │ WebSocket
                     ▼
┌────────────────────────────────────────────┐
│           BACKEND NODE.JS                  │
│--------------------------------------------│
│ Lectura serial                             │
│ Parser de datos                            │
│ Conversión a JSON                          │
│ WebSocket Server                           │
└────────────────────────────────────────────┘
                     ▲
                     │ Serial USB
                     ▼
┌────────────────────────────────────────────┐
│         ARDUINO UNO (CORE EMBEBIDO)        │
│--------------------------------------------│
│ Sensores                                   │
│ Procesamiento                              │
│ Alertas                                    │
│ Automatización                             │
│ LCD                                        │
└────────────────────────────────────────────┘
```

---

# ✅ FILOSOFÍA DEL SISTEMA

## 🔴 Sistema embebido autónomo

El Arduino Uno funciona independientemente de:

* internet
* backend
* frontend
* WiFi

El sistema puede:

* leer sensores
* activar alertas
* controlar actuadores
* mostrar información
* tomar decisiones

sin depender de software externo.

---

## 🔵 Sistema web desacoplado

El backend y frontend únicamente realizan:

* monitoreo
* visualización
* telemetría
* almacenamiento futuro
* dashboard

NO controlan hardware directamente.

---

# ✅ HARDWARE FINAL INTEGRADO

## 🔷 Plataforma principal

| Componente   | Estado |
| ------------ | ------ |
| Arduino Uno  | ✅      |
| Protoboard   | ✅      |
| LCD 16x2 I2C | ✅      |
| LEDs         | ✅      |
| Buzzer       | ✅      |
| Servo motor  | ✅      |

---

# ✅ SENSORES INTEGRADOS

## 🌡️ DHT11

### Función

* temperatura
* humedad ambiental

### Estado

✅ FUNCIONANDO

### Pin

| Señal | Arduino |
| ----- | ------- |
| DATA  | D2      |

---

## 📏 HC-SR04

### Función

* distancia
* perímetro
* intrusión

### Estado

✅ FUNCIONANDO

### Pines

| Señal | Arduino |
| ----- | ------- |
| TRIG  | D3      |
| ECHO  | D4      |

### Configuración importante

```cpp
pulseIn(echoPin, HIGH, 30000);
```

para evitar bloqueos del sistema.

---

## 🔥 KY-026

### Función

* detección de flama
* posible incendio

### Estado

✅ FUNCIONANDO

### Pin

| Señal | Arduino |
| ----- | ------- |
| DO    | D5      |

### Lógica validada físicamente

```cpp
if (flama != 0)
```

Porque:

* `!= 0` → flama detectada
* `== 0` → sin flama

---

## 🌞 LDR Analógico (fotoresistor discreto)

### Función

* iluminación ambiental
* detección de baja luz

### Estado

✅ FUNCIONANDO

### Configuración

Implementado mediante:

* LDR discreto
* resistencia de 10kΩ
* divisor de voltaje analógico

### Pin

| Señal | Arduino |
| ----- | ------- |
| AO    | A0      |

---

# ✅ ACTUADORES INTEGRADOS

## 🔊 Buzzer activo

### Función

* alerta sonora

### Estado

✅ FUNCIONANDO

### Pin

| Señal  | Arduino |
| ------ | ------- |
| SIGNAL | D7      |

---

## 🟢 LED Verde

### Función

* estado normal

### Estado

✅ FUNCIONANDO

### Pin

| Señal     | Arduino |
| --------- | ------- |
| LED Verde | D8      |

---

## 🔴 LED Rojo

### Función

* estado de alerta

### Estado

✅ FUNCIONANDO

### Pin

| Señal    | Arduino |
| -------- | ------- |
| LED Rojo | D9      |

---

## ⚙️ STEREN MONT-100

### Función

* apertura automática de ventilación
* simulación de compuerta
* simulación de rociadores

### Estado

✅ FUNCIONANDO

### Pin

| Señal | Arduino |
| ----- | ------- |
| PWM   | D6      |

### Uso previsto

* temperatura alta
* humedad elevada
* incendio confirmado

---

# ✅ LCD I2C VALIDADO

## Estado

✅ FUNCIONANDO

## Pines

| LCD | Arduino |
| --- | ------- |
| SDA | A4      |
| SCL | A5      |
| VCC | 5V      |
| GND | GND     |

---

# ✅ DISTRIBUCIÓN ELÉCTRICA DEFINITIVA

## Alimentación principal

| Arduino | Protoboard |
| ------- | ---------- |
| 5V      | Barra roja |
| GND     | Barra azul |

---

## Barras de alimentación

| Barra | Función |
| ----- | ------- |
| Roja  | +5V     |
| Azul  | GND     |

---

## Importante

Las barras:

* superior
* inferior

fueron puenteadas correctamente para distribuir energía en toda la protoboard.

---

# ✅ PRINCIPIO DE DISEÑO DEL HARDWARE

## La protoboard funciona como:

# centro de distribución eléctrica

NO como área de conexiones aleatorias.

---

# ✅ ORGANIZACIÓN FÍSICA

## Centro

* Arduino Uno
* protoboard

---

## Frontal

* LCD I2C

---

## Laterales

* LEDs
* buzzer

---

## Zona frontal

* HC-SR04

---

## Zona superior

* DHT11
* LDR

---

## Zona crítica

* sensor de flama

---

## Zona de automatización

* servomotor

---

# ✅ DEFINICIÓN DE COMPORTAMIENTO

# 🟢 Estado normal

* LED verde encendido
* buzzer apagado
* servo cerrado
* LCD mostrando lecturas

---

# 🔴 Estado de alerta

Si ocurre:

* flama
* temperatura alta
* intrusión
* incendio confirmado

Entonces:

* LED rojo encendido
* LED verde apagado
* buzzer activo
* activación de servo
* LCD mostrando alerta

---

# ✅ COMPORTAMIENTO DEL SERVO

## 🌡️ Temperatura alta

Abrir ventilación automáticamente.

---

## 💧 Humedad alta

Mejorar flujo de aire.

---

## 🔥 Incendio confirmado

Simular:

* apertura de emergencia
* activación de mecanismo de seguridad
* sistema de rociadores

---

# ✅ COMPORTAMIENTO FINAL DEL LCD

## 🟢 Pantalla normal consolidada

```text
T:24 H:58
D:120 L:650
```

---

## 🔥 Pantalla de incendio

```text
!!! ALERTA !!!
FUEGO DETECT
```

---

## 🚨 Pantalla de intrusión

```text
!!! ALERTA !!!
INTRUSION
```

---

## 🌡️ Pantalla de temperatura o humedad alta

```text
T o H ELEVADAS
REVISION
```

---


## 🌑 Pantalla de baja iluminación

```text
BAJA LUZ
REVISION
```

---

# ✅ ARQUITECTURA EMBEBIDA

## El firmware NO utilizará:

```cpp
delay()
```

## El firmware utilizará:

# `millis()`

para implementar:

* multitarea cooperativa
* scheduler básico
* prioridades
* tareas no bloqueantes
* respuesta inmediata

---

# ✅ ARQUITECTURA FINAL DEL FIRMWARE

El firmware fue implementado mediante arquitectura modular desacoplada.

Cada subsistema del hardware fue separado en módulos independientes para mejorar:

* mantenibilidad
* escalabilidad
* depuración
* integración backend
* reutilización

---

# 📂 ESTRUCTURA FINAL DEL FIRMWARE

```text
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

environment_service.h
environment_service.cpp

serial_protocol.h
serial_protocol.cpp
```

---

# ✅ COMPONENTES LÓGICOS IMPLEMENTADOS

| Subsistema         | Responsabilidad          |
| ------------------ | ------------------------ |
| Scheduler          | Multitarea cooperativa   |
| Tasks              | Orquestación general     |
| System State       | Estado global compartido |
| Alert Service      | Evaluación de alertas    |
| Automation Service | Automatización física    |
| Display Service    | Priorización visual LCD  |
| Serial Protocol    | Comunicación backend     |
| Sensores           | Lectura de entradas      |
| Actuadores         | Control físico           |

---

# ✅ ESTADO GLOBAL CENTRALIZADO

El firmware utiliza:

```cpp
SystemState systemState;
```

como estructura global compartida entre módulos.

Esto permite:

* desacoplamiento
* modularidad
* sincronización centralizada
* integración futura con backend IoT

---

# ✅ SERVICIOS IMPLEMENTADOS

## Alert Service

Evalúa:

* intrusión
* incendio
* temperatura alta
* humedad alta
* baja iluminación
* alerta global consolidada

---

## Automation Service

Controla automáticamente:

* LEDs
* buzzer
* servo motor

según prioridades del sistema.

---

## Display Service

Administra:

* prioridad de pantallas
* alertas críticas
* visualización LCD

---

## Serial Protocol

Genera comunicación serial estructurada para:

* backend Node.js
* parser serial
* WebSockets
* dashboard React

---

# ✅ PRINCIPIOS DEL FIRMWARE

El firmware final quedó diseñado bajo:

* arquitectura modular
* multitarea cooperativa
* no bloqueo
* separación de responsabilidades
* desacoplamiento hardware/software
* compatibilidad IoT
* integración web futura

---

# ✅ ARQUITECTURA DE TAREAS

## 🔷 Tarea 1 — Sensores rápidos

Frecuencia:

```text
200 ms
```

### Sensores

* HC-SR04
* flama
* LDR

### Prioridad

# ALTA

---

## 🔷 Tarea 2 — DHT11

Frecuencia:

```text
2 segundos
```

### Prioridad

# MEDIA

---

## 🔷 Tarea 3 — Alertas

Frecuencia:

```text
100 ms
```

### Evalúa

* incendio
* intrusión
* temperatura
* humedad
* iluminación

### Prioridad

# CRÍTICA

---

## 🔷 Tarea 4 — Automatización

Frecuencia:

```text
100 ms
```

### Función

* lógica física automatizada
* actualización de actuadores virtuales

### Prioridad

# ALTA

---

## 🔷 Tarea 5 — Actuadores

Frecuencia:

```text
100 ms
```

### Función

* LEDs
* buzzer
* servo

### Prioridad

# ALTA

---

## 🔷 Tarea 6 — LCD

Frecuencia:

```text
1 segundo
```

### Función

* actualización visual
* mensajes prioritarios
* alertas persistentes

### Prioridad

# MEDIA

---

## 🔷 Tarea 7 — Serial

Frecuencia:

```text
1 segundo
```

### Función

* comunicación con backend
* telemetría serial

### Prioridad

# BAJA

---

# ✅ PRIORIDADES DEL SISTEMA

| Prioridad | Subsistema       |
| --------- | ---------------- |
| CRÍTICA   | alertas          |
| ALTA      | sensores rápidos |
| ALTA      | automatización   |
| ALTA      | actuadores       |
| MEDIA     | LCD              |
| MEDIA     | DHT11            |
| BAJA      | serial/web       |

---

# ✅ FORMATO SERIAL FINAL IMPLEMENTADO

La comunicación serial quedó estructurada para integración con backend Node.js y dashboard web.

Formato real implementado en firmware:

```text
TEMP:23.70,
HUM:55.30,
DIST:161,
FLAME:0,
LIGHT:235,
FIRE:0,
INTRUSION:0,
TEMP_ALERT:0,
HIGH_HUM:0,
LOW_LIGHT:0,
ANY_ALERT:0
```

El backend interpreta esta salida serial y la transforma en eventos WebSocket para el frontend React.

---

# ✅ ETAPAS DEL PROYECTO

## ✅ ETAPA 1 — Validación base

* LCD I2C
* Blink
* Serial Monitor

---

## ✅ ETAPA 2 — Actuadores

* LEDs
* buzzer

---

## ✅ ETAPA 3 — Sensores críticos

* DHT11
* HC-SR04
* flama

---

## ✅ ETAPA 4 — Sensores secundarios y automatización

* LDR analógico discreto
* servo motor

---

## ✅ ETAPA 5 — Arquitectura embebida profesional

* `millis()`
* scheduler cooperativo
* multitarea no bloqueante
* firmware modular
* separación por capas
* servicios desacoplados
* estado global compartido
* tareas periódicas

---

## ✅ ETAPA 6 — Lógica de alertas

* consolidación global de alertas
* múltiples alertas simultáneas
* prioridades críticas
* política centralizada de alarmas

---

## ✅ ETAPA 7 — LCD dinámico

* rotación correcta de alertas
* prioridades visuales
* pantalla normal consolidada
* mensajes persistentes

---

## ✅ ETAPA 8 — Serial estructurado

* validación final del protocolo
* telemetría estable
* parser definitivo

---

## ✅ ETAPA 9 — Backend Node.js

* lectura serial
* JSON
* WebSocket

---

## ✅ ETAPA 10 — Frontend React

* dashboard
* cards
* alertas visuales
* tiempo real

---

# ✅ DECISIÓN TÉCNICA IMPORTANTE

## WiFi descartado temporalmente

El ESP-01 NO será utilizado inicialmente.

### Razones

* complejidad innecesaria
* sensibilidad de 3.3V
* firmware AT inestable
* mayor riesgo de fallos

### Prioridad actual

# estabilidad > complejidad

---

# ✅ ESTADO ACTUAL OFICIAL DEL SISTEMA

| Área                             | Estado         |
| -------------------------------- | -------------- |
| Arquitectura física              | ✅ TERMINADA    |
| Distribución eléctrica           | ✅ TERMINADA    |
| Sensores integrados              | ✅ TERMINADOS   |
| Actuadores integrados            | ✅ TERMINADOS   |
| LCD I2C                          | ✅ FUNCIONAL    |
| Automatización física            | ✅ FUNCIONAL    |
| Scheduler cooperativo            | ✅ IMPLEMENTADO |
| Firmware modular                 | ✅ TERMINADO    |
| Comunicación serial estructurada | ✅ IMPLEMENTADA |
| Backend Node.js                  | ✅ PREPARADO    |
| Frontend React                   | ✅ PREPARADO    |
| Integración web                  | ✅ IMPLEMENTADA     |
