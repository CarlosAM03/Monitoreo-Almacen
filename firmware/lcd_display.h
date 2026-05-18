#ifndef LCD_DISPLAY_H
#define LCD_DISPLAY_H

void lcd_display_init();

void lcd_display_clear();

void lcd_display_print(
    int column,
    int row,
    const char* text
);

#endif