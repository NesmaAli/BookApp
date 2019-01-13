let {
    fetchbookData
} = require("../utilites/getData");
var Request = require("request");

function getcategory(element) {
    return new Promise((async(resolve, reject) => {

        await Request.post({
            "headers": {
                "content-type": "application/json"
            },
            "url": "http://localhost:3000/categories/category",
            "body": JSON.stringify({
                name: element.category,
            })
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }

            var Response = (JSON.parse(body));

            var catid = Response.message;
            resolve(catid);

        });
    }));

}

function getauthor(element) {
    return new Promise((async(resolve, reject) => {

        await Request.post({
            "headers": {
                "content-type": "application/json"
            },
            "url": "http://localhost:3000/authors/author",
            "body": JSON.stringify({

                name: element.author,


            })
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            var Response = (JSON.parse(body));

            var authorId = Response.message;
            resolve(authorId);
        })
    }));

}

function addbook(authorId, catid) {
    return new Promise((async(resolve, reject) => {

        await Request.post({
            "headers": {
                "content-type": "application/json"
            },
            "url": "http://localhost:3000/books/addBooks",
            "body": JSON.stringify({
                book: {
                    title: element.title,
                    author: authorId.toString(),
                    description: element.description,
                    isbn: element.isbn,
                    publishYear: element.publishYear,
                    pagesNumber: element.pagesNumber,
                    image: element.image,
                    category: catid.toString()

                }


            })

        }, (error, response, body) => {
            if (error) {
                reject(error);
            }

            var Response = (JSON.parse(body));

            var result = Response.message;


            resolve(result);
        })
    }));

}

async function handleAddingbook() {
    const allData = await fetchbookData();
    var adding_result = new Array();
    for (i = 0; i < allData.length; i++) {
        element = allData[i];
        try {

            let catid = await getcategory(element);

            let authorId = await getauthor(element);

            var result_addbook = await addbook(authorId, catid);


            adding_result[i] = result_addbook;

        } catch (err) {
            console.log(err);
        }
    }
    console.log(adding_result);
    return adding_result;
}
console.log(handleAddingbook());
module.exports = {
    handleAddingbook
}