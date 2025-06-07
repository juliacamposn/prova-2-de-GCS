document.addEventListener('DOMContentLoaded', () => {
    const listaLivrosDiv = document.getElementById('lista-livros');

    let livros = [
        { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", status: "Lido" },
        { id: 2, titulo: "1984", autor: "George Orwell", status: "Para Ler" }
    ];
    let proximoId = 3;

    function renderizarLivros() {
        listaLivrosDiv.innerHTML = ''; 
        livros.forEach(livro => {
            const divLivro = document.createElement('div');
            divLivro.classList.add('livro');
            
            divLivro.innerHTML = `
                <span><strong>${livro.titulo}</strong> - ${livro.autor} <em>(${livro.status})</em></span>
                <button class="botao-remover">Remover</button>
            `;
            
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
                livros.push({ id: proximoId++, titulo, autor, status: "Adicionado Recentemente" });
                renderizarLivros();
                event.target.reset(); 
                alert('Livro adicionado (simulação)!');
            }
        });
    }

    function removerLivro(idLivro) {
      const confirmar = confirm("Tem certeza que deseja excluir esse livro?")
      if (confirmar) {
        livros = livros.filter(livro => livro.id !== idLivro);
        renderizarLivros();
      }
    }

    renderizarLivros();
});