
let gender = {'Male': [], 'Female': [], 'Unknown' : []};

let site_click_character = function () {
    let character_details = document.getElementsByClassName('site_character')[0];
    character_details.style.display = 'block';

    let id = this.className.split('_')[1];
    this.style.border = 'solid #afa71d 2px';
    getCharacter(id);
};


/**
 * List all characters on index.
 */
function listCharacters()
{
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
            console.log(data.results);

          //  let card_width = (index_cards.style.width).substring(0,(index_cards.style.width).length-2) / 5;
          //  let card_height = (index_cards.style.height).substring(0,(index_cards.style.height).length-2) / 5;
          //  let pixels = convertToPx(card_height, 'height');
          //  let row = 1;
          //  let cards_row = null;


                for (let i=0; i<=data.results.length; i++) {
            //    let linebreak = false;
                    if (data.results[i] !== null) {

                 /*   if (i === 0) {
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
                    }*/

                  /*  let card = document.createElement('div');
                    card.className = 'card card_'+i;
                    card.style.width = (card_width - 2) + 'vw';
                    card.style.height = convertPxTo(pixels+10, 'height') + 'vh';
                    card.style.textAlign = 'center';
                    index_cards.appendChild(card);

                    let image = document.createElement('img');
                    image.src = data.results[i]['image'];
                    image.id = 'character_'+(i+1);
                    image.style.width = pixels +'px';
                    image.style.height = (pixels) +'px';
                    image.style.position = 'fixed';
                    card.appendChild(image);*/

                    console.log(data.results[i]['gender']);


                    if (data.results[i]['gender'] === 'Male') {
                        gender['Male'].push(i);
                    } else if (data.results[i]['gender'] === 'Female') {
                        gender['Female'].push(i);
                    } else {
                        gender['Unknown'].push(i);
                    }


                        fillGenderChart(data.results.length);


                        let cards = document.getElementsByClassName('card');

                        for (let j = 0; j < cards.length; j++) {
                            cards[j].addEventListener('click', site_click_character);

                            /*cards[j].addEventListener('mouseout', function () {
                                this.style.border = '0';
                            });*/
                        }

                        cards[0].click();



                }










            }





/*

            let leg_name_male = document.getElementsByClassName('male')[0];
            let leg_name_female = document.getElementsByClassName('female')[0];
            let leg_name_unknown = document.getElementsByClassName('unknown')[0];

            leg_name_male.addEventListener('mouseover', function () {
                let cards = document.getElementsByClassName('card');

                for (let j = 0; j < gender['male'].length; j++) {
                    cards[j].hover();
                }
            });

            leg_name_female.addEventListener('mouseover', function () {
                prova2.style.borderTopColor = 'purple';
                prova1.style.borderTopColor = 'green';
                prova3.style.borderTopColor = 'green';
            });

            leg_name_unknown.addEventListener('mouseover', function () {
                prova3.style.borderTopColor = 'purple';
                prova2.style.borderTopColor = 'green';
                prova1.style.borderTopColor = 'green';
            });

            leg_name_male.addEventListener('mouseout', function () {
                prova1.style.borderTopColor = 'green';
                prova2.style.borderTopColor = 'green';
                prova3.style.borderTopColor = 'green';
            });

            leg_name_female.addEventListener('mouseout', function () {
                prova2.style.borderTopColor = 'green';
                prova1.style.borderTopColor = 'green';
                prova3.style.borderTopColor = 'green';
            });

            leg_name_unknown.addEventListener('mouseout', function () {
                prova3.style.borderTopColor = 'green';
                prova2.style.borderTopColor = 'green';
                prova1.style.borderTopColor = 'green';
            });
*/

        })
        .catch();
}

/**
 * Generate chart according to gender.
 * @param num_characters
 */
function fillGenderChart(num_characters)
{
    let chart = document.createElement('div');
    let bar_chart = document.createElement('table');
    let bar_row = document.createElement('tr');
    let legend = document.createElement('tr');

    for (let i = 0; i < Object.keys(gender).length; i++) {
        let bar_data = document.createElement('td');
        let bar = document.createElement('div');

        bar_row.setAttribute('class', 'bars');
        bar.setAttribute('class', Object.keys(gender)[i].toLowerCase());
        bar.style.height = (gender[(Object.keys(gender)[i])].length/num_characters * 100) + '%';
        bar_data.appendChild(bar);
        bar_row.appendChild(bar_data);
    }

    legend.setAttribute('class', 'legend');
    legend.setAttribute('colspan', Object.keys(gender).length.toString());

    for (let j = 0; j < Object.keys(gender).length; j++) {
        let leg_box = document.createElement('td');
        let leg_name = document.createElement('span');

        leg_box.setAttribute('class', 'leg_box site_label');
        leg_name.innerText = Object.keys(gender)[j];
        leg_box.appendChild(leg_name);
        legend.appendChild(leg_box);
    }

    bar_chart.appendChild(bar_row);
    bar_chart.appendChild(legend);
    chart.appendChild(bar_chart);
    document.getElementById('site_chart').innerHTML = chart.outerHTML;
}

/**
 * Show details of the selected character.
 * @param id
 */
function getCharacter(id)
{
    fetch('https://rickandmortyapi.com/api/character/'+id)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);

            if (data.results) {
                let details = document.getElementsByClassName('site_character_details');

                for (let j = 0; j < details.length; j++) {
                    if (j === 0) {
                        let image = document.getElementsByClassName('site_character_image');
                        image.src = data.results['image'];

                    } else {
                        switch (j) {
                            case 1:
                                details[j].innerHTML = data.results['name'];
                                break;
                            case 2:
                                details[j].innerHTML = data.results['location'];
                                break;
                            case 3:
                                details[j].innerHTML = data.results['species'];
                                break;
                            case 4:
                                details[j].innerHTML = data.results['gender'];
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        })
        .catch();
}