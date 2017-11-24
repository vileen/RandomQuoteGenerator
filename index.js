var currentAuthor = '', currentQuote = '',
    $autor = $("#quoteAuthor"), $text = $("#quoteTextContainer"),
    $button = $('#newQuoteButton'), $twitter = $('#twitterLink'), $body = $('body');
var colorPalette = [
    '#AD1457', '#EF6C00', '#42A5F5', '#81C784', '#BA68C8', '#6D4C41', '#546E7A'
]

var switchQuote = function() {
    var color = colorPalette[Math.floor((Math.random() * colorPalette.length))];
    getQuote().then(function(ret) {
        currentAuthor = ret.author;
        currentQuote = ret.quote;

        $twitter.attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor))

        $autor.animate({
            opacity: 0
        }, 500, function() {
            $autor.animate({
                opacity: 1
            }, 500)
            $autor.text("- "+ currentAuthor);
        })

        $text.animate({
            opacity: 0
        }, 500, function() {
            $text.animate({
                opacity: 1
            }, 500)
            $text.html('<span id="quoteText">' + currentQuote + '</span>');
        })

        $button.animate({
            backgroundColor: color
        }, 1000)
        $body.animate({
            backgroundColor: color,
            color: color
        }, 1000)
        $twitter.animate({
            backgroundColor: color
        }, 1000)
    })
}

var getQuote = function() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            headers: {
                "X-Mashape-Key": "OkKJIFXWpjmshRUOYsKj2oUralC1p1ZDVOwjsn6rZ5JsVLVHGh",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
            success: function(response) {
                resolve(response);
            },
            error: function(error) {
                resolve(error);
            }
        });
    });
}

$(document).ready(function() {
    switchQuote();

    $('#newQuoteButton').on('click', _.throttle(function() {
        switchQuote();
    }, 3000));
})