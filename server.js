const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/', (req, res)=>{
    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const Email = req.body.Email
    console.log(FirstName, LastName, Email)
    const apiKey   = "accec4831132ca00e1ff391a78a311fa-us22"
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
