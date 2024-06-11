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
//let perfil = JSON.parse(localStorage.getItem('perfil'));

function leDados () {
    let strDados = localStorage.getItem('wooveTeste'); //vai pegar o json q tiver em getItem('...'), e vai ficar salvo msm se fechar o navegador
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados); //transforma de json pra objeto javascript
    }
    else {
        objDados = { usuarios:[]} //se n tiver nada la em 'db', vai inicializar uma estrutura vazia pra preencher
    }

    return objDados;
}

function salvaDados(dados) {
    localStorage.setItem('wooveTeste', JSON.stringify(dados));
}
//function salvaDados (x, dados) {
//    localStorage.setItem (x, JSON.stringify (dados)); //vai pegar o q tiver no objDados, transformar em //string json, e colocar no localStorage usando o "setItem" especificamente em '...'
//}

if (usuarioLogado) {
    console.log('teste: usuario logado funcionando');
    console.log(usuarioLogado);
    console.log('testando se biografia mudou no usuarioLogado:');
    console.log(usuarioLogado.biografia);
}

function lerContatos() {
    //const perfil = JSON.parse(localStorage.getItem('perfil'));
    
    //if (perfil) {
    //    nome.value = perfil.nome;
    //    email.value = perfil.email;
    //    biografia.value = perfil.biografia;
    //}
    if (usuarioLogado) {
        nome.value = usuarioLogado.nome;
        email.value = usuarioLogado.email;
        biografia.value = usuarioLogado.biografia;
    }
    //else {
    //    fetch('nome.json')
    //    .then(response => response.json())
    //    .then(data => {
    //        nome.value = data.nome;
    //        email.value = data.email;
    //        biografia.value = data.biografia;
    //        localStorage.setItem('perfil', JSON.stringify(data));
    //    })
    //    .catch(error => console.error('Erro ao ler o arquivo JSON:', error));
    //}
    else {
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

function salvarPerfil() {
    //const perfilEditado = {
    //    nome: nome.value,
    //    email: email.value,
    //    biografia: biografia.value
    //};

    usuarioLogado.nome = nome.value;
    usuarioLogado.email = email.value;
    usuarioLogado.biografia = biografia.value;

    // Atualizar o objDados
    let objDados = JSON.parse(localStorage.getItem('wooveTeste'));

    // Encontrar o índice do usuário logado no objDados
    let indexUsuario = objDados.usuarios.findIndex(user => user.id === usuarioLogado.id);

    // Atualizar os dados do usuário no objDados
    if (indexUsuario !== -1) {
        objDados.usuarios[indexUsuario] = usuarioLogado;
    }

    // Salvar os dados atualizados no localStorage
    //localStorage.setItem('wooveTeste', JSON.stringify(objDados));
    salvaDados(objDados);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    //console.log('Perfil salvo:', perfilEditado);
    console.log('Perfil salvo:');
    console.log(usuarioLogado);

    nome.disabled = true;
    email.disabled = true;
    biografia.disabled = true;
    btnSalvar.style.display = "none";
    btnEditarNome.style.display = "inline-block";
    btnEditarEmail.style.display = "inline-block";
    btnEditarBiografia.style.display = "inline-block";

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    console.log('perfil carregado:')
    console.log(usuarioLogado)
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
