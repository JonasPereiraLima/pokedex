const pokeApi = {};
let pokemonList = [];

pokeApi.getPokemons = getPokemons();
pokeApi.getPokemonDetails = getPokemonDetails;

async function getPokemons(offset = 0, limit = 5) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const jsonBody = await response.json();
    const pokemons = await jsonBody.results;
    const detailRequest = await pokemons.map(pokeApi.getPokemonDetails);
    const pokemonDetail = await Promise.all(detailRequest);
    pokemonDetails(pokemonDetail);
  } catch (error) {
    console.error(error);
  }
}

async function getPokemonDetails(pokemon) {
  try {
    const response = await fetch(pokemon.url);
    const jsonBody = await response.json();

    return convertPokeApiDetailToPokemon(jsonBody);
  } catch (error) {
    console.error(error);
  }
}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const types = pokeDetail.types.map((typeSlote) => typeSlote.type.name);
  const [type] = types;

  const pokemon = new Pokemon();

  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.image = pokeDetail.sprites.other.dream_world.front_default;
  pokemon.stats = pokeDetail.stats.map((info) => {
    return { base_stat: info.base_stat, name: info.stat.name };
  });
  pokemon.weight = pokeDetail.weight / 10;
  pokemon.height = pokeDetail.height / 10;
  pokemonList.push(pokemon);
  return pokemon;
}

function getPokemonById(pokemonId) {
  console.log(pokemonList);
  return pokemonList.find((pokemon) => {
    console.log(pokemon.number === pokemonId);
    return pokemon.number === pokemonId;
  });
}
