// Función Global de Navegación
function changeView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('view-active'));
    document.getElementById('view-' + viewId).classList.add('view-active');
    document.getElementById('dropdown-menu').classList.add('menu-hidden');

    // Manejo de procesos según la vista
    if (viewId === 'game') {
        initSnakeGame();
    } else {
        if (typeof stopSnakeGame === "function") stopSnakeGame();
    }

    if (viewId === 'terminal') {
        setTimeout(() => document.getElementById('term-input').focus(), 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dotsBtn = document.getElementById('dots-btn');
    const menu = document.getElementById('dropdown-menu');
    const termInput = document.getElementById('term-input');
    const termLog = document.getElementById('term-log');

    // Toggle Menú
    dotsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('menu-hidden');
    });

    document.addEventListener('click', () => menu.classList.add('menu-hidden'));

    // Navegación de botones
    document.getElementById('btn-terminal').addEventListener('click', () => changeView('terminal'));
    document.getElementById('btn-game').addEventListener('click', () => changeView('game'));

    // Lógica de Terminal
    const commands = {
        'help': 'Comandos disponibles: bio, github, clear, exit, date',
        'bio': 'Andrey Mihai: Desarrollador Java enfocado en optimización.',
        'github': 'Abriendo github.com/andrey828...',
        'date': () => new Date().toLocaleString(),
        'clear': 'CLEAR'
    };

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = termInput.value.trim().toLowerCase();
            if (input === 'exit') { changeView('home'); termInput.value = ''; return; }

            // Eco
            const p = document.createElement('p');
            p.innerHTML = `<span class="text-[#00ffa3]">root@andrey:~$</span> ${termInput.value}`;
            termLog.appendChild(p);

            const res = document.createElement('p');
            res.className = 'text-slate-400 mb-2 pl-4';

            if (input === 'clear') {
                termLog.innerHTML = '';
            } else if (commands[input]) {
                res.innerHTML = typeof commands[input] === 'function' ? commands[input]() : commands[input];
                termLog.appendChild(res);
                if (input === 'github') window.open('https://github.com/andrey828', '_blank');
            } else if (input !== '') {
                res.innerHTML = `Comando no reconocido: ${input}`;
                termLog.appendChild(res);
            }

            termInput.value = '';
            document.getElementById('term-container').scrollTop = document.getElementById('term-container').scrollHeight;
        }
    });

    // Esc para salir de cualquier vista
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') changeView('home');
    });
});
