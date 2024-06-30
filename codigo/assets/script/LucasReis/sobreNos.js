function avaliacaoRadio() {
    let nota = document.querySelector('input[name="rating"]:checked');

    if(nota == null) {
        alert('Selecione uma nota para o site!');
        return;
    };

    nota = nota.value;
    console.log("Nota selecionada: " + nota);

    document.getElementById("avalTitle1").style.display = 'none';

    document.getElementById("avalBtn").style.display = 'none';

    document.getElementById("feedback").style.display = 'none';

    document.getElementById("feedbackDiv").style.display = 'none';

    document.getElementById("starsRadio").style.display = 'none';

    document.getElementById("result").innerHTML = 'Obrigado por avaliar!';
}


document.getElementById('avalBtn').addEventListener('click', avaliacaoRadio);

