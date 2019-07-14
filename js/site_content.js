/**
 * List all characters on index.
 */
function listCharacters(page = null)
{
    let url = 'https://rickandmortyapi.com/api/character';
    if (page !== null) {
        url += '/?page=' + page;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.results.length  > 0) {
                setAllCards(data);
                setPagination(data);
            }
        })
        .catch(function(err) {
            console.error(err);
        });
}

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
    console.log(site_chart);
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
                console.log('num: ' +selected_image);
                if (selected_image !== 0) {
                    console.log('selected card');
                    console.log(selected_card[i]);

                    if (selected_card.length > 0) {
                        selected_card[0].classList.remove('site_selected_card');
                    }
                }

                for (let i = 0; i < gender[class_name].length; i++) {
                    site_card_images[gender[class_name][i]].classList.add('site_selected_card');
                }
            });

            bars[i].addEventListener('mouseout', function () {
                for (let i = 0; i < gender[class_name].length; i++) {
                    site_card_images[gender[class_name][i]].classList.remove('site_selected_card');
                }

                if (selected_image !== 0) {
                    console.log('selected card');
                    document.getElementsByClassName('site_card_image card_' + selected_image)[0].classList.add('site_selected_card');
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
 * Set the correct pagination params.
 * @param page
 */
function setPagination(page)
{
  /*  site_pagination_name.innerHTML = getPaginator(data) + ' / ' + data['info']['pages'];

    if (data['info']['prev'] === '') {
        site_pagination_previous.style.display = 'none';
    } else if (data['info']['prev']) {
        site_pagination_previous.style.display = 'block';
    }

    if (data['info']['next'] === '') {
        site_pagination_next.style.display = 'none';
    } else if (data['info']['next']) {
        site_pagination_next.style.display = 'block';
    }*/

    site_pagination_previous.addEventListener('click', function () {
      /*  console.log('PREV: '+getPaginator(data));

        let paginator = 1;
        if (getPaginator(data) !== paginator) {
            paginator = getPaginator(data) - 1;
        }*/

        console.log(selected_card);
        if (selected_card.length > 0) {
            selected_card[0].classList.remove('site_selected_card');

        }

        gender = {'Male': [], 'Female': [], 'Unknown' : []};
        setPage(page-1);


       // setPage(getPaginator(data));
        site_pagination_previous.removeEventListener('click', function () {});
    });

    site_pagination_next.addEventListener('click', function () {

        console.log(selected_card);
        if (selected_card.length > 0) {
            selected_card[0].classList.remove('site_selected_card');

        }

       // console.log('NEXT: '+getPaginator(data));

      /*  let paginator = data['info']['pages'];
        console.log('max paginator nextt' + paginator);
        if (getPaginator(data) !== paginator) {
            paginator = getPaginator(data) + 1;
            console.log('max paginator next' + paginator);
        }

        setPage(paginator);
*/

        if (page === 25) {
            setPage(25);
        } else {
            setPage(page+1);
        }

        site_pagination_next.removeEventListener('click', function () {});
    });
}

function getPaginator(data)
{
    console.log('iddd' + data['results'][data['results'].length-1]['id']);
    console.log('getpaginator: '+ data['results'][data['results'].length-1]['id'] / Math.round(data['info']['count']/data['info']['pages']));

    console.log('resultats / pàgines '+ data['results'][data['results'].length-1]['id'] + '/' +Math.round(data['info']['count']/data['info']['pages']));
    return data['results'][data['results'].length-1]['id'] / Math.round(data['info']['count']/data['info']['pages']);
}

/**
 * Show the correct page according to direction (previous or next).
 * @param page
 */
function setPage(page) {
    if (page === 0) {
        page = 1;
    } else if (page === 26) {
        page = 25;
    }
    console.log('SET PAGE: '+page);

    fetch('https://rickandmortyapi.com/api/character/?page='+page)
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

                site_pagination_name.innerHTML = page + ' / ' + data['info']['pages'];

                setAllCards(data);

                site_pagination_previous.addEventListener('click', function () {

                    if (selected_card.length > 0) {
                        selected_card[0].classList.remove('site_selected_card');

                    }

                    setPage(page-1);

                    site_pagination_previous.removeEventListener('click', function () {});
                });

                site_pagination_next.addEventListener('click', function () {

                    if (selected_card.length > 0) {
                        selected_card[0].classList.remove('site_selected_card');

                    }

                    setPage(page+1);

                    site_pagination_next.removeEventListener('click', function () {});
                });


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
    gender = {'Male': [], 'Female': [], 'Unknown' : []};
    console.log('SET ALL CARDS!!!');
    character_details.style.display = 'none';

    console.log('length images: '+site_card_images.length);

    for (let i=0; i<site_card_images.length; i++) {
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

    console.log(gender['Male'].length);
    console.log(gender['Female'].length);

    fillGenderChart(data.results.length);
   // setPagination(page);
}