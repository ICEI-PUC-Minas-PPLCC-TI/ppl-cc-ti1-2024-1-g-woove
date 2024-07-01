// import API_URL from './config';

document.addEventListener('DOMContentLoaded', function() {
    fetch(`${API_URL}/usuarios`)
        .then(response => response.json())
        .then(users => {
            const listaUsuarios = document.getElementById('lista-usuarios');
            users.forEach(user => {
                const userLink = document.createElement('a');
                userLink.href = `perfil.html?id=${user.id}`;
                userLink.textContent = user.nome;
                listaUsuarios.appendChild(userLink);
                listaUsuarios.appendChild(document.createElement('br'));
            });
        })
        .catch(error => {
            console.error('Erro ao carregar a lista de usuários:', error);
            alert('Erro ao carregar a lista de usuários.');
        });
});