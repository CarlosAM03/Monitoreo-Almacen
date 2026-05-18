// ======================================
// PRUEBA LEDs + BUZZER
// Sistema de Monitoreo Industrial
// ======================================

// ---------- Pines ----------
const int PIN_LED_VERDE = 8;
const int PIN_LED_ROJO  = 9;
const int PIN_BUZZER    = 7;

// ---------- Tiempos ----------
const unsigned long TIEMPO_ESTADO_MS = 3000;
const unsigned long TIEMPO_ALERTA_MS = 500;

void setup() {

  pinMode(PIN_LED_VERDE, OUTPUT);
  pinMode(PIN_LED_ROJO, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);

}

void loop() {

  // =========================
  // ESTADO NORMAL
  // =========================

  digitalWrite(PIN_LED_VERDE, HIGH);
  digitalWrite(PIN_LED_ROJO, LOW);
  digitalWrite(PIN_BUZZER, LOW);

  delay(TIEMPO_ESTADO_MS);

  // =========================
  // ESTADO ALERTA
  // =========================

  digitalWrite(PIN_LED_VERDE, LOW);
  digitalWrite(PIN_LED_ROJO, HIGH);

  digitalWrite(PIN_BUZZER, HIGH);
  delay(TIEMPO_ALERTA_MS);
  digitalWrite(PIN_BUZZER, LOW);

  delay(TIEMPO_ESTADO_MS - TIEMPO_ALERTA_MS);
}