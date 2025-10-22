const boton = document.getElementById("btn-cargar");
const botonBuscador = document.getElementById("btn-buscar");
const inputBuscador = document.getElementById("buscador");
const titulo = document.querySelector(".titulo");
const contenedor = document.getElementById("contenedor");
const main = document.getElementById("main");
let contadorPokemon = 1;

async function crearCartaPokemon(datosPokemon) {
    const cartaPokemon = document.createElement("div");
    cartaPokemon.className = "cartaPokemon";

    const imagen_default = document.createElement("img");
    imagen_default.src = datosPokemon.sprites.front_default;
    imagen_default.className = "imagen_pokemon_default";

    const carta_nombre_pokemon = document.createElement("h2");
    carta_nombre_pokemon.textContent = datosPokemon.name;

    cartaPokemon.appendChild(imagen_default);
    cartaPokemon.appendChild(carta_nombre_pokemon);

    datosPokemon.types.forEach((pokemon) => {
        const etiqueta_tipo_pokemon = document.createElement("h5");
        etiqueta_tipo_pokemon.className = "etiqueta_tipo_pokemon";
        etiqueta_tipo_pokemon.textContent = pokemon.type.name;
        cartaPokemon.appendChild(etiqueta_tipo_pokemon);
    });

    cartaPokemon.addEventListener("click", (e) => {
        mostrarDetallePokemon(datosPokemon, cartaPokemon);
    });

    contenedor.appendChild(cartaPokemon);
}

async function crearTarjetasPokemon(contadorPokemon, contador, nombrePokemon) {
    if (nombrePokemon) {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`
        );
        const datosPokemon = await response.json();
        crearCartaPokemon(datosPokemon);
        return;
    }

    for (let id = contadorPokemon; id < contadorPokemon + contador; id++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const datosPokemon = await response.json();
        crearCartaPokemon(datosPokemon);
    }
}

async function mostrarDetallePokemon(datosPokemon, cartaPokemon) {
    contenedor.innerHTML = "";
    contenedor.style.display = "block";

    const paginaInfPokemon = document.createElement("section");
    paginaInfPokemon.className = "paginaInfPokemon";
    contenedor.appendChild(paginaInfPokemon);

    paginaInfPokemon.appendChild(cartaPokemon);

    cartaPokemon.style.width = "100%";
    cartaPokemon.style.gridRow = "1/3";

    const propiedadesEspañol = {
        hp: "Salud",
        attack: "Ataque",
        defense: "Defensa",
        "special-attack": "Ataque Especial",
        "special-defense": "Defensa Especial",
        speed: "Velocidad",
    };

    datosPokemon.stats.forEach((info) => {
        const contenedorStatPokemon = document.createElement("section");
        contenedorStatPokemon.className = "contenedorStatPokemon";
        const nombreStatPokemon = document.createElement("h3");
        const valorStatPokemon = document.createElement("h4");

        nombreStatPokemon.textContent = propiedadesEspañol[info.stat.name];
        valorStatPokemon.textContent = info.base_stat;

        contenedorStatPokemon.append(nombreStatPokemon, valorStatPokemon);
        paginaInfPokemon.appendChild(contenedorStatPokemon);
    });

    const sprites = Object.values(datosPokemon.sprites.other.showdown);

    const contenedorGaleriaPokemon = document.createElement("section");
    contenedorGaleriaPokemon.className = "contenedorGaleria";

    const headerGaleria = document.createElement("h2");
    headerGaleria.textContent = "GALERIA POKÉMON";
    headerGaleria.className = "headerGaleria";

    contenedorGaleriaPokemon.appendChild(headerGaleria);

    sprites.forEach((sprite) => {
        if (sprite !== null) {
            const imagenPokemon = document.createElement("img");
            imagenPokemon.src = sprite;
            imagenPokemon.style.cssText = `
                height: 200px;
                width: 100%;
                object-fit: contain;
                padding: 40px;
                background: linear-gradient(#242424, black);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.151);
            `;

            contenedorGaleriaPokemon.appendChild(imagenPokemon);
        }
    });
    contenedor.appendChild(contenedorGaleriaPokemon);
    boton.style.visibility = "hidden";
}

titulo.addEventListener("click", () => {
    contenedor.innerHTML = "";
    contenedor.style.display = "grid";
    boton.style.visibility = "visible";
    contadorPokemon = 1;
    crearTarjetasPokemon(contadorPokemon, 20);
    contadorPokemon += 20;
});

crearTarjetasPokemon(contadorPokemon, 20).then(() => {
    contadorPokemon += 20;
});

boton.addEventListener("click", (e) => {
    crearTarjetasPokemon(contadorPokemon, 10).then(() => {
        contadorPokemon += 10;
    });
});

botonBuscador.addEventListener("click", (e) => {
    e.preventDefault();
    contenedor.innerHTML = "";
    boton.style.visibility = "hidden";

    const nombrePokemon = inputBuscador.value.toLowerCase();

    if (nombrePokemon) {
        crearTarjetasPokemon(undefined, undefined, nombrePokemon);
    }
});
