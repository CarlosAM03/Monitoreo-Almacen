// ================================
// PRUEBA BUZZER
// Sistema de Monitoreo Industrial
// ================================

// ---------- Pines ----------
const int PIN_BUZZER = 7;

// ---------- Tiempos ----------
const unsigned long TIEMPO_PULSO_MS = 150;
const unsigned long TIEMPO_PAUSA_MS = 150;

void setup() {

  pinMode(PIN_BUZZER, OUTPUT);

}

void loop() {

  for (int i = 0; i < 3; i++) {

    digitalWrite(PIN_BUZZER, HIGH);
    delay(TIEMPO_PULSO_MS);

    digitalWrite(PIN_BUZZER, LOW);
    delay(TIEMPO_PAUSA_MS);
  }

  delay(2000);
}