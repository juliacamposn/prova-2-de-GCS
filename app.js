document.addEventListener('DOMContentLoaded', () => {
  const listaLivrosDiv = document.getElementById('lista-livros');
  const contadorLivros = document.getElementById('contador-livros'); 

  let livros = [
    { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", status: "Lido" },
    { id: 2, titulo: "1984", autor: "George Orwell", status: "Para Ler" },
    { id: 3, titulo: "Café com Deus Pai", autor: "Júnior Rostirola", status: "Lendo"}
  ];
  let proximoId = 4;

  function renderizarLivros(livrosParaRenderizar = livros) {
    listaLivrosDiv.innerHTML = ''; 
    livrosParaRenderizar.forEach(livro => {
      const divLivro = document.createElement('div');
      divLivro.classList.add('livro');
      
      divLivro.innerHTML = `
        <span><strong>${livro.titulo}</strong> - ${livro.autor} <em>(${livro.status})</em></span>
        <button class="botao-remover">Remover</button>
        <button class="botao-alterar-status">Alterar Status</button>
        <button class="botao-editar">Editar</button>
      `;
      
      divLivro.querySelector('.botao-remover').addEventListener('click', () => removerLivro(livro.id));
      divLivro.querySelector('.botao-alterar-status').addEventListener('click', () => alterarStatus(livro.id));
      divLivro.querySelector('.botao-editar').addEventListener('click', () => editarLivro(livro.id));
      
      listaLivrosDiv.appendChild(divLivro);
    });
    contadorLivros.textContent = `Total de livros cadastrados: ${livrosParaRenderizar.length}`;
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
    }
    renderizarLivros();
  }

  const formFiltroLivros = document.getElementById('form-filtro-livros');
  if (formFiltroLivros) {
    formFiltroLivros.addEventListener('submit', function(event) {
      event.preventDefault();
      const titulo = document.getElementById('filtro-titulo').value.trim();
      const autor = document.getElementById('filtro-autor').value.trim();
      const status = document.getElementById('filtro-status').value;
      filtrarLivros(titulo, autor, status);
    });
  }

  function filtrarLivros(titulo, autor, status) {
    let livrosFiltrados
    if (titulo) {
      livrosFiltrados = livros.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }
    if (autor) {
      livrosFiltrados = livros.filter(livro => livro.autor.toLowerCase().includes(autor.toLowerCase()));
    }
    if (status)
      livrosFiltrados = livros.filter(livro => livro.status === status);
    renderizarLivros(livrosFiltrados);
  }

  function alterarStatus(idLivro) {
    const livroParaAlterarStatus = livros.find(livro => livro.id === idLivro);
    if (!livroParaAlterarStatus) return;

    if (livroParaAlterarStatus.status === "Adicionado Recentemente") {
      livroParaAlterarStatus.status = "Lido";
    }
    else if (livroParaAlterarStatus.status === "Lido") {
      livroParaAlterarStatus.status = "Para Ler";
    }
    else if (livroParaAlterarStatus.status === "Para Ler") {
      livroParaAlterarStatus.status = "Lendo"
    }
    else {
      livroParaAlterarStatus.status = "Adicionado Recentemente"
    }
    console.log(livros)
    renderizarLivros();
  }

    function editarLivro(idLivro) {
        const livroParaEditar = livros.find(livro => livro.id === idLivro);
        if (!livroParaEditar) return;
        const novoTitulo = prompt("Digite o novo título:", livroParaEditar.titulo);
        const novoAutor = prompt("Digite o novo autor:", livroParaEditar.autor);
        if (novoTitulo && novoAutor) {
            livroParaEditar.titulo = novoTitulo;
            livroParaEditar.autor = novoAutor;
            renderizarLivros();
        }
    }


  renderizarLivros();
});