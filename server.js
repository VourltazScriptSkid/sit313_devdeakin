const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/', (req, res) => {
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;
    console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us22.api.mailchimp.com/3.0/lists/bb43461c20";
    const options = {
        method: "POST",
        auth: "anystring:e3929bd844a9efe8ebc97d4180321cee-us22"
    };

    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });

        response.on("end", () => {
            if (response.statusCode === 200) {
                res.send("Successfully subscribed!");
            } else {
                res.send("There was an error with subscribing. Please try again.");
            }
        });
    });

    request.on("error", (error) => {
        console.error(error);
        res.send("There was an error with your request.");
    });

    request.write(jsonData);
    request.end();
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
