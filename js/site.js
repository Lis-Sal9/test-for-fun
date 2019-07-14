
/** Initialise all variables **/
// General
let site_index = document.getElementsByClassName('site_index')[0];
let site_header = document.getElementsByClassName('site_header')[0];

// Characters
let index_cards = document.getElementsByClassName('site_cards')[0];
let character_details = document.getElementsByClassName('site_character')[0];
let selected_card = document.getElementsByClassName('site_selected_card');
let site_card_images = document.getElementsByClassName('site_card_image');
let site_card_row = index_cards.getElementsByClassName('row');

// Search
let search = document.getElementsByClassName('site_search')[0];
let search_submit = search.getElementsByClassName('search')[0];
let search_input = search.getElementsByTagName('input')[0];

// Pagination
let site_pagination_name = document.getElementsByClassName('site_pagination_name')[0];
let site_pagination_previous = document.getElementsByClassName('site_pagination_previous')[0];
let site_pagination_next = document.getElementsByClassName('site_pagination_next')[0];

// Chart
let site_chart = document.getElementById('site_chart');

// Other
let gender = {'Male': [], 'Female': [], 'Unknown' : []};
let selected_image = 0;
let site_click_character = function () {
    let id = (this.src.split('.')[1]).split('/')[4];

    if (selected_card.length === 0) {
        this.classList.add('site_selected_card');
        getCharacter(id);
        character_details.style.display = 'block';

    } else if (selected_card.length === 1) {
        if (selected_card[0] !== this) {
            selected_card[0].classList.remove('site_selected_card');
            this.classList.add('site_selected_card');
            getCharacter(id);
            character_details.style.display = 'block';
        }
    }

    selected_image = id;
};

/**
 * Search function
 */
search_submit.addEventListener('click', function(){
    search_input.focus();
    search_input.value = '';

    // TODO: filter by characters (when submit -button- and keypress -intro-)
});

/**
 * Initialise web
 */
window.onload = function() {
    setPage(1);

    site_index.addEventListener('click', function(event){
        if (event.target.classList[0] !== 'site_card_image') {
            character_details.style.display = 'none';

            if (event.target.classList[0] !== 'site_card_image') {
                if (selected_image !== 0) {
                    index_cards.getElementsByClassName('site_card_image card_' + selected_image)[0].classList.remove('site_selected_card');
                }
            }
        }
    });
};






