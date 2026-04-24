const API_URL = "https://crudcrud.com/api/62bdcbdbab2d4359b71cc885a173bd8f/clientes";

async function cadastrarCliente() {
  const input = document.getElementById("nomeCliente");
  const nome = input.value.trim();

  if (!nome) {
    alert("Digite um nome");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    });

    input.value = "";
    listarClientes();
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
  }
}

async function listarClientes() {
  try {
    const res = await fetch(API_URL);
    const clientes = await res.json();

    const lista = document.getElementById("listaClientes");
    lista.innerHTML = "";

    clientes.forEach(cliente => {
      const li = document.createElement("li");

      li.innerHTML = `
        <input type="checkbox" value="${cliente._id}">
        ${cliente.nome}
      `;

      lista.appendChild(li);
    });

  } catch (erro) {
    console.error("Erro ao listar:", erro);
  }
}

async function excluirClientes() {
  const checkboxes = document.querySelectorAll("#listaClientes input[type='checkbox']:checked");

  try {
    for (let checkbox of checkboxes) {
      const id = checkbox.value;

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
    }

    listarClientes();

  } catch (erro) {
    console.error("Erro ao excluir:", erro);
  }
}