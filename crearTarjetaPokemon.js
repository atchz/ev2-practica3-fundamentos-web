const contenedor = document.getElementById("contenedor");

export async function crearTarjetaPokemon() {
    for (let index = 1; index < 20; index++) {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${index}`
        );
        const data = await response.json();
        const carta_pokemon = document.createElement("div");
        carta_pokemon.className = "carta_pokemon";

        const imagen_default = document.createElement("img");
        imagen_default.src = data.sprites.front_default;
        imagen_default.className = "imagen_pokemon_default";

        const carta_nombre_pokemon = document.createElement("h2");
        carta_nombre_pokemon.textContent = data.name;

        carta_pokemon.appendChild(imagen_default);
        carta_pokemon.appendChild(carta_nombre_pokemon);

        contenedor.appendChild(carta_pokemon);
    }
}
