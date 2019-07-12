
/** Initialise all variables **/
/*let site_index = document.getElementsByClassName('site_index')[0];
let index_cards = document.getElementsByClassName('site_cards')[0];
let logo = document.getElementsByClassName('site_logo')[0];
let title = document.getElementsByClassName('site_title')[0];
let site_header = document.getElementsByClassName('site_header')[0];
*/


// Click on search
let search = document.getElementsByClassName('site_search')[0];
let search_submit = search.getElementsByClassName('search')[0];
let search_input = search.getElementsByTagName('input')[0];

search_submit.addEventListener('click', function(){
    search_input.focus();
    search_input.value = '';
});












