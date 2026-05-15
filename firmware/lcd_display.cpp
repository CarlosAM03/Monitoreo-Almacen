#include "lcd_display.h"

#include <Arduino.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#include "constants.h"


LiquidCrystal_I2C lcd(0x27, LCD_COLUMNS, LCD_ROWS);


void lcd_display_init() {

    lcd.init();

    lcd.backlight();

}


void lcd_display_clear() {

    lcd.clear();

}


void lcd_display_print(
    int column,
    int row,
    const char* text
) {

    lcd.setCursor(column, row);

    lcd.print(text);

}