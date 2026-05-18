#include <Wire.h>
#include <LiquidCrystal_I2C.h>

//
// LCD
//
LiquidCrystal_I2C lcd(0x27, 16, 2);

//
// HC-SR04
//
#define TRIG_PIN 3
#define ECHO_PIN 4

//
// Variables
//
long duracion = 0;
int distancia = 0;

void setup() {

  Serial.begin(9600);

  //
  // LCD
  //
  lcd.init();
  lcd.backlight();

  //
  // HC-SR04
  //
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  //
  // Mensaje inicial
  //
  lcd.setCursor(0, 0);
  lcd.print("Prueba HC-SR04");

  delay(2000);

  lcd.clear();
}

void loop() {

  //
  // Pulso trigger
  //
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);

  digitalWrite(TRIG_PIN, LOW);

  //
  // Lectura echo
  //
  duracion = pulseIn(ECHO_PIN, HIGH, 30000);

  //
  // Distancia
  //
  distancia = duracion * 0.034 / 2;

  //
  // SERIAL
  //
  Serial.print("DISTANCIA: ");
  Serial.print(distancia);
  Serial.println(" cm");

  //
  // LCD
  //
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Distancia:");

  lcd.setCursor(0, 1);
  lcd.print(distancia);
  lcd.print(" cm");

  delay(500);
}