const olPokemon = document.getElementById("pokemons");
let limit = 6;
let offset = 0;

function btnLoadPoke() {
  offset = offset + 6;
  fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  ).then((response) => {
    return response.json().then((data) => {
      const pokemons = data.results;
      const promise = pokemons.map((pokemon) => {
        return fetch(pokemon.url).then((res) => res.json());
      });
      Promise.all(promise).then((details) => {
        details.forEach((data) => GetPokemon(data));
      });
    });
  });
}

function GetPokemon(data) {
  const pokemon_new = new Pokemon();
  pokemon_new.number = data.id;

  pokemon_new.name = data.name;
  pokemon_new.photo = data.sprites.other.dream_world.front_default;

  pokemon_new.types = data.types;

  const pokemonLi = document.createElement("li"); //pokemon
  const pokemonNumber = document.createElement("span"); //id do pokemon
  const pokemonName = document.createElement("span"); //nome Pokemon
  const pokemonImg = document.createElement("img"); //Img do pokemon
  const pokemonDetail = document.createElement("div"); //div detail
  const PokemonDetail_Ol = document.createElement("ol"); //lista detalhes
  pokemonDetail.classList.add("detail");
  pokemonLi.classList.add("pokemon");
  pokemonName.classList.add("name");
  pokemonNumber.classList.add("number");
  PokemonDetail_Ol.classList.add("types");

  pokemonImg.setAttribute("id", "img");

  olPokemon.append(pokemonLi);
  pokemonLi.append(pokemonNumber);
  pokemonLi.append(pokemonName);
  pokemonLi.append(pokemonDetail);
  pokemonDetail.append(PokemonDetail_Ol);
  pokemonLi.setAttribute("id", `${pokemon_new.types[0].type.name}`);

  pokemon_new.types.forEach((types) => {
    const PokemonType = document.createElement("li");
    PokemonType.setAttribute("id", `${types.type.name}`);
    PokemonType.classList.add("type");
    PokemonDetail_Ol.append(PokemonType);

    PokemonType.innerText = types.type.name;
  });
  pokemonDetail.append(pokemonImg);
  pokemonNumber.innerText = pokemon_new.number;
  pokemonName.innerText = pokemon_new.name;
  pokemonImg.setAttribute("src", pokemon_new.photo);
}
fetch(
  `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
).then((response) => {
  return response.json().then((data) => {
    const pokemons = data.results;
    const promise = pokemons.map((pokemon) => {
      return fetch(pokemon.url).then((res) => res.json());
    });
    Promise.all(promise).then((details) => {
      details.forEach((data) => GetPokemon(data));
    });
  });
});
