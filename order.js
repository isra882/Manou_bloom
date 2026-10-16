const ownerWhatsApp = "21694940259"; // عوّضه برقم WhatsApp متاعك

// الأسعار بالترتيب: bouquet1 ثم bouquet2 ... إلى bouquet32
// هاذم أمثلة فقط: بدّلهم بأسعارك الحقيقية بالدينار التونسي.
const prices = [
  35, 35, 35, 15, 35, 30, 15, 60,
  60, 60, 15, 30, 30, 5, 25, 7,
  15, 25, 30, 15, 30, 30, 20, 15,
  15, 20, 15, 30, 25, 25, 30, 20,7
];

const modal = document.getElementById("orderModal");
const productName = document.getElementById("productName");
const unitPrice = document.getElementById("unitPrice");
const quantity = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");
const form = document.getElementById("customerForm");

let selectedPrice = 0;

function updateTotal() {
  let qty = Math.max(1, Number(quantity.value) || 1);
  quantity.value = qty;
  totalPrice.textContent = (selectedPrice * qty) + " DT";
}

// يتعرّف على صور الباقات الموجودة في المعرض
const bouquets = document.querySelectorAll(
  "#galerie figure, #gallery figure, .gallery figure, .bouquets figure"
);

bouquets.forEach((card, index) => {
  const image = card.querySelector("img");
  if (!image) return;

  card.style.cursor = "pointer";
  image.style.cursor = "pointer";

  card.addEventListener("click", () => {
    selectedPrice = prices[index] ?? 45;

    const caption = card.querySelector("figcaption");
    productName.textContent =
      caption?.innerText.trim().split("\n")[0] || `Bouquet ${index + 1}`;

    unitPrice.textContent = selectedPrice + " DT";
    quantity.value = 1;
    updateTotal();

    modal.hidden = false;
  });
});

quantity.addEventListener("input", updateTotal);

document.getElementById("closeOrder").addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.hidden = true;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (ownerWhatsApp === "216XXXXXXXX") {
    alert("زيد رقم WhatsApp متاعك في ملف order.js قبل تجربة الشراء.");
    return;
  }

  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const city = document.getElementById("city").value.trim();
  const address = document.getElementById("address").value.trim();
  const qty = Number(quantity.value);

  if (!first || !last || !phone || !city || !address || qty < 1) {
    alert("رجاءً عمّر جميع المعلومات.");
    return;
  }

  const message =
`🌸 Nouvelle commande - Manou Bloom
Produit : ${productName.textContent}
Prix unitaire : ${selectedPrice} DT
Quantité : ${qty}
TOTAL : ${selectedPrice * qty} DT

Nom : ${first}
Prénom : ${last}
Téléphone : ${phone}
Lieu de résidence : ${city}
Adresse : ${address}`;

  const url = "https://wa.me/" + ownerWhatsApp +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
});