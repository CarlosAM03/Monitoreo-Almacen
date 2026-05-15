#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>

//
// LCD
//
LiquidCrystal_I2C lcd(0x27, 16, 2);

//
// DHT11
//
#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

//
// HC-SR04
//
#define TRIG_PIN 3
#define ECHO_PIN 4

//
// FLAMA
//
#define FLAME_PIN 5

//
// Variables
//
float temperatura = 0;
float humedad = 0;

long duracion = 0;
int distancia = 0;

int flama = 0;

void setup() {

  Serial.begin(9600);

  //
  // LCD
  //
  lcd.init();
  lcd.backlight();

  //
  // DHT
  //
  dht.begin();

  //
  // HC-SR04
  //
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  //
  // Flama
  //
  pinMode(FLAME_PIN, INPUT);

  //
  // Mensaje inicial
  //
  lcd.setCursor(0, 0);
  lcd.print("Sistema Init");

  lcd.setCursor(0, 1);
  lcd.print("Monitoreo");

  delay(2000);

  lcd.clear();
}

void loop() {

  //
  // ===== DHT11 =====
  //
  temperatura = dht.readTemperature();
  humedad = dht.readHumidity();

  //
  // ===== HC-SR04 =====
  //
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);

  digitalWrite(TRIG_PIN, LOW);

  duracion = pulseIn(ECHO_PIN, HIGH, 30000);

  distancia = duracion * 0.034 / 2;

  //
  // ===== FLAMA =====
  //
  flama = digitalRead(FLAME_PIN);

  //
  // ===== SERIAL =====
  //
  Serial.print("TEMP: ");
  Serial.print(temperatura);
  Serial.print(" C  ");

  Serial.print("HUM: ");
  Serial.print(humedad);
  Serial.print(" %  ");

  Serial.print("DIST: ");
  Serial.print(distancia);
  Serial.print(" cm  ");

  Serial.print("FLAME: ");

  if (flama == 0) {
    Serial.println("DETECTADA");
  } else {
    Serial.println("NO");
  }

  //
  // ===== LCD PANTALLA 1 =====
  //
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temperatura);
  lcd.print("C");

  lcd.setCursor(9, 0);
  lcd.print("H:");
  lcd.print(humedad);
  lcd.print("%");

  delay(2000);

  //
  // ===== LCD PANTALLA 2 =====
  //
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("DIST:");
  lcd.print(distancia);
  lcd.print("cm");

  lcd.setCursor(0, 1);

  if (flama != 0) {
    lcd.print("FLAME: SI");
  } else {
    lcd.print("FLAME: NO");
  }

  delay(2000);
}