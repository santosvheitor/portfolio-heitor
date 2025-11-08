const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = form.querySelector("input[type='text']").value;
  alert(`Olá, ${nome}! Formulário enviado com sucesso 😄`);
});
