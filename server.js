const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
var app = express();
var { insertBooks } = require('../Book-services/service')


app.use(bodyParser.json());
app.get('/books', async(req, res) => {
    var result = await insertBooks()

    if (!result) {
        return res.status(400).send();
    }

    return res.status(200).send(result);

});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
module.exports = { app };