let {
    fetchAuthorData,

} = require('../utilites/getData');

var Request = require("request");

function addauthor(element) {
    return new Promise((async(resolve, reject) => {

        await Request.post({
            "headers": {
                "content-type": "application/json"
            },
            "url": "http://localhost:3000/authors/addAuthor",
            "body": JSON.stringify({
                author: {
                    name: element.author_name,
                    bio: element.author_bio,
                    jobTitle: element.author_jobtitle
                }
            })
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            var Response = (JSON.parse(body));

            resolve(Response);

        });
    }));

}

async function authorService() {
    const allData = await fetchAuthorData();
    var result = new Array();
    for (i = 0; i < allData.length; i++) {
        element = allData[i];
        try {

            var addedResult = await addauthor(element);
            result[i] = addedResult.message;


        } catch (err) {
            console.log(err);
        }
    }

    return result;
}
//console.log(authorService());


module.exports = { authorService };