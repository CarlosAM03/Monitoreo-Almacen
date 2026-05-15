#include "constants.h"

#include "scheduler.h"


void setup() {

    Serial.begin(SERIAL_BAUD_RATE);

    scheduler_init();
}


void loop() {

    scheduler_run();
}