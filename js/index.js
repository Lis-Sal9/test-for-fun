
window.addEventListener("DOMContentLoaded", () => {

    // List all characters
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
            console.log(data.results);

            let index_cards = document.getElementsByClassName('index_cards')[0];

            for (let i=0; i<=data.results.length; i++) {

                if (data.results[i]) {

                    let card = document.createElement('div');
                    card.className = 'card';
                    index_cards.appendChild(card);

                    let image = document.createElement('img');
                    image.src = data.results[i]['image'];
                    image.id = 'character_'+(i+1);
                    card.appendChild(image);

                    let div = document.createElement('div');
                    div.className = 'character_data_container';
                    card.appendChild(div);

                    let name = document.createElement('h4');
                    name.innerHTML = data.results[i]['name'];
                    name.id = 'name'+(i+1);
                    div.appendChild(name);

                }
            }


        })
        .catch();


});
