import data from "./data/lol/lol.js";
import { filterNames } from "./data.js";
import { difficultyOrder } from "./data.js";


// Campeão aparece na tela
let dataLol = Object.values(data.data1);

listingCards(dataLol);

function listingCards(itens) {
  const cardPack = document.querySelector("ul.cards");
  cardPack.innerHTML = "";

  for (let champion in itens) {
    const info = itens[champion]; //veja que aqui eu alterei o caminho para acessar a propriedade
        
    const card = document.createElement("li");
    card.innerHTML = `
      <img src="${info.splash}" alt="Imagem do Campeão"/>
      <h3>${info.id}</h3>
       `       
    cardPack.appendChild(card); 

      // POP-UP //
    const popup = document.querySelector(".popup-wrapper");
    // CONTEUDO DO POP-UP //
    const popUpContent = document.querySelector(".popup-content");
    // const splash = info.splash;
    

    card.addEventListener("click", () => {
      popup.style.display = "block";

      popUpContent.innerHTML = `
      <div class="image-splash">
        <img src="${info.splash}" class="img-bg" alt="Imagem do Campeão"/>
      </div>

        <h2 class="champion-name">${info.id}</h2>
        <h3 class="champion-title">${info.title}</h3>
        <div class="champion-data">
          <div class="champion-info">
            <p>Ataque: ${info.info.attack} | 

            Defesa: ${info.info.defense} | 

            Magia: ${info.info.magic} | 

            Dificuldade: ${info.info.difficulty}
            
            </p>
          </div>
      
        <div class="introduction">${info.blurb}</div>
      </div>
      `;
    });

    // FECHAR POP-UP //

    popup.addEventListener("click", (event) => {
      const classNameOfClickedElement = event.target.classList[0];
      const classNames = ["popup-close", "popup-wrapper"];
      const shoudlClosePopUp = classNames.some(
        (classNames) => classNames === classNameOfClickedElement);
      if (shoudlClosePopUp) {
        popup.style.display = "none";
      }
    });
  }
}

//FILTRAR POR NOME 
let searchName = document.querySelector(".search")

searchName.addEventListener('input', event => {
  searchName = event.target.value.trim().toUpperCase()
  let dataFilterName = filterNames(dataLol, searchName)
  console.log(dataFilterName)
  listingCards(dataFilterName)
})


//FILTRAR POR  DIFICULDADE
/*const categories = document.querySelector(".categorias")
categories.addEventListener("click", (event) => {
  const chosendifficulty = event.target.textContent   
  console.log (chosendifficulty)
})*/














