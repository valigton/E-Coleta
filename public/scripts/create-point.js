function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json()).then(states => {
      for(state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    })  
}

populateUFs();

function getCities(e) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");
  const ufValue = e.target.value;
  const indexOfSelectedState = e.target.selectedIndex;
  stateInput.value = e.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.disabled = true
  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for(city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

//items de coleta
const itemToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

//console.log(event.target.dataset.id)

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  //add or remove a class with javascript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  //verificar se existem itens selecionados
  const alreadySelected = selectedItems.findIndex(item => item == itemId) 
  //return true or false

  if(alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
    selectedItems.push(itemId)
  }
  collectedItems.value = selectedItems
}