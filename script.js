const PIX = "21975003419";
const WHATSAPP = "5521975003419";
let selected = null;

const priceButtons = [...document.querySelectorAll(".price")];
const selectedText = document.getElementById("selectedText");
const paid = document.getElementById("paidWhatsapp");

priceButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    priceButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selected = { value: btn.dataset.value, label: btn.dataset.label };
    selectedText.textContent = `${selected.label} • R$ ${selected.value}`;
    const msg = `Oi, Rarí! Vim da live do TikTok. Escolhi ${selected.label} (R$ ${selected.value}) e já fiz o PIX. Vou enviar o comprovante.`;
    paid.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  });
});

const copyPix = document.getElementById("copyPix");
if (copyPix) {
  copyPix.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PIX);
      toast("PIX copiado: (21) 97500-3419");
    } catch(e) {
      toast("PIX: (21) 97500-3419");
    }
  });
}

function toast(msg){
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2200);
}
