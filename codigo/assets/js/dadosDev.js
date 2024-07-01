function loadPage(){

fetch('/codigo/assets/db/dadosDev.json')
    .then(response => response.json())
    .then(dadosDev => {
        let devsHtml = "", devsHtml2 = "";
        let middle = "";

        for(let i = 0; i < dadosDev.length/2;i++)
        {
            devsHtml += `<div class="col text-center">
            <div class="justify-content-center">
              <figure>
                <a href="devPage.html?type=${dadosDev[i].devId}" class="text-decoration-none text-black">
                <img src="${dadosDev[i].photoPath}" alt="foto ${dadosDev[i].nome}" class="w-25 rounded-circle">
                <figcaption class="fs-6">${dadosDev[i].nome} <br> ${dadosDev[i].funcaoTi}</figcaption>
                </a>
              </figure>
            </div>
          </div>`
        }
        
        middle = `<div id="secondRow" class="row align-content-center"></div>`;

        for(let i = 3; i < dadosDev.length;i++)
          {
              devsHtml2 += `<div class="col text-center">
              <div class="justify-content-center">
                <figure>
                  <a href="devPage.html?type=${dadosDev[i].devId}" class="text-decoration-none text-black">
                  <img src="${dadosDev[i].photoPath}" alt="foto ${dadosDev[i].nome}" class="w-25 rounded-circle">
                  <figcaption class="fs-6">${dadosDev[i].nome} <br> ${dadosDev[i].funcaoTi}</figcaption>
                  </a>
                </figure>
              </div>
            </div>`
          }

        //console.log(devsHtml);
        //console.log(middle);
        //console.log(devsHtml2);

        document.getElementById("firstRow").innerHTML = devsHtml;
        document.getElementById("middle").innerHTML = middle;
        document.getElementById("secondRow").innerHTML = devsHtml2;
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON'));

}



document.addEventListener('DOMContentLoaded',loadPage);