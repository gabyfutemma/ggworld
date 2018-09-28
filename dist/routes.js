page("/ggworld", index);
page("/products", products);
page("/mycart", myCart);
page();

function index() {
  $("#root").html(renderIndex());
  cartItem();
}

async function products() {
  const ggwProducts = await getDataProducts();
  const render = await renderProductList(getProducts(ggwProducts));
  $("#root").html(render);
  callModal(getProducts(ggwProducts));
  addToCart(getProducts(ggwProducts));
  cartItem();
}

async function myCart() {
  $("#root").html(renderCart());
  cartItem();
  clearCart();
}

function getDataProducts() {
  return fetch("https://spa-ggworld.firebaseio.com/categories.json")
  .then(response => response.json())
  .then(json => json)
  .catch(error => handleError(error))
}

function handleError(e) {
  console.log(e);
}

function getProducts(data) {
  let list = [];
  _.map(data, function (categories) {
    _.map(categories, function (products) {
      _.map(products, function (product) {
        list.push(product);
      });
    });
  });
  return list;
}

