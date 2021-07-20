import data from "./data/lol/lol.js";
import { filterNames, difficultyOrder, filterByTag, mediaInfo } from "./data.js";

const dataLol = Object.values(data.data1)

listingCards(dataLol)

function listingCards(itens) {
  const cardPack = document.querySelector("ul.cards")
  cardPack.innerHTML = ""


  for (let champion in itens) {
    const info = itens[champion]

    const card = document.createElement("li")
    card.innerHTML = `

      <h3>${info.id}</h3>
      <img src="${info.splash}" alt="Imagem do Campeão"/>

       `
    cardPack.appendChild(card)


    const popup = document.querySelector(".popup-wrapper")
    const popUpContent = document.querySelector(".popup-content")

    card.addEventListener("click", () => {
      popup.style.display = "block";

      const attack = info.info.attack
      const defense = info.info.defense
      const magic = info.info.magic
      const difficulty = info.info.difficulty

      popUpContent.innerHTML = `
      <div class="image-splash">
        <img src="${info.splash}" class="img-bg" alt="Imagem do Campeão"/>
      </div>

        <h2 class="champion-name">${info.id}</h2>
        <h3 class="champion-title">${info.title}</h3>
        <div class="champion-data">
          <div class="champion-info">
            <p>Attack: ${attack} | 
            Defense: ${defense} | 
            Magic: ${magic} | 
            Difficulty: ${difficulty}
            </p>
          </div>
      
        <div class="introduction">${info.blurb}</div>
        <div class="champion-info">
        ${info.tags[0]}, ${info.tags[1]}
        </div>

        <div class="chart">
          <div id="barchart_material" class="chart-cont" style="width: 800px; height: 400px;"></div>
        </div>
      `;

      const grafic = document.querySelector("#barchart_material")
      grafic.innerHTML = `
      <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>`

      /* eslint-disable no-undef */
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        const tagChampion = `${info.tags[0]}`
        const tagSelection = filterByTag(dataLol, tagChampion)

        const medAtt = mediaInfo(tagSelection, 'attack')
        const medDef = mediaInfo(tagSelection, 'defense')
        const medMag = mediaInfo(tagSelection, 'magic')
        const medDiff = mediaInfo(tagSelection, 'difficulty')

        const data = google.visualization.arrayToDataTable([
          ['ABILITY', `${info.id}`, `${tagChampion}`, 'MAX'],
          ['ATTACK', attack, medAtt, 10],
          ['DEFENSE', defense, medDef, 10],
          ['MAGIC', magic, medMag, 10],
          ['DIFFICULTY', difficulty, medDiff, 10]
        ]);


        let options = {
          width: '100%',
          height: '50%',
          backgroundColor: {
            fill: '#171820'
          },
          chart: {
            title: `Habilidades de ${info.id}`,
            subtitle: `posicione o ponteiro em cada barra do gráfico para ver as informações`,
          },
          chartArea: {
            backgroundColor: {
              fill: '#171820',
              fillOpacity: 0.1
            },
          },
          bars: 'horizontal',
          titleTextStyle: {
            color: '#ffc700',
            fontSize: 20,
            fontName: 'sans-serif',
            bold: true,
            italic: false,
          },
        };

        let chart = new google.charts.Bar(document.getElementById('barchart_material'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      }
    });

    popup.addEventListener("click", (event) => {
      const classNameOfClickedElement = event.target.classList[0]
      const classNames = ["popup-close", "popup-wrapper"]
      const shoudlClosePopUp = classNames.some(
        (classNames) => classNames === classNameOfClickedElement)
      if (shoudlClosePopUp) {
        popup.style.display = "none"
      }
    });
  }
}

const searchName = document.querySelector(".search")
searchName.addEventListener('input', event => {
  const searchName = event.target.value.trim().toUpperCase()

  const dataFilterName = filterNames(dataLol, searchName)
  listingCards(dataFilterName)
})

let filtered = dataLol

const filterButton = document.querySelector(".menu")
filterButton.addEventListener('click', (event) => {
  const botaoClicado = event.target.textContent

  if (botaoClicado == "All Champions") {
    filtered = dataLol
  } else {
    filtered = filterByTag(dataLol, botaoClicado)
  }
  listingCards(filtered)
})

const categories = document.querySelector(".dropbtn")
categories.addEventListener("change", (event) => {
  const chosendifficulty = event.target.value

  const sortByDif = difficultyOrder(filtered, chosendifficulty)
  listingCards(sortByDif);
})

function iniciaModal(modalID) {
  // if (localStorage.closeModal !== modalID) {
    const modal = document.getElementById(modalID)
    if (modal) {
      modal.classList.add("mostrar")

      modal.addEventListener('click', (event) => {
        if (event.target.id == modalID || event.target.id == "close") {
          modal.classList.remove("mostrar")
          localStorage.closeModal = modalID
        }
      })
    }
  // }
}

const openInfo = document.querySelector(".header-img")
openInfo.addEventListener('click', () => iniciaModal("modal-informacao"))

document.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    iniciaModal("modal-informacao")
    }
}) 