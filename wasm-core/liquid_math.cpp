#include <emscripten/emscripten.h>
#include <cmath>

extern "C" {

    // EMSCRIPTEN_KEEPALIVE fuerza al compilador a no borrar la función aunque no se use en C++
    EMSCRIPTEN_KEEPALIVE
    float calculate_wave_offset(float time, float x, float y, int frequency) {
        // Algoritmo matemático para simular la oscilación de un fluido dinámico
        float wave1 = sin(time + x * 0.05f) * cos(time + y * 0.03f);
        float wave2 = cos(time * 1.5f + (x + y) * 0.02f) * 0.5f;
        
        return (wave1 + wave2) * frequency;
    }
}
