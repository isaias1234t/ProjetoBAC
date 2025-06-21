const sidebar = document.getElementById("sidebar");
const cartCount = document.getElementById("cartCount");
const productList = document.getElementById("productList");
const categories = document.getElementById("categories");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let layoutGrid = true;
let cart = 0;
let cartProducts = [];

const products = [
  { name: "Maçã", price: 2.99, category: "Frutas", img: "https://minhasaude.proteste.org.br/wp-content/uploads/2024/03/beneficios-da-maca-scaled.jpg" },
  { name: "Banana", price: 1.99, category: "Frutas", img: "https://www.estadao.com.br/resizer/Gr_FvxQxx-tqImmW3VH0BR05PKk=/arc-anglerfish-arc2-prod-estadao/public/WSMYGGWRJBCEHKPS34LB2WQG4I.jpeg" },
  { name: "Presunto", price: 5.49, category: "Frios", img: "https://www.friella.com.br/images/category_product/large/cpa.jpg"},
  { name: "Queijo", price: 6.99, category: "Frios", img: "https://www.sabornamesa.com.br/media/k2/items/cache/4c5025fc27e21ebeebad07703ddb77e0_XL.jpg" },
  { name: "Pão francês", price: 0.50, category: "Padaria", img: "https://guiadacozinha.com.br/wp-content/uploads/2018/10/paofrancesfolhado.jpg" },
  { name: "Baguete", price: 3.20, category: "Padaria", img: "https://s2-oglobo.glbimg.com/qiz2IZxMvZCY7TUosHNGmbQsHKw=/0x0:1024x683/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/y/1/wnKl82Q12WKsURUGNkXg/baguete-italiana.jpeg" },
  { name: "Coca-Cola", price: 4.50, category: "Bebidas", img: "https://www.correiobraziliense.com.br/cbradar/wp-content/uploads/2025/06/coca-cola_1749146821312.jpg" },
  { name: "Água mineral", price: 1.20, category: "Bebidas", img: "https://static.escolakids.uol.com.br/2024/04/agua-mineral-sendo-despejada-em-um-copo-de-vidro.jpg" },
  { name: "Detergente", price: 2.50, category: "Limpeza", img: "https://s2-oglobo.glbimg.com/RuY6b6sf0nSUYU-7MMkgHea84nA=/0x0:1235x711/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/t/3/hdaVtMTqiMGaq5ig2drA/ype.jpg" },
  { name: "Sabão em pó", price: 8.99, category: "Limpeza", img: "https://www.omo.com/images/h0nadbhvm6m4/2vR8JzQe2kUYvHJMsIy0ME/fc4e90fca4b5d6a66524d1155f2ccc95/b21vLXNhYmFvLWVtLXBvLmpwZw/1200w-900h/sab%C3%A3o-em-p%C3%B3-omo.jpg" },
  { name: "Shampoo", price: 12.00, category: "Higiene", img: "https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dwb5bfc261/Produtos/501522-7891150019416-shampoo%20anticaspa%20clear%20men%20sports%20cristiano%20ronaldo%20limpeza%20profunda%20400ml-clear-5.jpg" },
  { name: "Pasta de dente", price: 3.50, category: "Higiene", img: "https://sorridents.com.br/business/wp-content/uploads/2010/04/pasta-de-dente.jpg" },
  { name: "Lâmina de barbear", price: 5.00, category: "Higiene", img: "https://reidacutelaria.vtexassets.com/arquivos/ids/192398/950460_2.jpg?v=638705526946700000" },
  { name: "Alface", price: 1.50, category: "Verduras", img: "https://organicosinbox.com.br/wp-content/uploads/2020/11/alface-crespa-organica.jpg" },
  { name: "Tomate", price: 3.00, category: "Verduras", img: "https://tomatesmallmann.com.br/wp-content/uploads/2022/03/MALL_img_BLOG_28mar2022.jpg" },
  { name: "Cenoura", price: 2.20, category: "Verduras", img: "https://www.infoescola.com/wp-content/uploads/2010/08/cenoura_250834906.jpg" },
  { name: "Leite", price: 4.00, category: "Bebidas", img: "https://forbes.com.br/wp-content/uploads/2023/05/agro_leite_31mai23_manusapon-kasosod_Guettyimages.jpg" },
  { name: "Cerveja", price: 5.50, category: "Bebidas", img: "https://cervejariaantuerpia.com.br/wp-content/uploads/2021/07/CERVEJA-SEM-%C3%81LCOOL.jpg" },
  { name: "Bolo", price: 7.00, category: "Padaria", img: "https://guiadacozinha.com.br/wp-content/uploads/2019/11/bolo-brigadeiro-confeitado.jpg" },
  { name: "Mortadela", price: 4.80, category: "Frios", img: "https://i.ytimg.com/vi/3Ab_3ohnpNk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCqB9uDpgMbMMdXz36sDx8XC2n52w" },
  { name: "Desinfetante", price: 6.00, category: "Limpeza", img: "https://www.crivialli.com.br/imagens/informacoes/desinfetante-clean-plus-01.webp" },
  { name: "Sabonete", price: 2.30, category: "Higiene", img: "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dwdbb0e84b/produto-joia/background/mobile/2830.jpg" },
  { name: "Abacaxi", price: 5.00, category: "Frutas", img: "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/GEUVV5EDH5FUVEQJ6YYTV3JERA.jpeg" },
  { name: "Desodorante", price: 8.50, category: "Higiene", img: "https://danacosmeticos.vtexassets.com/arquivos/ids/158060-800-auto?v=638803223195130000&width=800&height=auto&aspect=true" },
  { name: "Pão de forma", price: 4.20, category: "Padaria", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZPWX4GMCiCCxUpWXhkW-cuXhrJE-V6JryYTlJocG1QAu6mYL4KkywrOgzCqSBHbufzU&usqp=CAU" },
  { name: "Água sanitária", price: 3.10, category: "Limpeza", img: "https://girandosol.com.br/wp-content/uploads/2024/09/Banner_Agua-Sanitaria2.png" },
  { name: "Rabanete", price: 7.80, category: "Legumes", img: "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/o-rabanete-possui-poucas-calorias-5377501f06657.jpg" },
  { name: "Rúcula", price: 2.00, category: "Verduras", img: "https://tribunadejundiai.com.br/wp-content/uploads/2022/06/Descubra-quais-sao-os-beneficios-da-rucula-para-sua-saude.jpg" },
  { name: "Melancia", price: 7.50, category: "Frutas", img: "https://agroinsight.com.br/wp-content/uploads/2021/04/nutricao-e-fertirrigacao-da-melancia-blog.jpg" },
  { name: "Ricota", price: 6.20, category: "Frios", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0GetHkPLx0ICi3ZkvAQAZoZUE0WJy4KrggA&s" },
  { name: "Croissant", price: 3.80, category: "Padaria", img: "https://lirp.cdn-website.com/33406c6e/dms3rep/multi/opt/historia-do-croissant-1920w.jpg" },
  { name: "Suco de Laranja", price: 5.00, category: "Bebidas", img: "https://espaconatelie.com.br/wp-content/uploads/2024/09/suco-de-laranja-natural.jpg" },
  { name: "Amaciante", price: 7.30, category: "Limpeza", img: "https://edona.com.br/cdn/shop/files/amaciante-downy-concentrado-brisa-de-verao-500ml-202986.jpg?v=1741895345&width=1445" },
  { name: "Condicionador", price: 13.00, category: "Higiene", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKiWVTw1R6ps9p9Hl2M4Z2gyRUxqDiIukJw&s" },
  { name: "Escova de dentes", price: 4.00, category: "Higiene", img: "https://projetocolabora.com.br/wp-content/uploads/2021/08/20210820colgate.jpg" },
  { name: "Pepino", price: 2.10, category: "Verduras", img: "https://www.infoescola.com/wp-content/uploads/2010/08/pepino_769056490.jpg" },
  { name: "Refrigerante", price: 4.80, category: "Bebidas", img: "https://conteudo.imguol.com.br/c/entretenimento/ee/2023/02/13/refrigerante-com-limao-1676325630752_v2_450x450.jpg" },
  { name: "Pilhas AA (4 unid.)", price: 9.90, category: "Outros", img: "https://www.duracell.com.br/upload/sites/21/2019/07/Alcalinas_AA_1-1024x1024.jpg" },
  { name: "Fósforo (10 caixas)", price: 4.00, category: "Outros", img: "https://wx.mlcdn.com.br/ponzi/production/portaldalu/76722.jpg" },
  { name: "Vela de emergência (8 unid.)", price: 6.50, category: "Outros", img: "https://m.media-amazon.com/images/I/51kHgMuaRnL.jpg" },
  { name: "Isqueiro", price: 3.50, category: "Outros", img: "https://cdnm.westwing.com.br/glossary/uploads/br/2021/05/26211012/isqueiro-iStock.jpg" },
  { name: "Saco de lixo 30L (50 unid.)", price: 8.90, category: "Outros", img: "https://images.tcdn.com.br/img/img_prod/769811/saco_de_lixo_preto_reforcado_30_litros_1kg_349_1_3102f14318fdf3a94dafcbc7d556034e.png" },
  { name: "Rolo de papel alumínio 7,5m", price: 5.70, category: "Outros", img: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/06/04152033/GettyImages-2149815862.jpg" },
  { name: "Rolo de papel filme 15m", price: 7.20, category: "Outros", img: "https://image.freepik.com/fotos-gratis/rolo-de-filme-plastico-estiravel_105428-506.jpg" },
  { name: "Palito de dente (500 unid.)", price: 2.00, category: "Outros", img: "https://media.istockphoto.com/id/155310957/pt/foto/toothpicks.jpg?s=612x612&w=0&k=20&c=uk3D4Gcr-SlQgtMQEZas2cmQmzgglAV_ZKg9g5Ob9NA=" },
  { name: "Filtro de papel para café (103)", price: 3.80, category: "Outros", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGE6Hd9dO3tgiVX4BlugiBtrI3u1PbDVRB-g&s" },
  { name: "Esponja multiuso (3 unid.)", price: 3.90, category: "Outros", img: "https://cdn.awsli.com.br/600x1000/1709/1709002/produto/87685821/f89be20aa9.jpg" },
  { name: "Lâmpada LED 9W", price: 7.50, category: "Outros", img: "https://images.tcdn.com.br/img/img_prod/631306/lampada_led_a60_9w_bivolt_6500k_branco_frio_795_3_15b9f7fa159e2223254cf7d7fe0176b7.jpg" },
  { name: "Pano multiuso (5 unid.)", price: 4.20, category: "Outros", img: "https://cdn.awsli.com.br/2500x2500/2248/2248510/produto/180104915/pano-multiuso-nobre-pacote-com-5-unidades-30x50-cm-5-1-0tv5g15jlf.jpg" },
  { name: "Pregador de roupa (24 unid.)", price: 5.60, category: "Outros", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_qauoqMDXgEqE2IlVvQwzpa3A9WfKXJubGg&s" },
  { name: "Fita Isolante", price: 19.90, category: "Outros", img: "https://www.galaxcommerce.com.br/sistema/upload/126/produtos/fita-isolante-pvc-anti-chama-05mt-foxlux_2023-04-24_17-32-35_0_539.jpg" },
  { name: "Extensão elétrica 3 tomadas", price: 14.00, category: "Outros", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwIYslsMrGm2ZFF05iuDrFouic8a3rQwKQXA&s" },
  { name: "Carregador USB", price: 29.90, category: "Outros", img: "https://cdn.awsli.com.br/600x450/2596/2596164/produto/229834131/fonte-carregador-usb-21a-com-cabo-micro-usb-embutido-0025ddea-e7bpceoy0x.jpg" },
];

function renderCartSidebar() {
  cartItems.innerHTML = "";
  if (cartProducts.length === 0) {
    cartItems.innerHTML = "<li style='padding:10px;'>Carrinho vazio.</li>";
    cartTotal.innerText = "Total: R$ 0,00";
    return;
  }
  let total = 0;
  cartProducts.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "10px";
    li.style.padding = "10px 0";
    li.style.borderBottom = "1px solid #eee";
    li.innerHTML = `
      <img src="${item.img}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;">
      <div style="flex:1;">
        <div>${item.name}</div>
        <div style="font-size:12px;color:#888;">R$ ${item.price.toFixed(2)}</div>
      </div>
      <button data-index="${idx}" class="removeCartItem" style="background:none;border:none;color:red;font-size:18px;">&times;</button>
    `;
    cartItems.appendChild(li);
  });
  cartTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
}

function openCartSidebar() {
  cartSidebar.style.display = "block";
  renderCartSidebar();
}

function closeCartSidebar() {
  cartSidebar.style.display = "none";
}

function addToCart(index) {
  const product = products[index];
  cartProducts.push(product);
  cart = cartProducts.length;
  cartCount.innerText = `🛒 ${cart}`;
  renderCartSidebar();
}

cartSidebar.addEventListener("click", (e) => {
  if (e.target.classList.contains("removeCartItem")) {
    const idx = parseInt(e.target.getAttribute("data-index"));
    cartProducts.splice(idx, 1);
    cart = cartProducts.length;
    cartCount.innerText = `🛒 ${cart}`;
    renderCartSidebar();
  }
  if (e.target.textContent === "✖") {
    closeCartSidebar();
  }
  if (e.target.classList.contains("btn-success")) {
    finalizarCompra();
  }
});

function toggleCart() {
  if (cartSidebar.style.display === "block") {
    closeCartSidebar();
  } else {
    openCartSidebar();
  }
}

function finalizarCompra() {
  if (cartProducts.length === 0) {
    alert("O carrinho está vazio!");
    return;
  }
  alert("Compra finalizada! Obrigado por comprar conosco.");
  cartProducts = [];
  cart = 0;
  cartCount.innerText = `🛒 ${cart}`;
  renderCartSidebar();
  closeCartSidebar();
}

cartCount.style.cursor = "pointer";
cartCount.addEventListener("click", openCartSidebar);

function renderProducts(category = "Todos") {
  productList.innerHTML = "";
  const filtered = category === "Todos" ? products : products.filter(p => p.category === category);
  for (const [i, product] of filtered.entries()) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.img}" />
      <h4>${product.name}</h4>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button class="addToCartBtn" data-index="${products.indexOf(product)}">Adicionar</button>
    `;
    productList.appendChild(card);
  }
  document.querySelectorAll(".addToCartBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(btn.getAttribute("data-index"));
      addToCart(idx);
    });
  });
}

function toggleSidebar() {
  sidebar.classList.toggle("open");
}

function toggleLayout() {
  layoutGrid = !layoutGrid;
  productList.style.gridTemplateColumns = layoutGrid
    ? "repeat(auto-fill, minmax(150px, 1fr))"
    : "repeat(1, 1fr)";
}

categories.addEventListener("click", (e) => {
  const category = e.target.closest(".category");
  if (category) {
    renderProducts(category.dataset.category);
  }
});

renderProducts();
renderCartSidebar();

window.addEventListener('DOMContentLoaded', function() {
  const formCadastro = document.getElementById('formCadastro');
  const cadastroMsg = document.getElementById('cadastroMsg');
  if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
      e.preventDefault();
      cadastroMsg.innerHTML = `<div class='alert alert-success' role='alert'>Cadastro concluído com sucesso!</div>`;
      formCadastro.reset();
      setTimeout(() => {
        cadastroMsg.innerHTML = '';
      }, 3000);
    });
  }
});
