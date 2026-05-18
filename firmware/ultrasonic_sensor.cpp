#include "ultrasonic_sensor.h"

#include <Arduino.h>

#include "pins.h"


void ultrasonic_sensor_init() {

    pinMode(ULTRASONIC_TRIG_PIN, OUTPUT);

    pinMode(ULTRASONIC_ECHO_PIN, INPUT);

}


int ultrasonic_readDistance() {

    digitalWrite(ULTRASONIC_TRIG_PIN, LOW);
    delayMicroseconds(2);

    digitalWrite(ULTRASONIC_TRIG_PIN, HIGH);
    delayMicroseconds(10);

    digitalWrite(ULTRASONIC_TRIG_PIN, LOW);


    long duration = pulseIn(
        ULTRASONIC_ECHO_PIN,
        HIGH,
        30000
    );


    if (duration == 0) {

        return -1;

    }


    int distance = duration * 0.034 / 2;

    return distance;

}