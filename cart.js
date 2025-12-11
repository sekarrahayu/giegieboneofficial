const cart = [];
const productCards = document.querySelectorAll(".product-card");
const checkoutList = document.getElementById("checkoutList");
const checkoutTotal = document.getElementById("checkoutTotal");
const clearCartBtn = document.getElementById("clear-cart-btn");
const cartIcon = document.querySelector('.icon-cart');
const checkoutFooter = document.getElementById("checkoutFooter");

productCards.forEach((card) => {
  const btn = card.querySelector(".add-product-btn");
  btn.addEventListener("click", () => {
    const title = card.querySelector(".product-title").innerText;
    const priceText = card.querySelector(".product-price").innerText;
    const price = parseInt(priceText.replace(/[^0-9]/g, ""));

    cart.push({ title, price });
    updateCheckout();

    // Tampilkan modal
    const checkoutModal = new bootstrap.Modal(
      document.getElementById("checkoutModal")
    );
    checkoutModal.show();
  });
});

function updateCheckout() {
  checkoutList.innerHTML = "";  
  let total = 0;

  if (cart.length === 0) {
      const li = document.createElement("li");
      li.className = "list-group-item text-center py-3";
      li.textContent = "You haven't added anything to your cart.";
      checkoutList.appendChild(li);

      checkoutFooter.style.display = "none";
      checkoutTotal.textContent = "Rp 0";

      return;
  }

  checkoutFooter.style.display = "flex";

  cart.forEach((item, index) => {
      total += item.price;

      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>${item.title} - Rp ${item.price.toLocaleString('id-ID')}</span>
          <button class="btn btn-danger btn-sm">Delete</button>
      `;

      li.querySelector("button").addEventListener("click", () => {
          cart.splice(index, 1);
          updateCheckout();
      });

      checkoutList.appendChild(li);
  });

  checkoutTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}


clearCartBtn.addEventListener("click", () => {
    cart.length = 0;      // kosongkan array cart
    updateCheckout();     // update modal
  });


// membuka cart melalui icon
cartIcon.addEventListener('click', () => {
  updateCheckout(); // ⬅ WAJIB supaya cart kosong langsung muncul pesan
  const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  checkoutModal.show();
});