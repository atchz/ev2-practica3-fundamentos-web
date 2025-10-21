import { crearTarjetaPokemon } from "./crearTarjetaPokemon.js";

const boton = document.getElementById("btn-cargar");
let contadorPokemon = 1;

crearTarjetaPokemon(contadorPokemon, 20).then(() => {
    contadorPokemon += 20;
});

boton.addEventListener("click", (e) => {
    crearTarjetaPokemon(contadorPokemon, 10).then(() => {
        contadorPokemon += 10;
    });
});
