#ifndef LEDS_H
#define LEDS_H

void leds_init();

void led_green_set(bool state);
void led_red_set(bool state);

void red_led_on();
void red_led_off();

#endif