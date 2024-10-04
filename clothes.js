// 2064801
// H.M.Laviru Githmal Herath

let cartIcon=document.querySelector('#cart-icon')
let cart =document.querySelector('.cart')
let closeCart=document.querySelector('#close-cart')
cartIcon.onclick=()=>{
    cart.classList.add('active')
}
closeCart.onclick=()=>{
    cart.classList.remove('active')
}

//cart working js
if(document.readyState=='loading'){
document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    // Load cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems'));
  if (cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      addProductToCart(item.title, price, productImg);
      let cartBoxes = document.getElementsByClassName('cart-box');
      let quantityInputs = cartBoxes[i].getElementsByClassName('cart-quantity');
      quantityInputs[quantityInputs.length - 1].value = item.quantity;
    }
  }
    
    //remove items from cart
    let removeCartBtn= document.getElementsByClassName('cart-remove')
    console.log(removeCartBtn)
    for(let i=0;i<removeCartBtn.length;i++){
    let button =removeCartBtn[i]
    button.addEventListener('click', removeCartItem)
    }
//add to cart
let addCart= document.getElementsByClassName('add-cart')
for(let i=0; i<addCart.length; i++){
    let carts =addCart[i]
    carts.addEventListener('click',addCartClicked)
}

//quantity changes 
let quantityInputs = document.getElementsByClassName('cart-quantity')
for(let i=0;i<quantityInputs.length;i++){
let input = quantityInputs[i]
input.addEventListener('change',quantityChanged)
}
//buy button work
document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked)

    }
    function removeCartItem(e){
        let  btnClicked = e.target
        console.log(btnClicked)
        btnClicked.parentElement.remove()
        updatetotal()
        }



function buyButtonClicked(){
    alert('Order confirmed. Your order is on the processing way!!!')
    let cartContent = document.getElementsByClassName('cart-content')[0]
while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild)
    
}
updatetotal()
}

function addCartClicked(e){
    let btn=e.target
    let shopProducts = btn.parentElement;
    let title =shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price =shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg =shopProducts.getElementsByClassName('product-img')[0].src;
    console.log(price,productImg)
    console.log(title)
    
    addProductToCart (title,price,productImg)
    updatetotal()
    }
    function addProductToCart (title,price,productImg){
    let cartShopBox=document.createElement('div')
    cartShopBox.classList.add('cart-box')
    let cartItem =document.getElementsByClassName('cart-content')[0]
    let cartItemNames =cartItem.getElementsByClassName('cart-product-title')
    for(let i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText ==title){
    alert('This item is already in your shopping cart.');
     return;
    }
    }
    let cartBoxContent =`
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" name="" id="" value="1" class="cart-quantity">
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i>
    `
    cartShopBox.innerHTML=cartBoxContent
    cartItem.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged)
    }


function quantityChanged(e){
let input = e.target
if(isNaN(input.value)||input.value<=0){

input.value=1;
}
updatetotal()
}
//update total
function updatetotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    let itemCount = cartBoxes.length;
  
    for (let i = 0; i < cartBoxes.length; i++) {
      let cartBox = cartBoxes[i];
      let priceElement = cartBox.getElementsByClassName('cart-price')[0];
      let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
      let quantity = quantityElement.value;
      let price = parseFloat(priceElement.innerText.replace('$', ''));
      total = total + price * quantity;
      total = Math.round(total * 100) / 100;
    }
  
    let totalPriceElement = document.getElementsByClassName('total-price')[0];
    totalPriceElement.innerText = '$' + total;
  
    // Store cart items in localStorage
    let cartItems = [];
    for (let i = 0; i < cartBoxes.length; i++) {
      let cartBox = cartBoxes[i];
      let titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
      let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
      let item = {
        title: titleElement.innerText,
        quantity: quantityElement.value
      };
      cartItems.push(item);
    }
  
    // Save cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    // Update the cart counter
    let cartCounter = document.getElementById('cart-counter');
    cartCounter.innerText = itemCount > 0 ? itemCount.toString() : '';
  
    // If there are no items in the cart, set the total price to zero
    if (itemCount === 0) {
      totalPriceElement.innerText = '$0';
      cartCounter.innerText = '0';
    }
  }


