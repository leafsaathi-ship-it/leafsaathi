let cart = JSON.parse(localStorage.getItem('cart')) || [];

const container = document.getElementById('cart-items');
let total = 0;

cart.forEach((item, index) => {
total += item.price * item.qty;

container.innerHTML += `
<div>
  <h3>${item.name}</h3>
  <p>₹${item.price} x ${item.qty}</p>
  <button onclick="removeItem(${index})">Remove</button>
</div>
`;
});

document.getElementById('total').innerText = "Total: ₹" + total;

function removeItem(i){
cart.splice(i,1);
localStorage.setItem('cart', JSON.stringify(cart));
location.reload();
}

function checkout(){
let msg = "Hello, I want to order:\n";

cart.forEach(item=>{
msg += `${item.name} x${item.qty} - ₹${item.price}\n`;
});

msg += `Total: ₹${total}`;

window.open(`https://wa.me/919713671554?text=${encodeURIComponent(msg)}`);
}