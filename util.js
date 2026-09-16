export function validarNome(nome) {
    return nome.trim() !== "";
}


export function normalizarNome(nome) {
    return nome.trim();
}


export function criarCliente(nome) {
    return {
        nome: normalizarNome(nome)
    };
}


export function criarUrl(API_URL, id = null) {

    if (id) {
        return `${API_URL}/${id}`;
    }

    return API_URL;
}