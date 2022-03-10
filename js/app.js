
const loadProducts = () =>{
  const url = `https://fakestoreapi.com/products`
  fetch(url)
  .then(res => res.json())
  .then( data => showProducts(data))
}
loadProducts()

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product p-3">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
      <button onclick="detailsBtn(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  document.getElementById('show_details').textContent = ''
  document.getElementById('my-cart').style.display = 'block'
  
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.round(total);
  updateTotal()
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
loadProducts();

const detailsBtn = (id) =>{
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => infoDetails(data));
 
};
const infoDetails = (proId) =>{
 const showDetailInfo = document.getElementById('show_details')
  showDetailInfo.innerHTML= `<div class="details-card">
    <div>
      <img class="product-image" src=${proId.image}></img>
    </div>
    <h3>${proId.title}</h3>
    <h6>Price: ${proId.price}</h6>
    <p>Rating: ${proId.rating.rate} (${proId.rating.count})</p>
    <p><small>${proId?.description?.slice(0, 200) + '.....'}</small></p>
    `;

    document.getElementById('my-cart').style.display = 'none'
}

const buyNow = () =>{

  const totalValue = document.getElementById("total").innerText
  if(totalValue == 0){
    return
  }else{
    const modalInfo = document.getElementById('modal')
    modalInfo.style.display = 'block'
  
    setTimeout(() => {
    modalInfo.style.display = 'none'
    count = 0;
    document.getElementById('total-Products').innerText = 0
    document.getElementById('price').innerText = 0
    document.getElementById('delivery-charge').innerText = 20
    document.getElementById('total-tax').innerText = 0
    document.getElementById('total').innerText = 0
    }, 2000);
  }
}



