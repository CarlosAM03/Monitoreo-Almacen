#ifndef CONSTANTS_H
#define CONSTANTS_H

// =========================
// SERIAL
// =========================

#define SERIAL_BAUD_RATE 9600


// =========================
// LCD
// =========================

#define LCD_COLUMNS 16
#define LCD_ROWS    2


// =====================================================
// IDs DE PANTALLAS LCD
// =====================================================

// Pantalla normal
#define SCREEN_NORMAL          0

// Alertas
#define SCREEN_FIRE            10
#define SCREEN_INTRUSION       11
#define SCREEN_HIGH_TEMP       12
#define SCREEN_HIGH_HUMIDITY   13
#define SCREEN_LOW_LIGHT       14


// =====================================================
// SERVO
// =====================================================

// Posición cerrada
#define SERVO_CLOSED_ANGLE   0

// Apertura parcial por temperatura
#define SERVO_PARTIAL_ANGLE  45

// Ventilación por humedad
#define SERVO_VENT_ANGLE     60

// Apertura total por incendio
#define SERVO_FIRE_ANGLE     90


#endif