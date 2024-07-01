//import API_URL from './config';

const nome = document.getElementById('perfil-nome');
const email = document.getElementById('perfil-email');
const biografia = document.getElementById('perfil-biografia');
const btnSalvar = document.getElementById('btnSalvar');
const btnEditarNome = document.getElementById('btnEditarNome');
const btnEditarEmail = document.getElementById('btnEditarEmail');
const btnEditarBiografia = document.getElementById('btnEditarBiografia');
const perfilFoto = document.getElementById('perfil-foto');
const fotoPreview = document.getElementById('foto-preview');

let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

// Função para buscar dados dos usuários
async function fetchDados() {
    const response = await fetch(`${API_URL}/usuarios`);
    const data = await response.json();
    return data;
}

// Função para atualizar os dados do usuário
async function updateDados(usuario) {
    const response = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    return response.json();
}

if (usuarioLogado) {
    console.log('teste: usuario logado funcionando');
    console.log(usuarioLogado);
    console.log('testando se biografia mudou no usuarioLogado:');
    console.log(usuarioLogado.biografia);
}

async function lerContatos() {
    if (usuarioLogado) {
        nome.value = usuarioLogado.nome;
        email.value = usuarioLogado.email;
        biografia.value = usuarioLogado.biografia;
    } else {
        nome.value = '???';
        email.value = '???';
        biografia.value = '???';
        console.log('nenhum usuario logado');
    }
}

const fotoArmazenada = localStorage.getItem('foto');
if (fotoArmazenada) {
    fotoPreview.src = fotoArmazenada;
    fotoPreview.style.display = 'block';
} else {
    fotoPreview.src = '/codigo/assets/images/perfilreserva.webp';
    fotoPreview.style.display = 'block';
}

perfilFoto.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            fotoPreview.src = reader.result;
            fotoPreview.style.display = 'block';
            localStorage.setItem('foto', reader.result);
        });

        reader.readAsDataURL(file);
    }
});

function editarNome() {
    nome.disabled = false;
    btnSalvar.style.display = "inline-block";
    btnEditarNome.style.display = "none";
}

function editarEmail() {
    email.disabled = false;
    btnSalvar.style.display = "inline-block";
    btnEditarEmail.style.display = "none";
}

function editarBiografia() {
    biografia.disabled = false;
    btnSalvar.style.display = "inline-block";
    btnEditarBiografia.style.display = "none";
}

async function salvarPerfil() {
    usuarioLogado.nome = nome.value;
    usuarioLogado.email = email.value;
    usuarioLogado.biografia = biografia.value;

    await updateDados(usuarioLogado);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    console.log('Perfil salvo:');
    console.log(usuarioLogado);

    nome.disabled = true;
    email.disabled = true;
    biografia.disabled = true;
    btnSalvar.style.display = "none";
    btnEditarNome.style.display = "inline-block";
    btnEditarEmail.style.display = "inline-block";
    btnEditarBiografia.style.display = "inline-block";
}

const btnLog_out = document.getElementById('btnLog_out');
if (btnLog_out) {
    btnLog_out.addEventListener('click', function() {
        localStorage.removeItem('usuarioLogado');
        console.log('usuario deslogado');
        window.location.href = 'PagLogin.html';
    });
}

function ajustarAlturaTextarea() {
    biografia.style.height = 'auto';
    biografia.style.height = biografia.scrollHeight + 'px';
}

biografia.addEventListener('input', ajustarAlturaTextarea);

btnEditarNome.addEventListener('click', editarNome);
btnEditarEmail.addEventListener('click', editarEmail);
btnEditarBiografia.addEventListener('click', editarBiografia);
btnSalvar.addEventListener('click', salvarPerfil);

document.addEventListener('DOMContentLoaded', lerContatos);

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.bi-highlights');
    const btnTransporte = document.getElementById('btnTransporte');
    const opcoesTransporte = document.getElementById('opcoesTransporte');
    const btnPreferencias = document.getElementById('btnPreferencias');
    const opcoesPreferencias = document.getElementById('opcoesPreferencias');

    function carregarTema() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    carregarTema();

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });

    btnTransporte.addEventListener('click', function() {
        opcoesTransporte.style.display = opcoesTransporte.style.display === 'block' ? 'none' : 'block';
    });

    btnPreferencias.addEventListener('click', function() {
        opcoesPreferencias.style.display = opcoesPreferencias.style.display === 'block' ? 'none' : 'block';
    });
});
