const url = 'https://pokeapi.co/api/v2/pokemon/';
const input = document.querySelector('#time-name');
const timeName = document.querySelector('#name-team');

const changeName = () => {
  timeName.innerText = input.value;
}

const api = async (nomePokemon) => {
  const response = await fetch(`${url}${nomePokemon}/`);
  const data = await response.json();
  /* return data; */
  console.log(data);
};

const randomFunction = async () => {
  let counter = 0;
  while (counter < 6) {
    const id = Math.floor((Math.random() * 413) + 1);
    const response = await fetch(`${url}${id}/`);
    const data = response.json();
    counter += 1;
  }
}

const menu = async () => {
  const popUp = document.createElement('div');
  const inputName = document.createElement('input');
  inputName.setAttribute('placeholder', 'Nome do pokemon:');
  popUp.appendChild(inputName);
  const listaInfo = document.createElement('ul');
  popUp.appendChild(listaInfo);
}

window.onload = () => {
  input.addEventListener('input', changeName);
};