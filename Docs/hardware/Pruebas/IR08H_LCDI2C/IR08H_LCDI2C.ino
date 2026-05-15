#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define IR_PIN 6

LiquidCrystal_I2C lcd(0x27, 16, 2);

int estadoIR = 0;

void setup() {
    pinMode(IR_PIN, INPUT);

    Serial.begin(9600);

    lcd.init();
    lcd.backlight();

    lcd.setCursor(0, 0);
    lcd.print("Sensor IR");
    
    delay(2000);
    lcd.clear();
}

void loop() {

    estadoIR = digitalRead(IR_PIN);

    Serial.print("IR: ");
    Serial.println(estadoIR);

    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("IR Sensor:");

    lcd.setCursor(0, 1);

    // Ajustaremos esto segun la prueba fisica
    if (estadoIR == HIGH) {
        lcd.print("OBJETO");
    } else {
        lcd.print("SIN OBJETO");
    }

    delay(300);
}