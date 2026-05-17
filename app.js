// Animación suave de aparición (Fade-in)
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});
// Consumir API de Java (Estadísticas)
async function fetchJavaStats() {
    try {
        const response = await fetch('http://localhost:8080/api/stats');
        const data = await response.json();
        console.log("Datos desde Java:", data);
        // Aquí puedes inyectar los datos dinámicamente en el DOM si lo deseas
    } catch (error) {
        console.log("Servidor Java offline (esperado en local sin ejecutar el .jar)");
    }
}

// Enviar formulario a Python
async function sendContact(name, email, message) {
    try {
        const response = await fetch('http://localhost:8000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        return await response.json();
    } catch (error) {
        console.error("Error al conectar con la API de Python:", error);
    }
}

// Inicializar cargas
document.addEventListener("DOMContentLoaded", () => {
    fetchJavaStats();
});
