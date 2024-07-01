// import API_URL from './config';

// Helper function to fetch data from the server
async function fetchDados() {
    const response = await fetch(`${API_URL}/usuarios`);
    const data = await response.json();
    return data;
}

// Helper function to save data to the server
async function postDados(usuario) {
    const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    return response.json();
}

async function incluirCadastro() {
    let strNome = document.getElementById('campoNome').value;
    let strEmail = document.getElementById('campoEmail').value;
    let strSenha = document.getElementById('campoSenha').value;
    let novoUsuario = {
        id: generateUUID(),
        nome: strNome,
        email: strEmail,
        senha: strSenha,
        biografia: ''
    };

    await postDados(novoUsuario);
    alert('Cadastrado com sucesso!');
    window.location.href = 'PagLogin.html';
}

async function imprimeDados() {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = await fetchDados();

    for (let i = 0; i < objDados.length; i++) {
        let id = objDados[i].id;
        let nome = objDados[i].nome;
        let email = objDados[i].email;
        let senha = objDados[i].senha;
        let biografia = objDados[i].biografia;
        strHtml += `<p>${nome} - ${id} - ${email} - ${senha} - ${biografia}<p>`;
    }

    tela.innerHTML = strHtml;
}

async function fazerLogin() {
    let email = document.getElementById('campoLoginEmail').value;
    let senha = document.getElementById('campoLoginSenha').value;
    let objDados = await fetchDados();

    let usuarioEncontrado = objDados.find(usuarios => usuarios.email === email && usuarios.senha === senha);

    if (usuarioEncontrado) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        alert('Login bem-sucedido!');
        window.location.href = 'indexPerfil.html';
    } else {
        alert('Email ou senha incorretos.');
    }
}

// Configurar botões como antes
function configBotoes() {
    let btnCadastrar = document.getElementById('btnCadastrar');
    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', incluirCadastro);
    }

    let btnCarregaDados = document.getElementById('btnCarregaDados');
    if (btnCarregaDados) {
        btnCarregaDados.addEventListener('click', imprimeDados);
    }

    let btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', fazerLogin);
    }
}

window.onload = function() {
    configBotoes();
};

// Gerador de UUID (mantém a função original)
function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
