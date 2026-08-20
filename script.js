const PIX="21975003419";
const buttons=[...document.querySelectorAll(".price")];
const selected=document.getElementById("selectedText");

buttons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    buttons.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    selected.textContent=`${btn.dataset.label} • R$ ${btn.dataset.value}`;
  });
});

const copy=document.getElementById("copyPix");
if(copy){
  copy.addEventListener("click",async()=>{
    try{
      await navigator.clipboard.writeText(PIX);
      toast("PIX copiado");
    }catch(e){
      toast("PIX: (21) 97500-3419");
    }
  });
}

function toast(msg){
  const el=document.getElementById("toast");
  if(!el)return;
  el.textContent=msg;
  el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),1800);
}
