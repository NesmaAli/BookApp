let {
    fetchbookData
} = require("../Book-services/utilites/getData");
var Request = require("request");

function getcategory(element) {
    return new Promise((async (resolve, reject) => {

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
    return new Promise((async (resolve, reject) => {
        
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
                reject (error);
            }
            var Response = (JSON.parse(body));
            var authorId = Response.message;
            resolve(authorId);
        })
    }));

}
function addbook(authorId,catid) {
    return new Promise((async (resolve, reject) => {
        
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
                reject (error);
            }
            
            var Response = (JSON.parse(body));
            var result = Response.message;


            resolve(result);
        })
    }));

}


(async function () {

        const allData = await fetchbookData();
            for(i=0;i<allData.length;i++) {
                     element=allData[i];
                    try {
                        
                        let catid = await getcategory(element);
                        console.log("cat " + catid);
                        let authorId = await getauthor(element);
                        console.log("auth " + authorId);
                        var result =await addbook(authorId,catid)
                        


                        console.log("result"+result);
                        
                    } catch (err) {
                        console.log(err);
                    }
        }
            })();
                