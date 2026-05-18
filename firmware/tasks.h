#ifndef TASKS_H
#define TASKS_H

// ========================================
// INICIALIZACIÓN GENERAL
// ========================================

void tasks_init();
void task_serial();

// ========================================
// TAREAS PRINCIPALES
// ========================================

void task_fastSensors();

void task_dht();

void task_alerts();

void task_automation();

void task_actuators();

void task_lcd();

#endif