#include "alert_service.h"

#include "system_state.h"

#include "thresholds.h"


void alert_service_update() {

    // =====================================================
    // INTRUSIÓN
    // =====================================================

    systemState.alerts.intrusion =
        (
            systemState.sensors.distance > 0 &&
            systemState.sensors.distance <=
            DISTANCE_ALERT_THRESHOLD
        );


    // =====================================================
    // FLAMA / INCENDIO
    // =====================================================

    systemState.alerts.fire =
        systemState.sensors.flameDetected;


    // =====================================================
    // TEMPERATURA ALTA
    // =====================================================

    systemState.alerts.highTemperature =
        (
            systemState.sensors.temperature >=
            TEMP_ALERT_THRESHOLD
        );


    // =====================================================
    // HUMEDAD ALTA
    // =====================================================

    systemState.alerts.highHumidity =
        (
            systemState.sensors.humidity >=
            HUMIDITY_ALERT_THRESHOLD
        );


    // =====================================================
    // BAJA ILUMINACIÓN
    // =====================================================

    systemState.alerts.lowLight =
        (
            systemState.sensors.lightLevel <=
            LIGHT_LOW_THRESHOLD
        );


    // =====================================================
    // ALERTA GLOBAL CONSOLIDADA
    // =====================================================

    systemState.alerts.anyAlert =
        (
            systemState.alerts.fire ||
            systemState.alerts.intrusion ||
            systemState.alerts.highTemperature ||
            systemState.alerts.highHumidity ||
            systemState.alerts.lowLight
        );
}