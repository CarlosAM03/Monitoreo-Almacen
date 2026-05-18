#include "flame_sensor.h"

#include <Arduino.h>

#include "pins.h"


void flame_sensor_init() {

    pinMode(FLAME_SENSOR_PIN, INPUT);

}


bool flame_detected() {

    int value = digitalRead(FLAME_SENSOR_PIN);

    return (value != 0);

}