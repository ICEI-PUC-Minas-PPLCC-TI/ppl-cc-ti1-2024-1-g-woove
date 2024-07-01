function devPage(i)
{
    fetch('../assets/db/dadosDev.json')
        .then(response => response.json())
        .then(dadosDev => {
            document.getElementById('pageTitle').innerHTML = `Woove - ${dadosDev[i].nome}`;

            document.getElementById('devName').innerHTML = dadosDev[i].nome;
            
            document.getElementById('bioText').innerText = dadosDev[i].bio;
            

            document.getElementById('devPhoto').innerHTML = `<img src="${dadosDev[i].photoPath}" alt="foto do Desenvolvedor" class="rounded-circle w-75">`;

            document.getElementById('gitHub').innerHTML = `<a class="text-decoration-none" href="${dadosDev[i].socialMedia.gitHub}">
                <ion-icon name="logo-github" class="wooveTitles px-2" size="large"></ion-icon>`;

            document.getElementById('instagram').innerHTML = `<a class="text-decoration-none" href="${dadosDev[i].socialMedia.instagram}">
            <ion-icon name="logo-instagram" class="wooveTitles px-2" size="large"></ion-icon>`;

            document.getElementById('twitter').innerHTML = `<a class="text-decoration-none" href="${dadosDev[i].socialMedia.twitter}">
                <ion-icon name="logo-twitter" class="wooveTitles px-2" size="large"></ion-icon>`;
        })
        .catch(err=>console.error('Erro ao carregar o arquivo JSON'))
}


document.addEventListener('DOMContentLoaded', ()=>{
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    let numberType = parseInt(type);
    
    switch(numberType)
    {
        case 1: devPage(numberType-1);
            break;
        case 2: devPage(numberType-1);
            break;
        case 3: devPage(numberType-1);
            break;
        case 4: devPage(numberType-1);
            break;
        case 5: devPage(numberType-1);
            break;
        case 6: devPage(numberType-1);
            break;
        default: 
            break;
    }
        

    console.log(type);
})