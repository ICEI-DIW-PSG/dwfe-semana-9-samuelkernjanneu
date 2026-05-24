document.addEventListener("DOMContentLoaded", () => {

  const data = {
    produtos: [
      {
        id: 1,
        nome: "Smartphone Galaxy S23",
        preco: 3499.90,
        categoria: "Celulares",
        imagem: "imagens/samsung.jpg",
        descricao: "Smartphone Samsung top",
        emEstoque: true
      },
      {
        id: 2,
        nome: "Notebook Dell Inspiron 15",
        preco: 4599.00,
        categoria: "Notebooks",
        imagem: "imagens/dell.jpg",
        descricao: "Notebook potente",
        emEstoque: false
      },
      {
        id: 3,
        nome: "iPhone 14",
        preco: 6000,
        categoria: "Celulares",
        imagem: "imagens/iphone.jpg",
        descricao: "iPhone Apple",
        emEstoque: true
      },
      {
        id: 4,
        nome: "MacBook Air",
        preco: 8000,
        categoria: "Notebooks",
        imagem: "imagens/macbook.jpg",
        descricao: "Notebook Apple",
        emEstoque: true
      },
      {
        id: 5,
        nome: "Mouse Gamer",
        preco: 200,
        categoria: "Acessórios",
        imagem: "imagens/mouse gamer.jpg",
        descricao: "Mouse RGB",
        emEstoque: true
      },
      {
        id: 6,
        nome: "Teclado Mecânico",
        preco: 350,
        categoria: "Acessórios",
        imagem: "imagens/teclado mecanico.jpg",
        descricao: "Teclado gamer",
        emEstoque: true
      },
      {
        id: 7,
        nome: "PlayStation 5",
        preco: 4500,
        categoria: "Games",
        imagem: "imagens/play5.jpg",
        descricao: "Console Sony",
        emEstoque: false
      },
      {
        id: 8,
        nome: "Xbox Series X",
        preco: 4200,
        categoria: "Games",
        imagem: "imagens/xbox.jpg",
        descricao: "Console Microsoft",
        emEstoque: true
      }
    ]
  };

  const productList = document.getElementById("product-list");
  const productDetails = document.getElementById("product-details");
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");
  const btnRender = document.getElementById("btnRender");

  function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
  }

  function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.style.background = "#f9f9f9";
    card.style.padding = "10px";
    card.style.margin = "10px";
    card.style.borderRadius = "8px";

    card.innerHTML = `
      <img src="${produto.imagem}" width="150">
      <h3>${produto.nome}</h3>
      <p>${formatPrice(produto.preco)}</p>
      <p>${produto.categoria}</p>
      <button class="btn-details">Ver detalhes</button>
      <button class="btn-highlight">Destacar</button>
    `;

    card.querySelector(".btn-details").addEventListener("click", () => {
      showProductDetails(produto);
    });

    card.querySelector(".btn-highlight").addEventListener("click", () => {
      card.classList.toggle("highlight");
    });

    return card;
  }

  function renderProducts(produtos) {
    productList.innerHTML = "";

    if (produtos.length === 0) {
      productList.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }

    produtos.forEach(prod => {
      const card = createProductCard(prod);
      productList.appendChild(card);
    });
  }

  function renderCategories() {
    const categorias = ["Todas"];

    data.produtos.forEach(p => {
      if (!categorias.includes(p.categoria)) {
        categorias.push(p.categoria);
      }
    });

    categorySelect.innerHTML = "";

    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }

  function showProductDetails(produto) {
    productDetails.innerHTML = `
      <h2>${produto.nome}</h2>
      <img src="${produto.imagem}" width="200">
      <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
      <p><strong>Categoria:</strong> ${produto.categoria}</p>
      <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
      <p>${produto.descricao}</p>
    `;
  }

  function filterProducts() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    return data.produtos.filter(p => {
      const matchNome = p.nome.toLowerCase().includes(texto);
      const matchCategoria = categoria === "Todas" || p.categoria === categoria;
      return matchNome && matchCategoria;
    });
  }

  searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
  });

  categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
  });

  btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
  });

  renderCategories();
  renderProducts(data.produtos);

  console.log("IDs dos produtos:");

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  console.log(card.dataset.id);
});
});