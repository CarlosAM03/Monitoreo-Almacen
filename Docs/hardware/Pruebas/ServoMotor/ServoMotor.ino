#include <Servo.h>

Servo ventanaServo;

void setup() {

    ventanaServo.attach(6);

}

void loop() {

    // Cerrado
    ventanaServo.write(0);
    delay(2000);

    // Abierto
    ventanaServo.write(90);
    delay(2000);
}