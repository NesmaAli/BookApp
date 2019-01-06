var exceltojson = require("xlsx-to-json-lc");
exceltojson({
    input: "../Book-services/books.xlsx",
    output: "../Book-services/utilites/authors.json",
    sheet: "authors",
    lowerCaseHeaders: true
}, function(err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);

    }
});
exceltojson({
    input: "../Book-services/books.xlsx",
    output: "../Book-services/utilites/books.json",
    sheet: "books",
    lowerCaseHeaders: true
}, function(err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);

    }
});