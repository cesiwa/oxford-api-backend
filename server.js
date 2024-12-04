const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/word/:word", async (req, res) => {
  const word = req.params.word;
  console.log(`Request received for word: ${word}`);
  const apiKey = "77b1949c33090aa1e7aadf68b6b7ea96";
  const appId = "f7411cb1";

  try {
    const response = await axios.get(
      `https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-us/${word}`,
      {
        headers: {
          app_id: appId,
          app_key: apiKey,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    ); // Hata mesajını logla
    res.status(500).send("Error fetching word data");
  }
});

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
