const express = require("express");
const axios = require("axios"); // const Axios
const { getJson } = require("serpapi"); // const getJson correctly
const app = express();
const port = process.env.PORT || 3000;
const serpapiKey =
  "9c6fda6b0216b37384edd1429d85b3d10c9d616330d179d3ca4207a756477fb7";

app.use(express.json());

// CORS Middleware //
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.post("/upload-image", async (req, res) => {
  try {
    const { img } = req.body;
    if (!img) {
      return res.status(400).json({ error: "Image URL is required." });
    }

    // Call SerpAPI with the image URL
    const response = await getJson({
      engine: "google_lens",
      api_key: serpapiKey,
      url: img,
      location: "India",
    });

    // Send the response = SerpAPI
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/upc-code/:id", async (req, res) => {
  const { id } = req.params;
  const config = {
    headers: {
      Authorization: "Bearer THISISALIVEDEMOAPIKEY19651D54X47",
    },
  };

  try {
    const { data } = await axios.get(
     ` https://api.upcitemdb.com/prod/trial/lookup?upc=${id}`,
      // https://api.barcodelookup.com/v3/products?barcode=${id}&formatted=y&key=vs17361gw172u9f4uitgnw2qeltequ
      // config
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
app.get("/",(req,res)=>{
  res.status(200).json({message:"Active"})
})
// Corrected method for starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
