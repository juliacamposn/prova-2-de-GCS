document.addEventListener('DOMContentLoaded', () => {
    const listaLivrosDiv = document.getElementById('lista-livros');

    //dados ficticios
    let livros = [
        { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", status: "Lido" },
        { titulo: "1984", autor: "George Orwell", status: "Para Ler" }
    ];

    function renderizarLivros() {
        listaLivrosDiv.innerHTML = ''; 
        livros.forEach(livro => {
            const divLivro = document.createElement('div');
            divLivro.classList.add('livro');
            
            divLivro.innerHTML = `
                <span><strong>${livro.titulo}</strong> - ${livro.autor} <em>(${livro.status})</em></span>
                <button class="botao-remover">Remover</button>
            `;
            
            // Adiciona o evento de clique ao botão criado
            divLivro.querySelector('.botao-remover').addEventListener('click', () => removerLivro(livro.id));
            
            listaLivrosDiv.appendChild(divLivro);
        });
    }

    const formAdicionarLivro = document.getElementById('form-adicionar-livro');
    if (formAdicionarLivro) {
        formAdicionarLivro.addEventListener('submit', (event) => {
            event.preventDefault();
            const titulo = event.target.titulo.value;
            const autor = event.target.autor.value;
            if (titulo && autor) {
                livros.push({ titulo, autor, status: "Adicionado Recentemente" });
                renderizarLivros();
                event.target.reset(); // Limpa o formulário
                alert('Livro adicionado (simulação)!');
            }
        });
    }
    renderizarLivros();
});