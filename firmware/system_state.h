#ifndef SYSTEM_STATE_H
#define SYSTEM_STATE_H

#include <Arduino.h>

// ======================================================
// DATOS DE SENSORES
// ======================================================

struct SensorData {

    float temperature;

    float humidity;

    int distance;

    bool flameDetected;

    int lightLevel;
};


// ======================================================
// ESTADO DE ALERTAS
// ======================================================

struct AlertState {

    // =========================
    // ALERTAS PRINCIPALES
    // =========================

    bool intrusion;

    bool fire;

    bool highTemperature;

    bool highHumidity;

    bool lowLight;


    // =========================
    // ALERTA GLOBAL
    // =========================

    bool anyAlert;
};


// ======================================================
// ESTADO DE ACTUADORES
// ======================================================

struct ActuatorState {

    bool greenLed;

    bool redLed;

    bool buzzer;

    int servoAngle;
};


// ======================================================
// ESTADO DEL DISPLAY
// ======================================================

struct DisplayState {

    uint8_t currentScreen;

    bool priorityAlert;
};


// ======================================================
// ESTADO GLOBAL DEL SISTEMA
// ======================================================

struct SystemState {

    SensorData sensors;

    AlertState alerts;

    ActuatorState actuators;

    DisplayState display;
};


// ======================================================
// VARIABLE GLOBAL COMPARTIDA
// ======================================================

extern SystemState systemState;

#endif