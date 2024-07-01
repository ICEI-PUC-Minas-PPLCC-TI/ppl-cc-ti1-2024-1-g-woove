// import API_URL from './config';

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');

    if (!userId) {
        alert('Nenhum usuário especificado.');
        return;
    }

    fetch(`${API_URL}/usuarios/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('perfil-nome').textContent = user.nome;
            document.getElementById('perfil-email').textContent = user.email;
            document.getElementById('perfil-biografia').textContent = user.biografia;
        })
        .catch(error => {
            console.error('Erro ao carregar o perfil:', error);
            alert('Erro ao carregar o perfil.');
        });
});