#include "display_service.h"

#include "system_state.h"

#include "constants.h"


void display_service_update() {

    // =====================================================
    // PRIORIDAD 1
    // INCENDIO
    // =====================================================

    if (systemState.alerts.fire) {

        systemState.display.currentScreen =
            SCREEN_FIRE;

        systemState.display.priorityAlert =
            true;

        return;
    }


    // =====================================================
    // PRIORIDAD 2
    // TEMPERATURA / HUMEDAD
    // =====================================================

    if (
        systemState.alerts.highTemperature ||
        systemState.alerts.highHumidity
    ) {

        systemState.display.currentScreen =
            SCREEN_HIGH_TEMP;

        systemState.display.priorityAlert =
            true;

        return;
    }


    // =====================================================
    // PRIORIDAD 3
    // INTRUSIÓN
    // =====================================================

    if (systemState.alerts.intrusion) {

        systemState.display.currentScreen =
            SCREEN_INTRUSION;

        systemState.display.priorityAlert =
            true;

        return;
    }


    // =====================================================
    // PRIORIDAD 4
    // BAJA ILUMINACIÓN
    // =====================================================

    if (systemState.alerts.lowLight) {

        systemState.display.currentScreen =
            SCREEN_LOW_LIGHT;

        systemState.display.priorityAlert =
            true;

        return;
    }


    // =====================================================
    // ESTADO NORMAL
    // =====================================================

    systemState.display.currentScreen =
        SCREEN_NORMAL;

    systemState.display.priorityAlert =
        false;
}