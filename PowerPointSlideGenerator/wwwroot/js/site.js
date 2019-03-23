// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Combines the contents of the Input and the textarea (editable div).
// Converts contents of the textarea to an html element so the bold tags can be found
// via jquery selector.
function _getSearchKeywords() {
    let title = $('#slideTitle').val();
    let body = $('#slideBody').html();
    let el = $('<div></div>');
    el.html(body)
    // Formating search keywords. Grabs all bold text, create an array, map through array to extract the text, join the array, replace whitespace with '+'.
    body = $('b', el).toArray()
        .map(x => x.innerHTML)
        .join().trim()
        .replace(' ', '+');
    title = title.trim().replace(' ', '+');
    // branching for keyword out put.
    let results;
    if (body) {
        results = `${title}+${body}`;
    } else {
        results = `${title}`;
    }
    console.log(results);
    return results;
}

// True turns the searching component on, false turns it off.
function isLoading(bool) {
    if (bool) {
        $('#loadingIndicator').addClass('loading-indicator--active');
    } else {
        $('#loadingIndicator').removeClass('loading-indicator--active');
    }
}

//AJAX call to get images for the multiple selection. isLoading() Controls the searching indicator.
function getImages() {
    const keywords = _getSearchKeywords();
    isLoading(true);
    $.ajax({
        type: "GET",
        url: 'Home/GetImages',
        data: { "keywords": keywords },
        success: (data) => {
            const SearchResults = JSON.parse(data);
            imageResultsViewModel.imageSearchResults(SearchResults.value);
            isLoading(false);
        },
        failure: () => {
            isLoading(false);
            console.log('get request failed')
        }
    })
}

//  Toggles the hidden checkbox for a search item on click. Toggles the the "active" modifier on the search-result__img-container element
function imageSelect(e) {
    const el = e.currentTarget;
    const input = $('input', el);
    if (input.attr('checked') == true) {
        input.attr('checked', false);
    } else {
        input.attr('checked', true);
    };
    $('li', el).prevObject.toggleClass('search-results__img-container--active');
}



$(document).ready(() => {

    // On page load, the div with the 'rich-textrea' has the contentEditable attribute 
    // applied. Text-area will not allow formatting like bold or italics.
    $('.rich-textarea').each(function () {
        this.contentEditable = true;
    });

    ko.applyBindings(imageResultsViewModel);

    // Searches half a second after a change in one of the textboxs. resets timer
    // on keyup.
    let imageQueryTimer = null;
    $('#slideTitle').keyup(() => {
        clearTimeout(imageQueryTimer);
        imageQueryTimer = setTimeout(getImages, 500);
    });

    $('#slideBody').keyup(function () {
        clearTimeout(imageQueryTimer);
        imageQueryTimer = setTimeout(getImages, 500, event);
    });
});

//=========================================================================================
// Knockout.js ViewModel
//=========================================================================================

let imageResultsViewModel = {
    imageSearchResults: ko.observableArray([])
}