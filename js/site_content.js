
/**
 * Generate chart according to gender.
 * @param num_characters
 */
function fillGenderChart(num_characters)
{
    clearGenderChart();

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
    site_chart.innerHTML = chart.outerHTML;

    hoverCardsByGender();
}

/**
 * Clear gender chart.
 */
function clearGenderChart()
{
    site_chart.innerHTML = '';
}

/**
 * Clear all old cards.
 */
function clearCards()
{
    for (let i=0; i<site_card_images.length; i++) {
        site_card_images[i].src = '';
    }
}

/**
 * Hover effect to the bars on bar chart. All items that belong to that gender group must be highlighted.
 */
function hoverCardsByGender()
{
    let bars = document.getElementsByClassName('bars')[0].getElementsByTagName('div');

    if (bars.length > 0) {
        for (let i = 0; i < bars.length; i++) {
            let class_name = bars[i].className.charAt(0).toUpperCase() + bars[i].className.slice(1);

            bars[i].addEventListener('mouseover', function () {
                if (selected_image !== 0) {
                    if (selected_card.length > 0) {
                        selected_card[0].classList.remove('site_selected_card');
                    }
                }

                for (let i = 0; i < gender[class_name].length; i++) {
                    site_card_images[gender[class_name][i]].classList.add('site_selected_card');
                }
            });

            bars[i].addEventListener('mouseout', function (event) {
                for (let i = 0; i < gender[class_name].length; i++) {
                    site_card_images[gender[class_name][i]].classList.remove('site_selected_card');
                }

                if (selected_image !== 0 && event.target.classList[2] !== 'site_pagination_icon') {
                    index_cards.getElementsByClassName('card_'+(selected_image - 20 * (selected_page - 1)))[0].classList.add('site_selected_card');
                    character_details.style.display = 'block';

                } else if (selected_image !== 0 && event.target.classList[2] === 'site_pagination_icon') {
                    index_cards.getElementsByClassName('card_'+selected_image)[0].classList.remove('site_selected_card');
                    character_details.style.display = 'none';
                }
            });
        }
    }
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
            if (data) {
                let details = document.getElementsByClassName('site_character_details');

                for (let j = 0; j < details.length; j++) {
                    if (j === 0) {
                        let image = document.getElementsByClassName('site_character_image')[0];
                        image.src = data['image'];

                    } else {
                        switch (j) {
                            case 1:
                                details[j].innerHTML = details[j].innerHTML.split(':')[0] + ': ' + data['name'];
                                break;
                            case 2:
                                details[j].innerHTML = details[j].innerHTML.split(':')[0] + ': ' + data['location']['name'];
                                break;
                            case 3:
                                details[j].innerHTML = details[j].innerHTML.split(':')[0] + ': ' + data['species'];
                                break;
                            case 4:
                                details[j].innerHTML = details[j].innerHTML.split(':')[0] + ': ' + data['gender'];
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        })
        .catch(function(err) {
            console.error(err);
        });
}

/**
 * Show the correct page according to direction (previous or next).
 */
function setPage() {
    if (selected_page === 0) {
        selected_page = 1;
    } else if (selected_page === 26) {
        selected_page = 25;
    }

    fetch('https://rickandmortyapi.com/api/character/?page='+selected_page)
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Show or hide arrows
                if (data['info']['prev'] === '') {
                    site_pagination_previous.style.display = 'none';
                } else if (data['info']['prev']) {
                    site_pagination_previous.style.display = 'block';
                }

                if (data['info']['next'] === '') {
                    site_pagination_next.style.display = 'none';
                } else if (data['info']['next']) {
                    site_pagination_next.style.display = 'block';
                }

                site_pagination_name.innerHTML = selected_page + ' / ' + data['info']['pages'];
                setAllCards(data);
            }
        })
        .catch(function(err) {
            console.error(err);
        });
}

/**
 * List all cards and generate the chart according to results.
 * @param data
 */
function setAllCards(data)
{
    clearCards();
    gender = {'Male': [], 'Female': [], 'Unknown' : []};
    character_details.style.display = 'none';

    for (let i=0; i<data.results.length; i++) {
        site_card_images[i].src = data.results[i].image;
        site_card_images[i].style.display = 'block';
        site_card_images[i].addEventListener('click', site_click_character);

        if (data.results[i]['gender'] === 'Male') {
            gender['Male'].push(i);
        } else if (data.results[i]['gender'] === 'Female') {
            gender['Female'].push(i);
        } else {
            gender['Unknown'].push(i);
        }
    }

    if (data.results.length < site_card_images.length) {
        for (let i=data.results.length; i<site_card_images.length; i++) {
            site_card_images[i].style.display = 'none';
        }
    }

    fillGenderChart(data.results.length);
}