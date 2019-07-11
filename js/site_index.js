
/**
 * Initialise content on index.
 */
window.addEventListener("DOMContentLoaded", () => {
    site_header.style.width = convertPxTo(window.innerWidth, 'width') + 'vw';

    site_index.style.width = site_header.style.width;
    site_index.style.height = convertPxTo(window.innerHeight, 'height') + 'vh';

    // padding 10vw (144px) and 17vh (191.5px)
    index_cards.style.width = convertPxTo(window.innerWidth, 'width') + 'vw';
    index_cards.style.height = convertPxTo(window.innerHeight, 'height') + 'vh';

    listCharacters();
});

/**
 * Convert px to vw or vh according to width or height, respectively.
 * @param value
 * @param type
 * @returns {number}
 */
function convertPxTo(value, type) {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    if (type === 'width') {
        // px to vw
        return (100*value)/x;

    } else if (type === 'height') {
        // px to vh
        return (100*value)/y;
    }
}

/**
 * Convert vw or vh to px according to width or height, respectively.
 * @param value
 * @param type
 * @returns {number}
 */
function convertToPx(value, type) {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    if (type === 'width') {
        // vw to px
        return (x*value)/100;

    } else if (type === 'height') {
        // vh to px
        return (y*value)/100;
    }
}


