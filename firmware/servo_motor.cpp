#include "servo_motor.h"

#include <Arduino.h>
#include <Servo.h>

#include "pins.h"


static Servo servoMotor;


void servo_motor_init() {

    servoMotor.attach(SERVO_PIN);

}


void servo_motor_setAngle(int angle) {

    servoMotor.write(angle);

}