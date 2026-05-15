#include "serial_protocol.h"

#include "system_state.h"


void serial_protocol_send() {

    // =====================================================
    // SENSORES
    // =====================================================

    Serial.print("TEMP:");
    Serial.print(systemState.sensors.temperature);

    Serial.print(",");

    Serial.print("HUM:");
    Serial.print(systemState.sensors.humidity);

    Serial.print(",");

    Serial.print("DIST:");
    Serial.print(systemState.sensors.distance);

    Serial.print(",");

    Serial.print("FLAME:");
    Serial.print(systemState.sensors.flameDetected);

    Serial.print(",");

    Serial.print("LIGHT:");
    Serial.print(systemState.sensors.lightLevel);

    Serial.print(",");


    // =====================================================
    // ALERTAS
    // =====================================================

    Serial.print("FIRE:");
    Serial.print(systemState.alerts.fire);

    Serial.print(",");

    Serial.print("INTRUSION:");
    Serial.print(systemState.alerts.intrusion);

    Serial.print(",");

    Serial.print("TEMP_ALERT:");
    Serial.print(systemState.alerts.highTemperature);

    Serial.print(",");

    Serial.print("HIGH_HUM:");
    Serial.print(systemState.alerts.highHumidity);

    Serial.print(",");

    Serial.print("LOW_LIGHT:");
    Serial.print(systemState.alerts.lowLight);

    Serial.print(",");

    Serial.print("ANY_ALERT:");
    Serial.print(systemState.alerts.anyAlert);

    Serial.println();
}