let {
    fetchbookData
} = require("../utilites/getData");
var Request = require("request");

function addcategory(element) {
    return new Promise((async(resolve, reject) => {

        await Request.post({
            "headers": {
                "content-type": "application/json"
            },
            "url": "http://localhost:3000/categories/addcategory",
            "body": JSON.stringify({
                category: {
                    name: element.category,

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

async function categoryService() {
    const allData = await fetchbookData();
    var result = new Array();
    for (i = 0; i < allData.length; i++) {
        element = allData[i];
        try {

            var addedResult = await addcategory(element);
            result[i] = addedResult.message;


        } catch (err) {
            console.log(err);
        }
    }
    return result;
}
//categoryService();

module.exports = { categoryService };