async function getPokemon(id){
    //consult to pokeapi
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    if(response.status != 200)
    {
        notFound()
    }else{
    //parsing response from json format to plain javascript object
    const data = await response.json()
    return data}
}
//init function
async function init(){
    //get pokemon id from data
    const pokemon = await getPokemon(1)
    updatePokemon(pokemon)
}
init()

function updatePokemon(pokemon){
    //modifying the dom (print info in HTML)
    if(pokemon.id >= 100){
        window.pokemonId.textContent = `#${pokemon.id}`
    }else{
        window.pokemonId.textContent =  `#0${pokemon.id} `
    }
    //modifying name
    window.pokemonName.textContent = pokemon.name
    //modifying image
    window.pokemonImage.setAttribute('src', pokemon.sprites.front_default)
    //modifying stats
    window.height.textContent = `Height: ${pokemon.height*10} cm`
    window.weight.textContent = `Weight: ${pokemon.weight/10} kg`
    window.hp.textContent = `Hp: ${pokemon.stats[0].base_stat}`
    window.attack.textContent = `Attack: ${pokemon.stats[1].base_stat}`
    window.defense.textContent = `Defense: ${pokemon.stats[2].base_stat}`
    window.specialAttack.textContent = `Special-attack: ${pokemon.stats[3].base_stat}`
    window.specialDefense.textContent = `Special-defense: ${pokemon.stats[4].base_stat}`
    window.speed.textContent = `Speed: ${pokemon.stats[5].base_stat}`

    //modifyng types
    if(pokemon.types.length == 2){
        window.pokemonTypeOne.textContent = `${pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)}`
        window.pokemonTypeTwo.textContent = `${pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1)}`
    }else{
        window.pokemonTypeOne.textContent = `${pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)}`
        window.pokemonTypeTwo.textContent = " "
    }

    // assigning the moves to the const variable
    const moves = pokemon.moves.map((typ) => typ.move.name)
    //clearing the list containing the values of the previous pokemon
	document.getElementById("pokemonMoves").innerHTML = ""
	//insert the new moves to <li> format
	moves.forEach(function (element){
        document.getElementById("pokemonMoves").innerHTML += "<li>" + element + "</li>"
    })
}

//definition structure to search for pokemon
const $find = document.querySelector('#find')
$find.addEventListener('click', findPokemon())

function findPokemon (){
    window.search.addEventListener('change', async (event)=>{
        let pokemonName = window.search.value
        pokemonName = pokemonName.toLowerCase();
        const pokemon = await getPokemon(pokemonName)
        updatePokemon(pokemon)
    })
}

function notFound(){
    window.pokemonId.textContent = "#???"
    window.pokemonName.textContent = 'NOTFOUND'
    window.pokemonImage.setAttribute('src', './assets/image/404.jpg' )
    //modifying stats
    window.height.textContent = `Height: ???`
    window.weight.textContent = `Weight: ???`
    window.hp.textContent = `Hp: ???`
    window.attack.textContent = `Attack: ???`
    window.defense.textContent = `Defense: ???`
    window.specialAttack.textContent = `Special-attack: ???`
    window.specialDefense.textContent = `Special-defense: ???`
    window.speed.textContent = `Speed: ???`
    //modifyng types
    window.pokemonTypeOne.textContent = "???"
    window.pokemonTypeTwo.textContent = "???"
}