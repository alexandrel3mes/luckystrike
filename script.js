const urlAll = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000';
const urlSimple = 'https://pokeapi.co/api/v2/pokemon/';
const input = document.querySelector('#time-name');
const timeName = document.querySelector('#name-team');
const cards = document.querySelectorAll('.card-pokemon');
const randomBtn = document.querySelector('#btn-random');
const inputImg = document.getElementById('input-img')
const questionModal = document.getElementById('question-modal')
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const headerImg = document.querySelector('.header-img');
const modal = document.getElementById("myModal");
const span = document.querySelector(".close");
const inputModal = document.querySelector('.input-modal');
const pokeList = document.querySelector('.poke-list');

// Ao clicar na logo, o site é recarregado;
headerImg.addEventListener('click', function reload() {
  document.location.reload(true);
})

// Função para inserir o nome do time com base no valor do input;
const changeName = () => {
  timeName.innerText = input.value;
}

// Retorna objeto com nome e url de todos pokemons;
const allPokemons = async () => {
  const response = await fetch(urlAll);
  const data = await response.json();
  return data.results;
};

// Retorna array com nome de todos pokemons;
const pokeNames = async () => {
  const fun = await allPokemons();
  const names = fun.map((names) => names.name);
  return names;
};

// Função que, ao clicar, move o pokemon da lista até a área de confirmação para adicionar ao time;
const addPokemon = (event) => {
  if (event.target.nodeName === 'LI') {
    inputImg.classList.remove('hidden');
    questionModal.classList.remove('hidden');
    btnYes.classList.remove('hidden');
    btnNo.classList.remove('hidden');
    const img = event.target.firstElementChild;
    const imgLink = img.getAttribute('src');
    inputImg.setAttribute('src', imgLink);
    questionModal.innerText = `Adicionar ${event.target.innerText} ao seu time?`
  } else {
    inputImg.classList.remove('hidden');
    questionModal.classList.remove('hidden');
    btnYes.classList.remove('hidden');
    btnNo.classList.remove('hidden');
    const img = event.target;
    const imgLink = img.getAttribute('src');
    inputImg.setAttribute('src', imgLink);
    questionModal.innerText = `Adicionar ${event.target.parentElement.innerText} ao seu time?`
  }
};

// Se o 'não' for clicado, os elementos voltam a desaparecer;
const noAdd = () => {
  inputImg.classList.add('hidden');
  questionModal.classList.add('hidden');
  btnYes.classList.add('hidden');
  btnNo.classList.add('hidden');
};

// Se o 'sim' for clicado, o pokemon é adicionado à carta selecionada;
const add = () => {
  modal.style.display = "none";
  const inputImg = document.getElementById('input-img')
  const imgLink = inputImg.getAttribute('src');
  const text = questionModal.innerText;
  const sliced = text.substring(10,text.length - 13);
  const pokeField = document.querySelector('.selected');
  const first = pokeField.firstElementChild;
  const h4 = first.firstElementChild;
  h4.style.display = 'block';
  const img = first.lastElementChild;
  h4.innerText = sliced;
  img.setAttribute('src', imgLink)
  removeSelected();
  displayHidden();
}

btnNo.addEventListener('click', noAdd)
btnYes.addEventListener('click', add)


const loadList = (names) => {
  names.forEach(async (name) => {
    pokeList.innerHTML = [];
    const search = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await search.json();
    const li = document.createElement('li')
    li.addEventListener('click', addPokemon);
    const img = document.createElement('img')
    const pokePic = data.sprites.front_default;
    img.setAttribute('src', pokePic);
    img.className = 'poke-image';
    li.className = 'list-item';
    li.innerText = name;
    pokeList.appendChild(li);
    li.append(img);
  });
}

// Ao clicar no botão 'Time Aleatório', gera uma requisição à API para cada carta e o pokemón designado (com base em um número aleatório) é inserido na carta;
const randomFunction = async () => {
  cards.forEach(async (card) => {
    const id = Math.floor((Math.random() * 1000) + 1);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    const firstDiv = card.firstElementChild;
    const pokeName = firstDiv.firstElementChild;
    pokeName.innerText = data.name;
    pokeName.style.display = 'block';
    const pokeImg = firstDiv.lastElementChild;
    pokeImg.setAttribute('src', data.sprites.front_default);
    pokeImg.style.width = '120px';
  })
} 

randomBtn.addEventListener('click', randomFunction);


/* async function getStats (name) {
  const divInfo = document.querySelector('.info');
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const data = await response.json();
  const status = data.stats;
  status.forEach((stats) => {
    const name = stats.stat.name;
    const rating = stats.base_stat;
    const string = `${name}: ${rating}`;
    divInfo.append(string);
  })
}
getStats('charizard');
*/

// Função que 'zera' a classe selected;
const removeSelected = () => {
  cards.forEach((card) => {
    if(card.classList.contains('selected'))
    card.classList.remove('selected')
  })
}

// Função que novamente esconde os elementos do modal;
const displayHidden = () => {
  inputImg.classList.add('hidden');
  questionModal.classList.add('hidden');
  btnYes.classList.add('hidden');
  btnNo.classList.add('hidden');
}

/* Modal */
// Função que abre o modal;
cards.forEach((card) => {
  card.onclick = function() {
    modal.style.display = "block";
    card.classList.add("selected");
  }
}); 

// Quando clicar no <span>, o modal é fechado. Além disso os elementos internos do modal voltam a ficar escondidos e a classe selected é esvaziada;
span.onclick = function() {
  modal.style.display = "none";
  removeSelected();
  displayHidden();
  inputModal.value = '';
}

// Quando é clicado fora do modal, ele é fechado. Além disso os elementos internos do modal voltam a ficar escondidos e a classe selected é esvaziada;
window.onclick = function(event) {
  input.addEventListener('input', changeName);
  if (event.target === modal) {
    modal.style.display = "none";
    removeSelected();
    displayHidden();
    inputModal.value = '';
  }
} 

const filterNames = async (event) => {
  const lower = event.target.value.toLowerCase();
  const length = lower.length;
  const allNames = await pokeNames();
  const filtered = allNames.filter((nome) => nome.substr(0, length) === lower);
  return filtered;
};

const namesFiltered = async (event) => {
  const filtered = await filterNames(event);
  console.log(filtered);
  loadList(filtered);
}

inputModal.addEventListener('input', namesFiltered);

window.onload = async () => {
  const names = await pokeNames();
  loadList(names);
}