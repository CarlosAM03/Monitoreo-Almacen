#include "ldr_sensor.h"

#include <Arduino.h>

#include "pins.h"


void ldr_sensor_init() {

    pinMode(LDR_SENSOR_PIN, INPUT);

}


int ldr_read() {

    return analogRead(LDR_SENSOR_PIN);

}