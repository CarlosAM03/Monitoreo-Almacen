#include "dht_sensor.h"

#include <DHT.h>

#include "pins.h"


#define DHT_TYPE DHT11


DHT dht(DHT_PIN, DHT_TYPE);


void dht_init() {

    dht.begin();

}


float dht_readTemperature() {

    return dht.readTemperature();

}


float dht_readHumidity() {

    return dht.readHumidity();

}