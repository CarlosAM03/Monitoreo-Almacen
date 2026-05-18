#include <Wire.h>
#include <LiquidCrystal_I2C.h>

//
// LCD
//
LiquidCrystal_I2C lcd(0x27, 16, 2);

//
// FLAMA
//
#define FLAME_PIN 5

//
// Variable
//
int flama = 0;

void setup() {

  Serial.begin(9600);

  //
  // LCD
  //
  lcd.init();
  lcd.backlight();

  //
  // Flama
  //
  pinMode(FLAME_PIN, INPUT);

  //
  // Mensaje inicial
  //
  lcd.setCursor(0, 0);
  lcd.print("Prueba Flama");

  delay(2000);

  lcd.clear();
}

void loop() {

  //
  // Lectura
  //
  flama = digitalRead(FLAME_PIN);

  //
  // SERIAL
  //
  Serial.print("FLAMA: ");

  if (flama != 0) {

    Serial.println("DETECTADA");

  } else {

    Serial.println("NO");
  }

  //
  // LCD
  //
  lcd.clear();

  if (flama != 0) {

    lcd.setCursor(0, 0);
    lcd.print("!! ALERTA !!");

    lcd.setCursor(0, 1);
    lcd.print("FLAMA DETECT");

  } else {

    lcd.setCursor(0, 0);
    lcd.print("Estado Normal");

    lcd.setCursor(0, 1);
    lcd.print("Sin flama");
  }

  delay(500);
}