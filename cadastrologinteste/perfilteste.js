window.onload = function() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        document.getElementById('nomeUsuario').innerText = `Nome: ${usuarioLogado.nome}`;
    } else {
        document.getElementById('nomeUsuario').innerText = 'Nenhum usuário logado.';
    }
};
