Ya revisé completamente:

* la documentación arquitectónica
* el estado operativo real
* el firmware completo
* el scheduler
* los servicios
* HAL
* el flujo de ejecución real

y ya se puede identificar exactamente qué está faltando para convertir el sistema en un firmware estable y listo para integrarse con backend.

La buena noticia:

# la arquitectura base está BIEN diseñada

No necesitas rediseñar el proyecto.

El problema actual es exclusivamente:

```text
falta consolidación centralizada del estado del sistema
```

y eso provoca:

* LCD inconsistente
* prioridades rotas
* alertas parciales
* buzzer no persistente
* servo incompleto
* comportamiento no determinista

---

# DIAGNÓSTICO REAL DEL FIRMWARE

Actualmente tu pipeline real es:

```text
Sensores
↓
systemState.sensors
↓
alert_service
↓
systemState.alerts
↓
automation_service
↓
systemState.actuators
↓
task_actuators
↓
hardware físico
```

ESO ES CORRECTO.

El problema aparece en:

```text
display_service
task_lcd
AlertState
```

porque:

* hay pantallas mezcladas
* IDs inconsistentes
* faltan alertas globales
* no existe política centralizada
* no existe máquina de prioridades real

---

# PROBLEMAS EXACTOS ENCONTRADOS

---

# 1️⃣ display_service y task_lcd NO coinciden

## ERROR CRÍTICO

En `display_service.cpp`:

```cpp
fire -> currentScreen = 1
intrusion -> currentScreen = 2
highTemperature -> currentScreen = 3
```

PERO en `task_lcd()`:

```cpp
1 = distancia
2 = iluminación
10 = fuego
11 = intrusion
12 = temperatura
```

Entonces:

# el display_service está apuntando a pantallas equivocadas

Por eso:

* fuego muestra distancia
* intrusión muestra LDR
* prioridades parecen rotas

---

# 2️⃣ lowLight NO participa realmente

La alerta existe:

```cpp
systemState.alerts.lowLight
```

pero:

* no entra en `alertActive`
* no activa buzzer
* no activa LED rojo
* no tiene pantalla LCD
* no participa en prioridades

Entonces:

* la LDR “funciona”
* pero el sistema ignora la alerta

---

# 3️⃣ No existe anyAlert

Ahora mismo cada módulo evalúa cosas distintas.

Ejemplo:

automation_service:

```cpp
fire || intrusion || highTemperature
```

display_service:

```cpp
fire -> intrusion -> highTemperature
```

Eso rompe consistencia.

Necesitas:

```cpp
systemState.alerts.anyAlert
```

centralizado.

---

# 4️⃣ Falta highHumidity

Tu documentación sí la contempla.
El firmware NO.

Falta:

* flag
* umbral
* automatización
* LCD
* serial

---

# 5️⃣ El servo tiene lógica incompleta

Ahora:

```cpp
fire || highTemperature
```

→ abre totalmente.

Pero la arquitectura deseada define:

| Evento       | Acción         |
| ------------ | -------------- |
| normal       | cerrado        |
| temp alta    | parcial        |
| humedad alta | ventilación    |
| fuego        | apertura total |

Necesitas:

* múltiples ángulos
* política jerárquica

---

# 6️⃣ display_service NO es una máquina de estados

Ahora solo hace:

```cpp
if fire return;
if intrusion return;
if temp return;
```

Eso NO soporta:

* persistencia
* múltiples alertas
* rotación
* prioridades reales

---

# 7️⃣ task_lcd mezcla UI y lógica

Actualmente:

* construye pantallas
* conoce IDs mágicos
* depende de lógica externa

Está funcional, pero necesita estabilización.

---

# 8️⃣ environment_service está vacío

Y aquí debería vivir:

* correlación ambiental
* validaciones futuras
* confirmación de incendio
* reglas compuestas

No es urgente aún.

---

# 9️⃣ Serial YA ESTÁ BIEN

De hecho:

# tu serial_protocol está bastante bien diseñado

Ya exporta:

* sensores
* alertas

Eso ya es suficiente para backend.

Solo falta:

* agregar humidity alert
* agregar anyAlert

---

# ORDEN CORRECTO DE REFINAMIENTO

Este orden es MUY importante.

Si lo haces distinto:

* volverás a romper LCD
* volverás a romper automatización

---

# FASE 1 — CONSOLIDAR ALERTAS

# PRIMERA PRIORIDAD

---

## MODIFICAR

### `system_state.h`

Agregar:

```cpp
bool highHumidity;

bool anyAlert;
```

en:

```cpp
struct AlertState
```

---

# DESPUÉS

---

## MODIFICAR

### `alert_service.cpp`

Implementar:

```cpp
systemState.alerts.highHumidity =
(
    systemState.sensors.humidity >=
    HUMIDITY_ALERT_THRESHOLD
);
```

---

Luego:

```cpp
systemState.alerts.anyAlert =
(
    systemState.alerts.fire ||
    systemState.alerts.intrusion ||
    systemState.alerts.highTemperature ||
    systemState.alerts.highHumidity ||
    systemState.alerts.lowLight
);
```

---

# RESULTADO

Ahora TODO el sistema usará:

```cpp
systemState.alerts.anyAlert
```

y NO lógica duplicada.

---

# FASE 2 — REPARAR AUTOMATION SERVICE

# SEGUNDA PRIORIDAD

---

## MODIFICAR

### `constants.h`

Agregar:

```cpp
#define SERVO_PARTIAL_ANGLE 45
#define SERVO_VENT_ANGLE    60
#define SERVO_FIRE_ANGLE    90
```

---

# DESPUÉS

---

## REESCRIBIR

### `automation_service.cpp`

---

# LEDs

```cpp
greenLed = !anyAlert
redLed   = anyAlert
```

---

# buzzer

Debe depender de:

```cpp
anyAlert
```

NO de alertas individuales.

---

# servo

Implementar prioridad:

```text
FUEGO
↓
HUMEDAD
↓
TEMPERATURA
↓
NORMAL
```

---

## EJEMPLO

```cpp
if (fire)
    90°

else if (highHumidity)
    60°

else if (highTemperature)
    45°

else
    0°
```

---

# RESULTADO

Ya tendrás:

* buzzer persistente
* LEDs estables
* servo coherente

---

# FASE 3 — REPARAR DISPLAY SERVICE

# TERCERA PRIORIDAD

Aquí está el problema visual principal.

---

# PRIMERO

Definir IDs REALES.

---

## MODIFICAR

### `constants.h`

Agregar:

```cpp
#define SCREEN_NORMAL          0

#define SCREEN_FIRE            10
#define SCREEN_INTRUSION       11
#define SCREEN_HIGH_TEMP       12
#define SCREEN_HIGH_HUMIDITY   13
#define SCREEN_LOW_LIGHT       14
```

---

# DESPUÉS

---

## REESCRIBIR

### `display_service.cpp`

---

# PRIORIDADES CORRECTAS

```text
FIRE
↓
TEMP/HUM
↓
INTRUSION
↓
LOW LIGHT
↓
NORMAL
```

---

## IMPLEMENTACIÓN

```cpp
if (fire)
    SCREEN_FIRE

else if (highTemperature || highHumidity)
    SCREEN_HIGH_TEMP

else if (intrusion)
    SCREEN_INTRUSION

else if (lowLight)
    SCREEN_LOW_LIGHT

else
    SCREEN_NORMAL
```

---

# IMPORTANTE

Ahora:

* NO uses números mágicos
* SOLO constantes

---

# RESULTADO

El LCD dejará de mostrar pantallas incorrectas.

---

# FASE 4 — REPARAR task_lcd

# CUARTA PRIORIDAD

Actualmente:

* case 1 = distancia
* case 10 = fuego

Eso debe eliminarse.

---

# NUEVA ESTRUCTURA

---

## NORMAL

Debe mostrar:

```text
T:24 H:58
D:120 L:650
```

NO pantallas separadas.

---

# ELIMINAR

```cpp
case 1
case 2
```

porque:

* distancia
* luz

deben vivir dentro de la pantalla normal consolidada.

---

# DEJAR SOLO

```cpp
SCREEN_NORMAL
SCREEN_FIRE
SCREEN_INTRUSION
SCREEN_HIGH_TEMP
SCREEN_HIGH_HUMIDITY
SCREEN_LOW_LIGHT
```

---

# RESULTADO

Tu LCD quedará:

* coherente
* estable
* profesional

---

# FASE 5 — SERIAL FINAL

# QUINTA PRIORIDAD

Agregar:

```cpp
HIGH_HUM:
ANY_ALERT:
```

---

# RESULTADO

Backend listo.

---

# FASE 6 — ESTABILIZACIÓN FINAL

# SEXTA PRIORIDAD

Aquí sí:

* pruebas físicas
* tuning
* thresholds
* tiempos
* sensibilidad

---

# LO MÁS IMPORTANTE

NO modifiques:

* scheduler
* HAL
* sensores

porque:

# ya funcionan bien

El problema NO está ahí.

---

# ARQUITECTURA FINAL CORRECTA

Debe quedar así:

```text
Sensores
↓
systemState.sensors
↓
alert_service
↓
systemState.alerts
↓
automation_service
↓
systemState.actuators
↓
display_service
↓
systemState.display
↓
tasks_actuators
↓
hardware
```

---

# CONCLUSIÓN REAL

Tu firmware ya está:

# ~75–80% terminado

Lo que falta NO es infraestructura.

Falta:

* consolidación lógica
* política centralizada
* máquina de prioridades

Después de estas correcciones:

* el firmware quedará estable
* el hardware quedará terminado
* el backend podrá integrarse sin tocar el core embebido
* React/WebSocket serán relativamente sencillos

porque la parte difícil:

# el sistema embebido desacoplado

ya está lograda.
