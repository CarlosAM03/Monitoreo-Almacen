// ================================
// PRUEBA LEDs
// Sistema de Monitoreo Industrial
// ================================

// ---------- Pines ----------
const int PIN_LED_VERDE = 8;
const int PIN_LED_ROJO  = 9;

// ---------- Tiempos ----------
const unsigned long TIEMPO_CAMBIO_MS = 3000;

// ---------- Variables ----------
bool estadoVerde = true;

void setup() {

  pinMode(PIN_LED_VERDE, OUTPUT);
  pinMode(PIN_LED_ROJO, OUTPUT);

}

void loop() {

  if (estadoVerde) {

    digitalWrite(PIN_LED_VERDE, HIGH);
    digitalWrite(PIN_LED_ROJO, LOW);

  } else {

    digitalWrite(PIN_LED_VERDE, LOW);
    digitalWrite(PIN_LED_ROJO, HIGH);

  }

  estadoVerde = !estadoVerde;

  delay(TIEMPO_CAMBIO_MS);
}