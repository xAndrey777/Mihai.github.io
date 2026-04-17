// Navegación
function changeView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('view-active'));
    document.getElementById('view-' + viewId).classList.add('view-active');
    
    if (viewId === 'game') initSnakeGame();
    else if (typeof stopSnakeGame === "function") stopSnakeGame();
}

// Menú 3 puntos
document.getElementById('dots-btn').onclick = (e) => {
    e.stopPropagation();
    document.getElementById('dropdown-menu').classList.toggle('menu-hidden');
};

// Lógica de Terminal básica
const termInput = document.getElementById('term-input');
termInput.onkeydown = (e) => {
    if (e.key === 'Enter') {
        const val = termInput.value.toLowerCase();
        // Aquí irían tus comandos (help, bio, etc.)
        console.log("Comando ejecutado: " + val);
        termInput.value = '';
    }
};
