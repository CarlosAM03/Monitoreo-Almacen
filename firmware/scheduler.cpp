#include <Arduino.h>

#include "scheduler.h"

#include "tasks.h"


// ======================================================
// TIMERS
// ======================================================

unsigned long lastFastSensors = 0;

unsigned long lastDht = 0;

unsigned long lastAlerts = 0;

unsigned long lastAutomation = 0;

unsigned long lastActuators = 0;

unsigned long lastLcd = 0;

unsigned long lastSerial = 0;

// ======================================================
// INIT
// ======================================================

void scheduler_init() {

    tasks_init();
}


// ======================================================
// SCHEDULER PRINCIPAL
// ======================================================

void scheduler_run() {

    unsigned long currentMillis = millis();


    // ==========================================
    // FAST SENSORS
    // ==========================================

    if (currentMillis - lastFastSensors >= 200) {

        lastFastSensors = currentMillis;

        task_fastSensors();
    }


    // ==========================================
    // DHT11
    // ==========================================

    if (currentMillis - lastDht >= 2000) {

        lastDht = currentMillis;

        task_dht();
    }


    // ==========================================
    // ALERTAS
    // ==========================================

    if (currentMillis - lastAlerts >= 100) {

        lastAlerts = currentMillis;

        task_alerts();
    }


    // ==========================================
    // AUTOMATIZACIÓN
    // ==========================================

    if (currentMillis - lastAutomation >= 100) {

        lastAutomation = currentMillis;

        task_automation();
    }


    // ==========================================
    // ACTUADORES
    // ==========================================

    if (currentMillis - lastActuators >= 100) {

        lastActuators = currentMillis;

        task_actuators();
    }


    // ==========================================
    // LCD
    // ==========================================

    if (currentMillis - lastLcd >= 1000) {

        lastLcd = currentMillis;

        task_lcd();
    }

    // ==========================================
    // SERIAL
    // ==========================================
    if (currentMillis - lastSerial >= 1000) {

        lastSerial = currentMillis;

        task_serial();
    }

}