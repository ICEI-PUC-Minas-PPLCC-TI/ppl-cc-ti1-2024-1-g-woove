//CADASTRO

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

function incluirCadastro () {
    //ler os dados do localStorage
    let objDados = leDados(); //vai pegar o objeto q é o usuarios ali encima

    //incluir um novo contato
    let strNome = document.getElementById('campoNome').value; //variavel q vai pegar o q vc escrever nos campos
    let strEmail = document.getElementById('campoEmail').value; //...
    let strSenha = document.getElementById('campoSenha').value; //...
    let novoUsuario = { //"novoUsuario" vai ser um outro elemento no array "usuarios" do "objDados"
        nome: strNome, //o novo usuario vai ter esses dados com os valores dos campos
        email: strEmail,
        senha: strSenha
    };
    objDados.usuarios.push(novoUsuario); //push vai inserir esse novoUsuario no array de usuarios

    //salvar os dados no localStorage novamente
    salvaDados(objDados);

    alert('Cadastrado com sucesso!');
    window.location.href = 'PagLogin.html';

}

function salvaDados (dados) {
    localStorage.setItem ('wooveTeste', JSON.stringify (dados)); //vai pegar o q tiver no objDados, transformar em json, e colocar no localStorage usando o "setItem" especificamente em 'db'
}

function imprimeDados () {
    //so pra ver se funcionou os cadastros
    let tela = document.getElementById('tela');  //variavel tela q vai ser o div com id "tela" la no html
    let strHtml = ''; //inicializando a variavel q vai ter as informações dos cadastros
    let objDados = leDados (); //pegando o objeto q é os usuarios dnv

    for (let i = 0; i < objDados.usuarios.length; i++) { //loop pra pegar cada usuario cadastrado
        let nome = objDados.usuarios[i].nome; //criando as variaveis aq pra ficar menor a atribuição do strHtml ali embaixo
        let email = objDados.usuarios[i].email;
        let senha = objDados.usuarios[i].senha;
        strHtml +=  `<p>${nome} - ${email} - ${senha}<p>` //strHtml vai receber um paragrafo pra cada usuario, mostrando nome, email e senha
    }

    tela.innerHTML = strHtml; //vai colocar o strHtml no div de id "tela"
}

//config botoes

//criando uma variavel com os botoes pro codigo n parar de funcionar se eles n existirem na pagina q tiver, tava parando o codigo pq n existiam na pagina de login
//tbm colocando em uma função pra colocar ali embaixo e testar em qual pagina ta
function configBotoes() {
    let btnCadastrar = document.getElementById('btnCadastrar');
    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', incluirCadastro); //pega o id do botao de cadastrar, e executa a função quando for clicado ( addEventListener ('click', ...) )
    }

    let btnCarregaDados = document.getElementById('btnCarregaDados');
    if (btnCarregaDados) {
        btnCarregaDados.addEventListener('click', imprimeDados); //botao pra testar se cadastrou
    }

    let btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', fazerLogin); //botao de fzr login
    }
}

//se uma pagina carregasse antes da outra, a outra n tava com os botoes funcionando, ent tem essa function q acontece sempre q carregar a pagina
window.onload = function() {
    configBotoes();
};

//LOGIN

function fazerLogin() {
    //ler os dados do localStorage
    let objDados = leDados();
    
    //pegar o q for digitado nos campos e atribuir às variaveis abaixo
    let email = document.getElementById('campoLoginEmail').value;
    let senha = document.getElementById('campoLoginSenha').value;
    
    //find pra procurar um usuario com os dados digitados
    let usuarioEncontrado = objDados.usuarios.find(usuarios => usuarios.email === email && usuarios.senha === senha); //usuarios => é o mesmo q function(usuarios) {}
    
    //verificar se encontrou
    if (usuarioEncontrado) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        alert('Login bem-sucedido!');
        window.location.href = 'loginSucessoTeste.html'
    } else {
        alert('Email ou senha incorretos.');
    }
}