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
// Variables
//
float temperatura = 0;
float humedad = 0;

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
  // Mensaje inicial
  //
  lcd.setCursor(0, 0);
  lcd.print("Prueba DHT11");

  delay(2000);

  lcd.clear();
}

void loop() {

  //
  // Lecturas
  //
  temperatura = dht.readTemperature();
  humedad = dht.readHumidity();

  //
  // SERIAL
  //
  Serial.print("TEMP: ");
  Serial.print(temperatura);
  Serial.print(" C  ");

  Serial.print("HUM: ");
  Serial.print(humedad);
  Serial.println(" %");

  //
  // LCD
  //
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Temp:");
  lcd.print(temperatura);
  lcd.print("C");

  lcd.setCursor(0, 1);
  lcd.print("Hum:");
  lcd.print(humedad);
  lcd.print("%");

  delay(2000);
}