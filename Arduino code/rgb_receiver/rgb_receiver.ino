#include <Adafruit_NeoPixel.h>

#define PIN 6

Adafruit_NeoPixel strip = Adafruit_NeoPixel( 1, PIN, NEO_GRB + NEO_KHZ800 );

void setup() {
  Serial.begin( 9600 );
  strip.begin();
  strip.show();
}

void loop() {
  if ( Serial.available() >= 6 ) {
    String data = Serial.readStringUntil( '\n' );
    int rPos = data.indexOf( "," );
    int gPos = data.indexOf( ",", rPos + 1 );

    // Skip if invalid data
    if ( rPos == -1 || gPos == -1 ) return;

    int r = data.substring( 0, rPos ).toInt();
    int g = data.substring( rPos + 1, gPos ).toInt();
    int b = data.substring( gPos + 1 ).toInt();

    for ( uint16_t i = 0; i < strip.numPixels(); i++ ) {
      strip.setPixelColor( i, r, g, b );
    }
    strip.show();
  }
}
