// FORM SUBMISSION
const form = document.querySelector("#contact-form");
const statusMsg = document.querySelector("#form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.querySelector("input[name='name']").value.trim();
  const email = form.querySelector("input[name='email']").value.trim();
  const message = form.querySelector("textarea[name='message']").value.trim();

  if (!name || !email || !message) {
    statusMsg.textContent = "Please fill in all fields.";
    statusMsg.style.color = "red";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    statusMsg.textContent = data.message;
    statusMsg.style.color = "green";
    form.reset();

    setTimeout(() => { statusMsg.textContent = ""; }, 4000);

  } catch (err) {
    console.error(err);
    statusMsg.textContent = "Error sending message!";
    statusMsg.style.color = "red";
  }
});

// FADE-IN ON SCROLL
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

// FUNÇÃO PARA CARREGAR PROJETOS DINÂMICOS
async function loadProjects() {
  const container = document.querySelector(".project-cards");
  try {
    const res = await fetch("http://localhost:3000/projects");
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data = await res.json();

    container.innerHTML = ""; // limpa conteúdo atual

    data.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("project-card", "fade-in");

      // Card inteiro clicável
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank" class="project-btn">View Project</a>
      `;

      // Abrir link ao clicar em qualquer parte do card
      card.addEventListener("click", (e) => {
        // Evitar conflito se o botão "View Project" for clicado
        if (e.target.tagName !== "A") {
          window.open(project.link, "_blank");
        }
      });

      container.appendChild(card);

      // aplicar fade-in observer
      appearOnScroll.observe(card);
    });

  } catch (err) {
    console.error("Error loading projects:", err);
    container.innerHTML = "<p>Failed to load projects.</p>";
  }
}

// Chamar a função assim que a página carregar
window.addEventListener("DOMContentLoaded", loadProjects);

// DARK MODE
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
