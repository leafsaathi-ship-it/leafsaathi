// GLOBAL
let qty = 1;
let currentProduct = {};

// PRODUCTS
const products = [
{
name:"Stoneware Planter Trio",
price:1599,
tag:"NEW",
img:"https://www.gardendesign.com/pictures/images/675x529Max/site_3/feeling-flirty-tradescantia-purple-tradescantia-tradescantia-hybrid-proven-winners_17350.jpg",
category:"indoor"
},
{
name:"Snake Plant",
price:499,
tag:"SALE",
img:"https://www.gardendesign.com/pictures/images/675x529Max/site_3/aspidistra-elatior-tough-indoor-plant-alamy-stock-photo_12381.jpg",
category:"indoor"
},
{
name:"Areca Palm",
price:799,
tag:"",
img:"https://www.gardendesign.com/pictures/images/675x529Max/site_3/chamaedorea-elegans-indoor-palm-alamy-stock-photo_12384.jpg",
category:"outdoor"
},
{
name:"Peace Lily",
price:599,
tag:"",
img:"https://www.gardendesign.com/pictures/images/675x529Max/site_3/beautifall-summer-nights-pothos-pothos-plant-proven-winners_18890.jpg",
category:"indoor"
},
{
name:"Indoor Plant",
price:599,
img:"https://www.gardendesign.com/pictures/images/675x529Max/site_3/monster-mash-swiss-cheese-vine-monstera-plant-proven-winners_17297.jpg",
category:"indoor"
},
{
name:"Indoor Plant",
price:599,
img:"https://www.gardendesign.com/pictures/images/675x529Max/site_3/monster-mash-swiss-cheese-vine-monstera-plant-proven-winners_17297.jpg",
category:"outdoor"
},
{
name:"Wall Plant Frame",
price:999,
img:"https://images.unsplash.com/photo-1505691938895-1758d7feb511",
category:"decor"
},
{
name:"Minimal Vase",
price:499,
img:"https://www.gardendesign.com/pictures/images/675x529Max/site_3/florida-green-philodendron-climbing-philodendron-philodendron-hybrid-proven-winners_17294.jpg",
category:"decor"
},
{
name:"Ceramic Pot",
price:399,
img:"https://www.gardendesign.com/pictures/images/675x529Max/site_3/living-lace-victoria-bird-s-nest-fern-asplenium-antiquum-proven-winners_18891.jpg",
category:"pots"
},
{
name:"Minimal White Planter",
price:599,
img:"https://images.unsplash.com/photo-1505691938895-1758d7feb511",
category:"pots"
},
{
name:"Hanging Pot",
price:499,
img:"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
category:"pots"
}
];

// 🔥 NEW: LOAD PRODUCTS WITH CATEGORY FILTER
function loadProducts(category){

const list = document.getElementById('product-list');
if(!list) return;

list.innerHTML = "";

products
.filter(p => !category || p.category === category)
.forEach(p=>{
list.innerHTML += `
<div class="product">

<img src="${p.img}" 
onclick="goToProduct('${p.name}', ${p.price}, '${p.img}')">

<div class="tag">${p.tag || ""}</div>
<h3>${p.name}</h3>
<div class="price">₹${p.price}</div>

<button class="add-btn" onclick="addToCart('${p.name}', ${p.price}, '${p.img}')">
Add to Cart
</button>

</div>`;
});

}

// LOAD DEFAULT (HOME)
const list = document.getElementById('product-list');
if(list){
loadProducts(); // sab products show
}

// 👉 PRODUCT PAGE REDIRECT
function goToProduct(name, price, img){
localStorage.setItem('selectedProduct', JSON.stringify({name, price, img}));
window.location.href = "product.html";
}

// QUANTITY
function changeQty(val){
qty = Math.max(1, qty + val);
const q = document.getElementById('qty');
if(q) q.innerText = qty;
}

// ADD TO CART
function addToCart(name, price, img){

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// modal se call
if(!name){
name = currentProduct.name;
price = currentProduct.price;
img = currentProduct.img;

let existing = cart.find(item => item.name === name);

if(existing){
existing.qty += qty;
}else{
cart.push({ name, price, qty, img });
}

}else{
// product card se
let existing = cart.find(item => item.name === name);

if(existing){
existing.qty += 1;
}else{
cart.push({ name, price, qty:1, img });
}
}

localStorage.setItem('cart', JSON.stringify(cart));

openCart();
}

// CART OPEN/CLOSE
function openCart(){
const cart = document.getElementById('cartSidebar');
if(cart){
cart.classList.add('active');
renderCart();
}
}

function closeCart(){
const cart = document.getElementById('cartSidebar');
if(cart){
cart.classList.remove('active');
}
}

// RENDER CART
function renderCart(){
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const container = document.getElementById('cartItems');
const totalEl = document.getElementById('cartTotal');

if(!container) return;

container.innerHTML = "";
let total = 0;

cart.forEach((item, index)=>{
total += item.price * item.qty;

container.innerHTML += `
<div class="cart-item">
<img src="${item.img}">
<div class="cart-info">
<small>POTS & PLANTERS</small>
<h4>${item.name}</h4>

<div class="qty-box">
<button onclick="changeCartQty(${index}, -1)">-</button>
<span>${item.qty}</span>
<button onclick="changeCartQty(${index}, 1)">+</button>
</div>

<b>₹${item.price}</b>
</div>
</div>
`;
});

totalEl.innerText = total;
}

// CHANGE CART QTY
function changeCartQty(index, change){
let cart = JSON.parse(localStorage.getItem('cart')) || [];

cart[index].qty += change;

if(cart[index].qty <= 0){
cart.splice(index,1);
}

localStorage.setItem('cart', JSON.stringify(cart));
renderCart();
}

// WHATSAPP CHECKOUT
function checkout(){
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let msg = "Hello, I want to order:\n";

let total = 0;

cart.forEach(item=>{
msg += `${item.name} x${item.qty} - ₹${item.price}\n`;
total += item.price * item.qty;
});

msg += `Total: ₹${total}`;

window.open(`https://wa.me/919713671554?text=${encodeURIComponent(msg)}`);
}

// SCROLL
function scrollToProducts(){
const el = document.getElementById('products');
if(el){
el.scrollIntoView({behavior:'smooth'});
}
}
function toggleMenu(){
document.getElementById("navMenu").classList.toggle("active");
}

function uploadDP(event){
let file = event.target.files[0];
let reader = new FileReader();

reader.onload = function(){
localStorage.setItem("userDP", reader.result);
document.getElementById("userDP").src = reader.result;
}

reader.readAsDataURL(file);
}
function uploadDP(event){
let file = event.target.files[0];

if(!file) return;

let reader = new FileReader();

reader.onload = function(){
let dp = reader.result;

// current user nikaalo
let email = localStorage.getItem("loggedInUser");

if(!email){
alert("Pehle login karo ❌");
return;
}

// user data lo
let user = JSON.parse(localStorage.getItem(email)) || {};

// dp save karo
user.dp = dp;

// dobara save karo
localStorage.setItem(email, JSON.stringify(user));

// navbar image change
let img = document.getElementById("userDP");
if(img){
img.src = dp;
}

alert("Profile Photo Updated ✅");
};

reader.readAsDataURL(file);
}
function uploadDP(event){
let file = event.target.files[0];

if(!file) return;

let reader = new FileReader();

reader.onload = function(){
let dp = reader.result;

// current user nikaalo
let email = localStorage.getItem("loggedInUser");

if(!email){
alert("Pehle login karo ❌");
return;
}

// user data lo
let user = JSON.parse(localStorage.getItem(email)) || {};

// dp save karo
user.dp = dp;

// dobara save karo
localStorage.setItem(email, JSON.stringify(user));

// navbar image change
let img = document.getElementById("userDP");
if(img){
img.src = dp;
}

alert("Profile Photo Updated ✅");
};

reader.readAsDataURL(file);
}
window.onload = function(){

let email = localStorage.getItem("loggedInUser");
let avatar = document.getElementById("userAvatar");

if(email && avatar){

// 👉 first letter nikaalo
let letter = email.charAt(0).toUpperCase();

// 👉 avatar me set karo
avatar.innerText = letter;

}

}
window.onload = function(){

let email = localStorage.getItem("loggedInUser");
let avatar = document.getElementById("userAvatar");
let dp = localStorage.getItem("userDP");

if(!avatar) return;

if(dp){
// image show
avatar.innerHTML = `<img src="${dp}" style="width:100%;height:100%;border-radius:50%;">`;
}else if(email){
// letter show
avatar.innerText = email.charAt(0).toUpperCase();
}

}
