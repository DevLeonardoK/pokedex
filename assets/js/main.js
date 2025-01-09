const olPokemon = document.getElementById("pokemons");

// function getPokemon(namePokemon) {
//   fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`).then((response) => {
//     return response.json().then((data) => {
//       const pokemon = new Pokemon();
//     });
//   });
// }
function GetPokemon(pokemon_name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`).then(
    async (response) => {
      const data = await response.json();
      const pokemon_new = new Pokemon();
      pokemon_new.name = data.name;
      pokemon_new.photo = data.sprites.other.dream_world.front_default;
      pokemon_new.number = data.id;
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

      pokemon_new.types.forEach((types) => {
        const PokemonType = document.createElement("li");
        PokemonType.classList.add("type");
        PokemonDetail_Ol.append(PokemonType);
        PokemonType.innerText = types.type.name;
      });

      pokemonDetail.append(pokemonImg);
      pokemonNumber.innerText = pokemon_new.number;
      pokemonName.innerText = pokemon_new.name;
      pokemonImg.setAttribute("src", pokemon_new.photo);
    }
  );
}
fetch("https://pokeapi.co/api/v2/pokemon/?limit=10").then(async (response) => {
  return await response.json().then((data) => {
    const pokemons = data.results;
    pokemons.forEach((pokemon) => {
      const nome = pokemon.name;
      GetPokemon(`${nome}`);
    });
  });
});
