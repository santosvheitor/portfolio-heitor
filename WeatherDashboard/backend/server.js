const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Favoritos
let favorites = [];

// Endpoint para salvar cidade favorita
app.post("/favorites", (req, res) => {
  const { city } = req.body;
  if (!favorites.includes(city)) favorites.push(city);
  res.json({ favorites });
});

// Endpoint para listar favoritos
app.get("/favorites", (req, res) => {
  res.json(favorites);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
