#include "tasks.h"

#include "system_state.h"
#include "constants.h"

#include "dht_sensor.h"
#include "ultrasonic_sensor.h"
#include "flame_sensor.h"
#include "ldr_sensor.h"

#include "servo_motor.h"
#include "leds.h"
#include "buzzer.h"
#include "lcd_display.h"

#include "alert_service.h"
#include "automation_service.h"
#include "display_service.h"
#include "environment_service.h"
#include "serial_protocol.h"

// ======================================================
// INICIALIZACIÓN GENERAL
// ======================================================

void tasks_init() {

    // Sensores
    dht_init();

    ultrasonic_sensor_init();

    flame_sensor_init();

    ldr_sensor_init();

    // Actuadores
    servo_motor_init();

    leds_init();

    buzzer_init();

    lcd_display_init();
}


// ======================================================
// SENSORES RÁPIDOS
// ======================================================

void task_fastSensors() {

    systemState.sensors.distance =
        ultrasonic_readDistance();

    systemState.sensors.flameDetected =
        flame_detected();

    systemState.sensors.lightLevel =
        ldr_read();
}


// ======================================================
// DHT11
// ======================================================

void task_dht() {

    systemState.sensors.temperature =
        dht_readTemperature();

    systemState.sensors.humidity =
        dht_readHumidity();
}


// ======================================================
// ALERTAS
// ======================================================

void task_alerts() {

    alert_service_update();

    environment_service_update();
}


// ======================================================
// AUTOMATIZACIÓN
// ======================================================

void task_automation() {

    automation_service_update();

    display_service_update();
}


// ======================================================
// ACTUADORES
// ======================================================

void task_actuators() {

    // LEDs
    led_green_set(
        systemState.actuators.greenLed
    );

    led_red_set(
        systemState.actuators.redLed
    );

    // Buzzer
    buzzer_set(
        systemState.actuators.buzzer
    );

    // Servo
    servo_motor_setAngle(
        systemState.actuators.servoAngle
    );
}


// ======================================================
// LCD
// ======================================================

void task_lcd() {

    lcd_display_clear();

    switch (systemState.display.currentScreen) {

        // ==================================================
        // PANTALLA NORMAL CONSOLIDADA
        //
        // T:24 H:58
        // D:120 L:650
        // ==================================================

        case SCREEN_NORMAL: {

            String line1 =
                "T:" +
                String((int)systemState.sensors.temperature) +
                " H:" +
                String((int)systemState.sensors.humidity);

            String line2 =
                "D:" +
                String(systemState.sensors.distance) +
                " L:" +
                String(systemState.sensors.lightLevel);

            lcd_display_print(
                0,
                0,
                line1.c_str()
            );

            lcd_display_print(
                0,
                1,
                line2.c_str()
            );

            break;
        }


        // ==================================================
        // ALERTA DE INCENDIO
        // ==================================================

        case SCREEN_FIRE:

            lcd_display_print(
                0,
                0,
                "!!! ALERTA !!!"
            );

            lcd_display_print(
                0,
                1,
                "FUEGO DETECT"
            );

            break;


        // ==================================================
        // ALERTA DE INTRUSION
        // ==================================================

        case SCREEN_INTRUSION:

            lcd_display_print(
                0,
                0,
                "!!! ALERTA !!!"
            );

            lcd_display_print(
                0,
                1,
                "INTRUSION"
            );

            break;


        // ==================================================
        // ALERTA DE TEMPERATURA
        // ==================================================

        case SCREEN_HIGH_TEMP:

            lcd_display_print(
                0,
                0,
                "T o H ELEVADAS"
            );

            lcd_display_print(
                0,
                1,
                "REVISION"
            );

            break;


        // ==================================================
        // ALERTA DE HUMEDAD
        // ==================================================

        case SCREEN_HIGH_HUMIDITY:

            lcd_display_print(
                0,
                0,
                "HUMEDAD ALTA"
            );

            lcd_display_print(
                0,
                1,
                "VENTILACION"
            );

            break;


        // ==================================================
        // ALERTA DE BAJA LUZ
        // ==================================================

        case SCREEN_LOW_LIGHT:

            lcd_display_print(
                0,
                0,
                "BAJA LUZ"
            );

            lcd_display_print(
                0,
                1,
                "REVISION"
            );

            break;
    }
}
// ======================================
// Protocolo de comunicación serial
// ======================================

void task_serial() {

    serial_protocol_send();
}