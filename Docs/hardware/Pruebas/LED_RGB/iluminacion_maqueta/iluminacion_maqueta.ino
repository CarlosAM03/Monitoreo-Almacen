const int pinBoton = 2; // Pin donde conectaste el botón (S)
const int pinLuces = 3; // Pin donde uniste las patas R, G, B del LED

bool estadoLuces = false; // Guarda si las luces deben estar ON u OFF
int estadoBotonAnterior = HIGH; // El botón en reposo entrega HIGH por el PULLUP

void setup() {
  pinMode(pinLuces, OUTPUT); // Usamos INPUT_PULLUP para activar la resistencia interna del Arduino  

  pinMode(pinBoton, INPUT_PULLUP);

  digitalWrite(pinLuces, LOW); // Iniciamos con la maqueta apagada
  
  }

void loop() {

  int lecturaBoton = digitalRead(pinBoton); //Si el botón pasa de NO presionado (HIGH) a PRESIONADO (LOW)  

  if (lecturaBoton == LOW && estadoBotonAnterior == HIGH) {
    
    estadoLuces = !estadoLuces; // Cambia el estado (si estaba OFF pasa a ON)
    
    if (estadoLuces) {

      digitalWrite(pinLuces, HIGH); // Enciende la luz blanca    
    } 
    else 
    {
      digitalWrite(pinLuces, LOW); // Apaga la luz    
    }

      delay(200); // Pausa corta para evitar lecturas falsas por el rebote mecánico  
    
    }
  estadoBotonAnterior = lecturaBoton; // Guarda el estado para la siguiente revisión

}