const sectionPokemonList = document.querySelector("#section_1");
const sectionPokemonDetail = document.querySelector("#section_2");

const pokemons = document.querySelector("ol.pokemons");
let offset = 0;
let limit = 5;
const maxRecords = 151;

function convertTypesToLiTypes(types) {
  return types.map((type) => `<li class="type ${type}">${type}</li>`).join("");
}

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}" onclick="ShowPokemonDetail(${
    pokemon.number
  })">
  <span class="number">#${pokemon.number}</span>
  <span class="name">${pokemon.name}</span>
  <div class="detail">
    <ol class="types">
      ${convertTypesToLiTypes(pokemon.types)}
    </ol>
    <img
      src="${pokemon.image}"
      alt="${pokemon.name}"
    />
  </div>
</li>
  `;
}

function pokemonDetails(pokemonList) {
  pokemons.innerHTML += pokemonList.map(convertPokemonToLi).join("");
}

function loadMorePokemons() {
  offset += limit;
  if (offset + limit >= maxRecords) {
    limit = maxRecords - offset;
    document.querySelector("button#loadMore").style.display = "none";
  }
  getPokemons(offset, limit);
}

function ShowPokemonDetail(pokemonId) {
  pokemonDisplay(true);
  const showPokemon = getPokemonById(pokemonId);

  const imgPokemon = document.querySelector("#pokemon-img img");
  const pokemonName = document.querySelector("div.pokemon-name h2");
  const pokemonNumber = document.querySelector("div.pokemon-name span");

  const olTypes = document.querySelector("#typesList");
  const weight = document.querySelector("#weight");
  const height = document.querySelector("#height");

  sectionPokemonDetail.className = "pokemon-conteiner";
  sectionPokemonDetail.classList.add(showPokemon.type);

  imgPokemon.src = showPokemon.image;
  imgPokemon.alt = showPokemon.name;

  pokemonName.textContent = showPokemon.name;
  pokemonNumber.textContent = "#" + showPokemon.number;

  olTypes.innerHTML = convertTypesToLiTypes(showPokemon.types);
  weight.textContent = showPokemon.weight + " kg";
  height.textContent = showPokemon.height + " m";

  setStatus(showPokemon.stats);
}

function setStatus(pokemonStats) {
  const stats = document.querySelectorAll("div.stats > div > div > input");
  pokemonStats.forEach((pokemonStat) => {
    stats.forEach((stat) => {
      if (stat.id === pokemonStat.name) stat.value = pokemonStat.base_stat;
    });
  });
}

function pokemonDisplay(value) {
  if (value) {
    sectionPokemonDetail.style.display = "flex";
    sectionPokemonList.style.display = "none";
  } else if (!value) {
    sectionPokemonDetail.style.display = "none";
    sectionPokemonList.style.display = "block";
  }
}
