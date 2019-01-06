var fs = require('fs');
var fetchAuthorData = () => {
    try {
        var dataString = fs.readFileSync('../Book-services/utilites/authors.json');

        return JSON.parse(dataString);
    } catch (e) {
        return [];
    }
};
module.exports = {

    fetchAuthorData
}