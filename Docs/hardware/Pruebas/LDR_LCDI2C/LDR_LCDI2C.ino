#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define LDR_PIN A0

LiquidCrystal_I2C lcd(0x27, 16, 2);

int valorLDR = 0;

void setup() {

    Serial.begin(9600);

    lcd.init();
    lcd.backlight();

    lcd.setCursor(0, 0);
    lcd.print("Sensor LDR");

    delay(2000);
    lcd.clear();
}

void loop() {

    valorLDR = analogRead(LDR_PIN);

    Serial.print("LDR: ");
    Serial.println(valorLDR);

    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("Luz:");

    lcd.setCursor(0, 1);
    lcd.print(valorLDR);

    delay(300);
}