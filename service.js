let {
    fetchAuthorData
} = require('../Book-services/utilites/getData');

var Request = require("request");



const promise = new Promise((resolve, reject) => {
    const result = fetchAuthorData();

    if (!result) {
        return reject('result was not ok');
    }
    resolve(result);

});
promise
    .then((result) => {
        result.forEach(element => {
            Request.post({
                "headers": { "content-type": "application/json" },
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
                    return console.dir(error);
                }
                console.dir(JSON.parse(body));
            });

        });
    })
    .catch((err) => console.error(`something went wrong: ${err}`))