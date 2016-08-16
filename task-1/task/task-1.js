/* globals document, window, console */

function solve() {
    return function(selector, suggestionsArray) {

        var btnAdd = document.getElementsByClassName('btn-add');
        var inputText = document.getElementsByClassName('tb-pattern');
        var suggestedList = document.getElementsByClassName('suggestions-list');
        var suggestion = document.getElementsByClassName('suggestion');
        // suggestion.style.display = 'none';

        if (suggestionsArray) {


            var i,
                len;
            for (i = 0, len = suggestionsArray.length; i < len; i += 1) {
                var isContain = false;
                var y,
                    leng;
                for (y = 0, leng = suggestion.length; y < leng; y += 1) {
                    if (suggestion[y].innerText.toLowerCase() === suggestionsArray[i].toLowerCase()) {
                        isContain = true;
                    }
                }

                if (!isContain) {
                    var newSuggestion = document.createElement('li');
                    var link = document.createElement('a');
                    link.innerText = suggestionsArray[i];
                    link.setAttribute('href', '#');
                    link.className = 'suggestion-link';
                    newSuggestion.appendChild(link);
                    newSuggestion.className = 'suggestion';
                    newSuggestion.style.display = 'none';
                    suggestedList[0].appendChild(newSuggestion);
                    suggestion = document.getElementsByClassName('suggestion');


                }
            }

        }


        btnAdd[0].addEventListener("click", function() {
            var isContain = false;
            suggestion = document.getElementsByClassName('suggestion');
            for (var element of suggestion) {
                if (element.innerText === inputText[0].value) {
                    isContain = true;
                }
            }
            // '<li class="suggestion"><a href="#" class="suggestion-link">' + inputText[0].value + '</a></li>'
            if (!isContain) {
                var newSuggestion = document.createElement('li');
                var link = document.createElement('a');
                link.innerText = inputText[0].value;
                link.setAttribute('href', '#');
                link.className = 'suggestion-link';
                newSuggestion.appendChild(link);
                newSuggestion.className = 'suggestion';
                newSuggestion.style.display = 'none';
                suggestedList[0].appendChild(newSuggestion);
            }

        });

        suggestedList[0].addEventListener('click', function(e) {
            if (e.target && e.target.nodeName == 'A') {
                inputText[0].value = e.target.innerText;

                var pattern = e.target.innerText.toLowerCase();
                var titles = suggestedList[0].querySelectorAll('.suggestion');
                var i,
                    len;

                for (i = 0, len = titles.length; i < len; i += 1) {
                    var isPatternFound = titles[i].innerText
                        .toLowerCase()
                        .indexOf(pattern) >= 0;
                    if (isPatternFound) {
                        titles[i].style.display = 'block';
                    } else {
                        titles[i].style.display = 'none';

                    }
                }

            }

        }, false);

        inputText[0].addEventListener('input', function(ev) {
            var pattern = this.value.toLowerCase();
            var titles = suggestedList[0].querySelectorAll('.suggestion');
            var i,
                len;

            for (i = 0, len = titles.length; i < len; i += 1) {
                var isPatternFound = titles[i].innerText
                    .toLowerCase()
                    .indexOf(pattern) >= 0;
                if (isPatternFound) {
                    titles[i].style.display = 'block';
                } else {
                    titles[i].style.display = 'none';

                }
            }

            if (!this.value) {
                for (i = 0, len = titles.length; i < len; i += 1) {
                    titles[i].style.display = 'none';
                }
            }
        });

        var suggestionCount = document.querySelectorAll('.suggestion').length;
        console.log(suggestionCount);

    };
}

module.exports = solve;