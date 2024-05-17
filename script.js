const nomeSpan = document.getElementById('nomeSpan');
const nome = document.getElementById('perfil-nome');
const email = document.getElementById('perfil-email');
const biografia = document.getElementById('perfil-biografia');
const btnSalvar = document.getElementById('btnSalvar');
const btnEditarNome = document.getElementById('btnEditarNome');
const btnEditarEmail = document.getElementById('btnEditarEmail');
const btnEditarBiografia = document.getElementById('btnEditarBiografia');

function lerContatos() {
    const perfil = JSON.parse(localStorage.getItem('perfil'));
    
    if (perfil) {
        nome.value = perfil.nome;
        email.value = perfil.email;
        biografia.value = perfil.biografia;
    } else {
        fetch('nome.json')
        .then(response => response.json())
        .then(data => {
            nome.value = data.nome;
            email.value = data.email;
            biografia.value = data.biografia;
            localStorage.setItem('perfil', JSON.stringify(data));
            })
        .catch(error => console.error('Erro ao ler o arquivo JSON:', error));
        }
    }


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
    
    function salvarPerfil() {
        const perfilEditado = {
            nome: nome.value,
            email: email.value,
            biografia: biografia.value
        };
    
        console.log('Perfil salvo:', perfilEditado);
    
        nome.disabled = true;
        email.disabled = true;
        biografia.disabled = true;
        btnSalvar.style.display = "none";
        btnEditarNome.style.display = "inline-block";
        btnEditarEmail.style.display = "inline-block";
        btnEditarBiografia.style.display = "inline-block";
    
        localStorage.setItem('perfil', JSON.stringify(perfilEditado));
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
