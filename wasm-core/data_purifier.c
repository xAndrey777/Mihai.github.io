#include <stdio.h>
#include <string.h>

// Filtra caracteres especiales de riesgo de un buffer de texto
void purify_input(char* source, char* destination) {
    int j = 0;
    for (int i = 0; source[i] != '\0'; i++) {
        // Eliminar selectivamente caracteres sospechosos (<, >, &, ")
        if (source[i] != '<' && source[i] != '>' && source[i] != '&' && source[i] != '"') {
            destination[j++] = source[i];
        }
    }
    destination[j] = '\0'; // Cierre del string
}

int main() {
    // Test rápido de funcionamiento en consola Linux
    char dirty[] = "Hello <script>malicious</script> World!";
    char clean[100];
    purify_input(dirty, clean);
    printf("[C Core] Input Purificado: %s\n", clean);
    return 0;
}
