#include "automation_service.h"

#include "system_state.h"

#include "constants.h"


void automation_service_update() {

    // =====================================================
    // ALERTA GLOBAL
    // =====================================================

    bool alertActive =
        systemState.alerts.anyAlert;


    // =====================================================
    // LEDS
    // =====================================================

    systemState.actuators.greenLed =
        !alertActive;

    systemState.actuators.redLed =
        alertActive;


    // =====================================================
    // BUZZER
    // =====================================================

    systemState.actuators.buzzer =
        alertActive;


    // =====================================================
    // SERVO
    // PRIORIDAD:
    //
    // FUEGO
    // ↓
    // HUMEDAD
    // ↓
    // TEMPERATURA
    // ↓
    // NORMAL
    // =====================================================

    if (systemState.alerts.fire) {

        systemState.actuators.servoAngle =
            SERVO_FIRE_ANGLE;
    }

    else if (systemState.alerts.highHumidity) {

        systemState.actuators.servoAngle =
            SERVO_VENT_ANGLE;
    }

    else if (systemState.alerts.highTemperature) {

        systemState.actuators.servoAngle =
            SERVO_PARTIAL_ANGLE;
    }

    else {

        systemState.actuators.servoAngle =
            SERVO_CLOSED_ANGLE;
    }
}