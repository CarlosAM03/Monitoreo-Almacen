#include "leds.h"

#include <Arduino.h>

#include "pins.h"


void leds_init() {

    pinMode(GREEN_LED_PIN, OUTPUT);

    pinMode(RED_LED_PIN, OUTPUT);

}

void led_green_set(bool state) {

    digitalWrite(
        GREEN_LED_PIN,
        state
    );
}

void led_red_set(bool state) {

    digitalWrite(
        RED_LED_PIN,
        state
    );
}

void red_led_on() {

    led_red_set(true);

}


void red_led_off() {

    led_red_set(false);

}