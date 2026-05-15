#include "buzzer.h"

#include <Arduino.h>

#include "pins.h"


void buzzer_init() {

    pinMode(BUZZER_PIN, OUTPUT);

    noTone(BUZZER_PIN);
}


// =====================================================
// BUZZER INTENSO Y CONTINUO
// =====================================================

void buzzer_set(bool state) {

    if (state) {

        // Frecuencia fuerte y aguda
        tone(BUZZER_PIN, 2000);

    } else {

        noTone(BUZZER_PIN);
    }
}