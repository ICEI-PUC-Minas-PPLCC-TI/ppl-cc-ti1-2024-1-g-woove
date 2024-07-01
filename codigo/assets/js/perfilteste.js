window.onload = function() {
    //transforma a string do usuarioLogado do cadlog.js em um objeto
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        document.getElementById('nomeUsuario').innerText = `Nome: ${usuarioLogado.nome}`;
    } else {
        document.getElementById('nomeUsuario').innerText = 'Nenhum usuário logado.';
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
           localStorage.removeItem('usuarioLogado');
        });
    }

    const voltarLogin = document.getElementById('btnVoltarLogin');
    if (voltarLogin) {
        voltarLogin.addEventListener('click', function() {
            window.location.href = 'PagLogin.html';
        });
    }
};