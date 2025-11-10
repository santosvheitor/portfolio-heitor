const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Message received:", req.body);
  res.json({ message: `Thanks, ${name}! Your message has been received.` });
});

// Projetos de exemplo com links
const projects = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio built with HTML, CSS, and JavaScript.",
    image: "https://via.placeholder.com/300x180",
    link: "./index.html" // Link relativo para o próprio portfólio
  },
  {
    title: "Task Manager App",
    description: "A simple task manager made with React and local storage.",
    image: "https://via.placeholder.com/300x180",
    link: "#"
  },
  {
    title: "Weather Dashboard",
    description: "A weather app that shows real-time temperature, wind, and local time by city.",
    image: "https://via.placeholder.com/300x180",
    link: "./WeatherDashboard/frontend/index.html" // Caminho relativo dentro do seu repositório
  }
];

// Endpoint para retornar os projetos
app.get("/projects", (req, res) => {
  res.json(projects);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
