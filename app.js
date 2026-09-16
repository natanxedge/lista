import {
    CadastrarCliente,
    ListarClientes,
    ExcluirClientes
} from "./classes.js";


const API_URL =
    "https://crudcrud.com/api/5f96cc61ca404cafaa3daad4c90e243e/clientes";


const listarClientes = new ListarClientes(API_URL);

const cadastrarCliente = new CadastrarCliente(
    API_URL,
    listarClientes
);

const excluirClientes = new ExcluirClientes(
    API_URL,
    listarClientes
);


document
    .getElementById("btnCadastrar")
    .addEventListener("click", () => {
        cadastrarCliente.cadastrarCliente();
    });


document
    .getElementById("btnListar")
    .addEventListener("click", () => {
        listarClientes.listarClientes();
    });


document
    .getElementById("btnExcluir")
    .addEventListener("click", () => {
        excluirClientes.excluirClientes();
    });


listarClientes.listarClientes();