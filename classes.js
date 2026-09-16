import {
    validarNome,
    criarCliente,
    criarUrl
} from "./util.js";


export class CadastrarCliente {

    constructor(API_URL, listarClientes) {
        this.API_URL = API_URL;
        this.listarClientes = listarClientes;
    }

    async cadastrarCliente() {

        const input = document.getElementById("nomeCliente");
        const nome = input.value;

        if (!validarNome(nome)) {
            alert("Digite um nome");
            return;
        }

        try {

            const resposta = await fetch(
                criarUrl(this.API_URL),
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(
                        criarCliente(nome)
                    )
                }
            );

            if (!resposta.ok) {
                throw new Error(
                    `Erro HTTP: ${resposta.status}`
                );
            }

            input.value = "";

            await this.listarClientes.listarClientes();

        } catch (erro) {

            console.error(
                "Erro ao cadastrar:",
                erro
            );

            alert(
                "Não foi possível cadastrar o cliente."
            );
        }
    }
}


export class ListarClientes {

    constructor(API_URL) {
        this.API_URL = API_URL;
    }

    async listarClientes() {

        try {

            const resposta = await fetch(
                criarUrl(this.API_URL)
            );

            if (!resposta.ok) {
                throw new Error(
                    `Erro HTTP: ${resposta.status}`
                );
            }

            const clientes = await resposta.json();

            const lista =
                document.getElementById("listaClientes");

            lista.innerHTML = "";

            clientes.forEach(cliente => {

                const li =
                    document.createElement("li");

                li.innerHTML = `
                    <input
                        type="checkbox"
                        value="${cliente._id}"
                    >
                    ${cliente.nome}
                `;

                lista.appendChild(li);
            });

        } catch (erro) {

            console.error(
                "Erro ao listar:",
                erro
            );
        }
    }
}


export class ExcluirClientes {

    constructor(API_URL, listarClientes) {
        this.API_URL = API_URL;
        this.listarClientes = listarClientes;
    }

    async excluirClientes() {

        const checkboxes =
            document.querySelectorAll(
                "#listaClientes input[type='checkbox']:checked"
            );

        if (checkboxes.length === 0) {
            alert("Selecione pelo menos um cliente.");
            return;
        }

        try {

            for (const checkbox of checkboxes) {

                const id = checkbox.value;

                const resposta = await fetch(
                    criarUrl(this.API_URL, id),
                    {
                        method: "DELETE"
                    }
                );

                if (!resposta.ok) {
                    throw new Error(
                        `Erro HTTP: ${resposta.status}`
                    );
                }
            }

            await this.listarClientes.listarClientes();

        } catch (erro) {

            console.error(
                "Erro ao excluir:",
                erro
            );
        }
    }
}