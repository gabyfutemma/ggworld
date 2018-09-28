function renderIndex() {
  const home = `
    <div class="home">
      <div class="shadow py-4 px-3 bg-white box"> 
        <h1 class="title-box"> Geek's Gurumi World </h1>
        <p class="mt-1 text-box"> Here is an magical place where a simple yarn turns into an <span class="featured-word">Amigurumi!</span></p>
        <h2 class="mt-4 subtitle-box"> What's an amigurumi ? </h2>
        <p class="mt-1 text-box"> Amigurumi is the <span class="featured-word">Japanese</span> art of knitting or crocheting small, stuffed yarn creatures.</p>
        <div class="mt-4">
          <h3 class="mb-3 subtitle-box"> Do you wanna see ours awesome creatures ? </h3> 
          <a href="/products" class="py-2 px-3 ggw-btn product-btn"> Enter in GG World! </a> 
        </div>
      </div>
    </div>
  `;
  return home;
}

function renderProductList(data) {
  const renderProducts = `
    <div class="d-flex flex-wrap justify-content-center">
      ${data.map((product) => templateProducts(product)).join("")}
    </div>
  `;
  return renderProducts;
}

function templateProducts(data) {
  const templateProduct = `
    <div class="m-3">
      <img src=${data.image} alt=${data.image}/>
      <h3 class="mt-1 product-name"> ${data.displayName} </h3>
      <p>R$ ${data.price} </p>
      <button type="button" class="px-2 py-1 ggw-btn details-btn" data-details-id="${data.id}" data-toggle="modal" data-target="#modalProduct"> Details </button>
      <button type="button" class="px-2 py-1 ggw-btn addcart-btn" data-add-id="${data.id}"> Add to Cart </button>
    </div>
  `;
  return templateProduct;
}

function callModal(data) {
  $("#root").append(`
    <section id="area-modal">
    <div class="modal fade" id="modalProduct" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex flex-column align-items-center">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div class="title-image text-center"></div>
          </div>
          <div class="modal-body">
          </div>
        </div>
      </div>
    </div>
  </section>`);
  data.forEach(product => {
    $(`button[data-details-id=${product.id}]`).click(function () {
      $(".title-image").html(`
      <div>
        <h3 class="product-name mb-2">${product.displayName}</h3>
        <img src="${product.image}"/ alt="${product.image}"/>
      </div> 
      `);
      $(".modal-body").html(`
        <div>
          <h4 class="product-subtitle"> Description </h4>
          <p> <span class="product-description">Categorie:</span> ${product.categorie}</p>
          <p> <span class="product-description">Material:</span> ${product.material}</p>
          <p> <span class="product-description">Size:</span> ${product.size}</p>
          <p> <span class="product-description">Price:</span> ${product.price}</p>
          <p> <span class="product-description">Stock:</span> ${product.stock}</p>  
          <p> <span class="product-description">Shipping:</span> ${product.delivery}</p>        
        </div>
      `);
    });
  })
}

function cartItem() {
  const getProductsLocalStorage = JSON.parse(localStorage.getItem("products"));
  if (getProductsLocalStorage) {
    $(".cartCount").html(`${getProductsLocalStorage.length} product`);
  }
}

function addToCart(data) {
  data.forEach((product) => { 
    $(`button[data-add-id=${product.id}]`).click(function() {
      $(`button[data-add-id=${product.id}]`).text("In Cart");

      let eachProduct = {
        displayName: product.displayName,
        id: product.id,
        image: product.image,
        quantity: 1,
        price: product.price
      };
      
      let cart;
      const getProductsLocalStorage = JSON.parse(localStorage.getItem("products"));

      if (getProductsLocalStorage) {
        cart = [...getProductsLocalStorage, eachProduct];
        $(".cartCount").html(`${cart.length} product`);
      } else {
        cart = [eachProduct];
        $(".cartCount").html(`${cart.length} product`);
      }

      localStorage.setItem("products", JSON.stringify(cart));
    });
  });
}

function renderCart() {
  const getProductLocalStorage = JSON.parse(localStorage.getItem("products"));
  
  if (getProductLocalStorage) {
    const allValues = getProductLocalStorage.map(product => (product.price).replace(",","."));
    const sumValues = allValues.map(Number).reduce((acum, price) => acum + price);
    const total = sumValues.toFixed(2).replace(".", ",");

    const templateCart = `
      <section class="d-flex cart">
        <div class="my-5 description-cart">
          <div class="row d-flex p-3">
            <p class="col-6 pl-4"> Product </p>
            <p class="col-2 text-center"> Qty </p>
            <p class="col-2 text-center"> Price </p>
          </div>
          <div class="mb-3 pl-3">
            ${getProductLocalStorage.map((product) => templateCartProducts(product)).join("")}
          </div> 
        </div>
        <div class="my-5">  
          <h4 class="mb-3 p-3 cart-box"> Total: R$ ${total} </h4>
          <div class="d-flex flex-column justify-content-center">
            <button class="my-2 px-2 py-1 ggw-btn product-btn"> Buy ! <i class="far fa-grin-stars"></i> </button>
            <a href="/products" class="d-flex align-items-center py-2 px-3 ggw-btn product-btn"> Keep Shopping ! <span class="ml-3 emote"><i class="far fa-grin-stars"></i></span> </a> 
            <button type="button" class="my-2 px-2 py-1 ggw-btn addcart-btn" data-clear-id="clear-btn"> Clear Cart </button>
          </div> 
        </div>
      </section>`;
    return templateCart;
  } else {
    const templateCart = `
      <div class="empty-cart">
        <div class="shadow py-4 px-3 bg-white box"> 
          <h2 class=" subtitle-box"> Your cart is empty ! <span class="emote"><i class="far fa-sad-tear"></i></span></h2>
            <div class="mt-4">
              <h3 class="mb-3 subtitle-box"> Do you want buy ours awesome creatures ? </h3> 
              <a href="/products" class="py-2 px-3 ggw-btn product-btn"> Keep Shopping ! </a> 
            </div>
          </div>
        </div>
      </div>
    `
    return templateCart;
  }
}

function templateCartProducts(data) {
  const templateProduct = `
    <div class="row p-2 d-flex align-items-center">
      <div class="col-6 d-flex align-items-center">
        <img src=${data.image} alt=${data.image} class="thumb"/>
        <h3 class="ml-2 product-name"> ${data.displayName} </h3>
      </div>
      <p class="col-2 p-0 text-center"> ${data.quantity} </p>
      <p class="col-2 p-0 text-center">R$ ${data.price} </p>
    </div>
  `;
  return templateProduct;
}

function clearCart() {
  $(`button[data-clear-id="clear-btn"]`).click(function(){
    localStorage.clear();
    $(".cartCount").empty();
    myCart();   
  });
}