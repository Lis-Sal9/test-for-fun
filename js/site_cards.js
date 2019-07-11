
/**
 * List all characters on index.
 */
function listCharacters()
{
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
            console.log(data.results);

            let card_width = (index_cards.style.width).substring(0,(index_cards.style.width).length-2) / 5;
            let card_height = (index_cards.style.height).substring(0,(index_cards.style.height).length-2) / 5;
            let pixels = convertToPx(card_height, 'height');
            let row = 1;
            let cards_row = null;

            for (let i=0; i<=data.results.length; i++) {
                let linebreak = false;

                if (data.results[i]) {

                    if (i === 0) {
                        let next_row = document.createElement('div');
                        next_row.className = 'row site_cards_row row_'+row;
                        index_cards.appendChild(next_row);
                        cards_row = next_row;

                    } else if (i % 5 === 0 && i !== 0) {
                        linebreak = true;

                        let next_row = document.createElement('div');
                        row += 1;
                        next_row.className = 'row site_cards_row row_'+row;
                        index_cards.appendChild(next_row);
                        cards_row = next_row;
                    } else {
                        cards_row = document.getElementsByClassName('site_cards_row row_'+row)[0];
                    }

                    let card = document.createElement('div');
                    card.className = 'card';
                    card.style.width = (card_width - 2) + 'vw';
                    card.style.height = convertPxTo(pixels+10, 'height') + 'vh';
                    card.style.textAlign = 'center';
                    cards_row.appendChild(card);

                    let image = document.createElement('img');
                    image.src = data.results[i]['image'];
                    image.id = 'character_'+(i+1);
                    image.style.width = pixels +'px';
                    image.style.height = (pixels) +'px';
                    image.style.position = 'fixed';
                    card.appendChild(image);
                }
            }
        })
        .catch();
}