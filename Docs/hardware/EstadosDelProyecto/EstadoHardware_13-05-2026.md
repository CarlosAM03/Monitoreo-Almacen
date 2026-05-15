
---

# 🏭 Sistema Inteligente de Monitoreo Ambiental para Almacenes Industriales

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

## ⏳ ETAPA 5 — Arquitectura embebida profesional

* `millis()`
* multitarea cooperativa
* scheduler básico
* prioridades
* firmware modular

---

## ⏳ ETAPA 6 — Lógica de alertas

* incendio confirmado
* intrusión
* temperatura alta
* iluminación baja

---

## ⏳ ETAPA 7 — LCD dinámico

* rotación de pantallas
* alertas prioritarias

---

## ⏳ ETAPA 8 — Serial estructurado

* telemetría serial
* parser

---

## ⏳ ETAPA 9 — Backend Node.js

* lectura serial
* JSON
* WebSocket

---

## ⏳ ETAPA 10 — Frontend React

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

# ✅ ESTADO ACTUAL DEL SISTEMA

| Área                   | Estado            |
| ---------------------- | ----------------- |
| Arquitectura física    | ✅                 |
| Distribución eléctrica | ✅                 |
| LCD I2C                | ✅                 |
| LEDs                   | ✅                 |
| buzzer                 | ✅                 |
| DHT11                  | ✅                 |
| HC-SR04                | ✅                 |
| flama                  | ✅                 |
| LDR analógico          | ✅                 |
| servo                  | ✅                 |
| firmware modular       | ⏳ siguiente etapa |
| backend                | ⏳ pendiente       |
| frontend               | ⏳ pendiente       |

Actualmente el proyecto se encuentra listo para entrar a:

# ETAPA 5 — Arquitectura embebida profesional

implementando:

* `millis()`
* multitarea cooperativa
* scheduler básico
* firmware modular
* prioridades de ejecución

---

# ✅ ARQUITECTURA FINAL DEL SISTEMA

## 🔴 Sistema autónomo (core embebido)

El Arduino Uno es responsable de:

---

## 📥 Lectura de sensores

| Sensor        | Función               |
| ------------- | --------------------- |
| DHT11         | temperatura y humedad |
| HC-SR04       | distancia / intrusión |
| KY-026        | detección de flama    |
| LDR analógico | iluminación ambiental |

---

## 🧠 Procesamiento

El firmware realiza:

* validación de condiciones
* correlación entre sensores
* evaluación de alertas
* control automático de actuadores

---

## ⚙️ Actuadores

| Actuador       | Función             |
| -------------- | ------------------- |
| LCD 16x2 I2C   | visualización       |
| buzzer         | alerta sonora       |
| LED verde      | estado normal       |
| LED rojo       | estado de alerta    |
| servo MONT-100 | apertura automática |

---

# ⚙️ Servo automático

Se integró un:

# STEREN MONT-100

como actuador automático para simular:

* apertura de ventilación
* flujo de aire
* mecanismo de emergencia
* activación de compuertas
* simulación de rociadores

---

## ✅ Activación prevista del servo

| Evento              | Acción           |
| ------------------- | ---------------- |
| temperatura alta    | apertura parcial |
| humedad alta        | ventilación      |
| incendio confirmado | activación total |

---

# 🔵 Sistema web desacoplado

La interfaz web:

* NO controla hardware
* NO depende del sistema embebido
* SOLO monitorea

---

## 📊 Funciones del dashboard

* telemetría
* visualización en tiempo real
* alertas visuales
* monitoreo remoto
* estado del sistema

---

# ✅ DEFINICIÓN DE COMPORTAMIENTO

---

# 🟢 Estado normal

Condiciones normales:

* LED verde encendido
* LED rojo apagado
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

entonces:

* LED rojo encendido
* LED verde apagado
* buzzer activo
* servo activado
* LCD mostrando alerta prioritaria

---

# 📟 COMPORTAMIENTO DEL LCD

El LCD mostrará:

* rotación automática de lecturas
* mensajes de prioridad
* alertas críticas

---

## Pantalla normal

```text
T:24C H:58%
D:120 L:650
```

---

## Intrusión

```text
!! ALERTA !!
OBJETO CERCA
```

---

## Incendio

```text
!! INCENDIO !!
FLAMA DETECT
```

---

## Temperatura alta

```text
TEMP ALTA
36.5 C
```

---

## Ventilación activa

```text
VENTILACION
ACTIVADA
```

---

# ✅ ARQUITECTURA EMBEBIDA PROFESIONAL

El firmware NO utilizará:

```cpp
delay()
```

El sistema utilizará:

# `millis()`

para implementar:

* multitarea cooperativa
* tareas paralelas
* respuesta inmediata
* actualización fluida del LCD
* alertas instantáneas

---

# 🧠 ARQUITECTURA DE TAREAS

---

## 🔥 Tarea 1 — Alertas críticas

Frecuencia:

```text
cada loop
```

Prioridad:

# CRÍTICA

Evalúa:

* incendio
* intrusión
* temperatura extrema

---

## ⚡ Tarea 2 — Sensores rápidos

Frecuencia:

```text
200–500 ms
```

Sensores:

* HC-SR04
* flama
* LDR

Prioridad:

# ALTA

---

## 🌡️ Tarea 3 — DHT11

Frecuencia:

```text
2 segundos
```

Prioridad:

# MEDIA

---

## 📟 Tarea 4 — LCD

Frecuencia:

```text
1 segundo
```

Prioridad:

# MEDIA

---

## ⚙️ Tarea 5 — Servo

Frecuencia:

```text
según eventos
```

Prioridad:

# ALTA

---

## 🌐 Tarea 6 — Serial / backend

Frecuencia:

```text
500 ms – 1 s
```

Prioridad:

# BAJA

---

# ✅ PRIORIDADES DEL SISTEMA

| Prioridad | Subsistema       |
| --------- | ---------------- |
| CRÍTICA   | alertas          |
| ALTA      | servo            |
| ALTA      | sensores rápidos |
| MEDIA     | LCD              |
| MEDIA     | DHT11            |
| BAJA      | serial/web       |

---

# 🔌 DISTRIBUCIÓN FINAL DE PINES

## 📟 LCD I2C

| Función | Pin |
| ------- | --- |
| SDA     | A4  |
| SCL     | A5  |

---

## 🌡️ DHT11

| Función | Pin |
| ------- | --- |
| DATA    | D2  |

---

## 📏 HC-SR04

| Función | Pin |
| ------- | --- |
| TRIG    | D3  |
| ECHO    | D4  |

---

## 🔥 KY-026

| Función | Pin |
| ------- | --- |
| DO      | D5  |

---

## ⚙️ Servo MONT-100

| Función | Pin |
| ------- | --- |
| PWM     | D6  |

---

## 🔊 Buzzer

| Función | Pin |
| ------- | --- |
| SIGNAL  | D7  |

---

## 🟢 LED Verde

| Función | Pin |
| ------- | --- |
| +       | D8  |

---

## 🔴 LED Rojo

| Función | Pin |
| ------- | --- |
| +       | D9  |

---

## 🌞 LDR analógico

| Función | Pin |
| ------- | --- |
| AO      | A0  |

---

# ✅ VENTAJAS DE ESTA DISTRIBUCIÓN

✔ sin conflictos
✔ I2C separado
✔ digitales organizados
✔ PWM dedicado para servo
✔ entrada analógica limpia
✔ compatible con Serial USB
✔ arquitectura escalable

---

# 🔌 PRINCIPIO DE DISTRIBUCIÓN ELÉCTRICA

La protoboard funciona como:

# centro de distribución eléctrica

NO como zona aleatoria de conexiones.

---

# ✅ Distribución energética

| Barra | Función |
| ----- | ------- |
| Roja  | +5V     |
| Azul  | GND     |

---

# ✅ Alimentación principal

| Arduino | Protoboard |
| ------- | ---------- |
| 5V      | barra roja |
| GND     | barra azul |

---

# ✅ Importante

Las barras superior e inferior fueron:

# puenteadas correctamente

permitiendo distribución uniforme de energía.

---

# 📦 DISTRIBUCIÓN FÍSICA DEL PROTOTIPO

---

## Centro

* Arduino Uno
* protoboard

---

## Frontal

* LCD
* LEDs

---

## Laterales

* buzzer
* servo

---

## Zona frontal

* HC-SR04 apuntando al perímetro

---

## Parte superior

* DHT11
* LDR

---

## Zona crítica

* sensor de flama

---

# 🏭 IDEA GENERAL DE MAQUETA

El sistema representa:

# una mini estación industrial inteligente

con:

| Zona               | Simulación |
| ------------------ | ---------- |
| perímetro          | HC-SR04    |
| estación ambiental | DHT11      |
| zona crítica       | flama      |
| iluminación        | LDR        |
| ventilación        | servo      |

---

# 🔥 EVENTOS DEMOSTRABLES

## Incendio

* encendedor
* fuente de calor
* luz intensa

---

## Intrusión

* acercar mano al HC-SR04

---

## Temperatura alta

* aire caliente
* mano
* secadora

---

## Iluminación

* tapar LDR
* iluminar con flash

---

## Ventilación automática

* activación del servo ante alertas

---

# ✅ SIGUIENTE ETAPA

# ETAPA 5 — Firmware modular profesional

Implementar:

* `millis()`
* scheduler básico
* tareas cooperativas
* firmware limpio y modular
* separación lógica por funciones
* arquitectura escalable para backend y frontend


