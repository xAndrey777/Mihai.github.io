// Forzamos que las funciones sean globales
window.changeView = function(viewId) {
    console.log("Intentando entrar a:", viewId);
    
    // Ocultar todas las vistas
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('view-active');
    });
    
    // Mostrar la elegida
    const target = document.getElementById('view-' + viewId);
    if (target) {
        target.classList.add('view-active');
    }

    // Cerrar el menú siempre
    document.getElementById('dropdown-menu').classList.add('menu-hidden');

    // Lógica específica
    if (viewId === 'game') {
        if (window.initSnakeGame) window.initSnakeGame();
    } else {
        if (window.stopSnakeGame) window.stopSnakeGame();
    }

    if (viewId === 'terminal') {
        setTimeout(() => document.getElementById('term-input').focus(), 50);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Menú de 3 puntos
    const dotsBtn = document.getElementById('dots-btn');
    const menu = document.getElementById('dropdown-menu');

    dotsBtn.onclick = (e) => {
        e.stopPropagation();
        menu.classList.toggle('menu-hidden');
    };

    document.onclick = () => menu.classList.add('menu-hidden');

    // Terminal
    const termInput = document.getElementById('term-input');
    const termLog = document.getElementById('term-log');

    termInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
            const val = termInput.value.toLowerCase().trim();
            if(val === 'exit') { window.changeView('home'); termInput.value = ''; return; }

            const p = document.createElement('p');
            p.innerHTML = `<span class="text-[#00ffa3]">root@andrey:~$</span> ${termInput.value}`;
            termLog.appendChild(p);

            const res = document.createElement('p');
            res.className = "text-slate-500 mb-2 pl-4";
            
            if (val === 'help') res.innerText = "Comandos: bio, github, exit, clear";
            else if (val === 'bio') res.innerText = "Andrey Mihai: Software Developer.";
            else if (val === 'clear') { termLog.innerHTML = ''; termInput.value = ''; return; }
            else if (val !== '') res.innerText = "Comando no reconocido.";

            termLog.appendChild(res);
            termInput.value = '';
        }
    };
});
