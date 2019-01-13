var { authorService } = require("./Services/author");
var { categoryService } = require("./Services/category");
var { handleAddingbook } = require("./Services/book");

async function insertBooks() {
    var authorResult = {
        sucssesAuthor: 0,
        duplicateAuthor: 0,
        failedAuthor: 0,
        validerror: 0
    };
    var categoryResult = {
        sucssescategory: 0,
        duplicatecategory: 0,
        failedcategory: 0,
        validerror: 0
    };
    var bookResult = {
        sucssesbook: 0,
        duplicatebook: 0,
        failedbook: 0,
        validerror: 0,
        nocategory: 0,
        noauthor: 0

    }
    var response_adding_allbooks = {
        authorResult,
        categoryResult,
        bookResult
    }

    try {
        var author = await authorService();
        for (i = 0; i < author.length; i++) {
            switch (author[i]) {
                case "author added is failed ":
                    authorResult.failedAuthor = authorResult.failedAuthor + 1;

                    break;
                case "exist author with the same name it's duplicate":
                    authorResult.duplicateAuthor = authorResult.duplicateAuthor + 1;
                    break;
                case "added sucessfully":
                    authorResult.sucssesAuthor = authorResult.sucssesAuthor + 1;
                    break;
                default:
                    authorResult.validerror = authorResult.validerror + 1;
            }

        }
        response_adding_allbooks.authorResult = authorResult;



        var category = await categoryService();

        for (i = 0; i < category.length; i++) {
            switch (category[i]) {
                case "category added is failed ":
                    categoryResult.failedcategory = categoryResult.failedcategory + 1;

                    break;
                case "exist category with the same name it's duplicate":
                    categoryResult.duplicatecategory = categoryResult.duplicatecategory + 1;
                    break;
                case "added sucessfully":
                    categoryResult.sucssescategory = categoryResult.sucssescategory + 1;
                    break;
                default:
                    categoryResult.validerror = categoryResult.validerror + 1;
            }

        }
        response_adding_allbooks.categoryResult = categoryResult;



        var book = await handleAddingbook();

        for (i = 0; i < book.length; i++) {
            // console.log(book[i]);
            switch (book[i]) {

                case "book added is failed ":
                    bookResult.failedbook = bookResult.failedbook + 1;

                    break;
                case "exist book with the same name it\'s duplicate":
                    bookResult.duplicatebook = bookResult.duplicatebook + 1;
                    break;
                case " book is added":
                    bookResult.sucssesbook = bookResult.sucssesbook + 1;
                    break;
                case "you must add exist category":
                    bookResult.nocategory = bookResult.nocategory + 1;
                    break;
                case "you must add exist author":

                    bookResult.noauthor = bookResult.noauthor + 1;
                    break;
                case "validation error":
                    bookResult.validerror = bookResult.validerror + 1;
                    break;

            }

        }
        response_adding_allbooks.bookResult = bookResult;
        console.log(response_adding_allbooks)

        return response_adding_allbooks;
    } catch (err) {
        console.log(err);
    }
}

insertBooks();
module.exports = {
    insertBooks
};