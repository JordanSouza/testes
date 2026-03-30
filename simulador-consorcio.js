/*!
 * Autopilot Consórcios — Simulador Embeddável
 * Uso: <div id="simulador-consorcio"></div>
 * <script src="simulador-consorcio.js"></script>
 */
(function () {
  "use strict";

  const TARGET = document.getElementById("simulador-consorcio");
  if (!TARGET) return;

  /* ─── INJECT FONTS ─── */
  if (!document.getElementById("csc-font")) {
    const lk = document.createElement("link");
    lk.id = "csc-font";
    lk.rel = "stylesheet";
    lk.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Nunito+Sans:wght@400;600;700&display=swap";
    document.head.appendChild(lk);
  }

  /* ─── INJECT CSS ─── */
  if (!document.getElementById("csc-styles")) {
    const style = document.createElement("style");
    style.id = "csc-styles";
    style.textContent = `
#simulador-consorcio { width: 100%; max-width: 420px; }
.csc-widget {
  font-family: 'Nunito', sans-serif;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 12px 60px rgba(0,0,0,.16), 0 2px 8px rgba(0,0,0,.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 680px;
  min-height: 540px;
  position: relative;
}
.csc-header {
  background: linear-gradient(130deg, #1440fe 0%, #0A2DC7 45%, #001a91 100%);
  padding: 18px 20px 16px;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0; position: relative; overflow: hidden;
}
.csc-header::before {
  content:''; position:absolute; top:-30px; right:-30px;
  width:120px; height:120px; border-radius:50%;
  background:rgba(255,255,255,.06);
}
.csc-logo { display:flex; align-items:center; gap:8px; z-index:1; }
.csc-logo-ico {
  width:34px; height:34px; background:rgba(255,255,255,.18);
  border-radius:8px; display:flex; align-items:center; justify-content:center;
  font-size:.85rem; font-weight:900; color:#fff;
  border:1px solid rgba(255,255,255,.3);
}
.csc-logo-txt { color:#fff; font-weight:800; font-size:.9rem; line-height:1.2; }
.csc-logo-txt span { display:block; font-size:.62rem; font-weight:600; opacity:.7; letter-spacing:.04em; text-transform:uppercase; }
.csc-wpp-btn {
  z-index:1; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3);
  border-radius:20px; padding:6px 12px; display:flex; align-items:center; gap:6px;
  color:#fff; font-size:.72rem; font-weight:700; cursor:pointer;
  text-decoration:none; transition:background .15s;
  letter-spacing:.03em; text-transform:uppercase;
}
.csc-wpp-btn:hover { background:rgba(255,255,255,.25); }
.csc-steps {
  background:#f8f9fb; border-bottom:1px solid #eee;
  padding:8px 20px; display:flex; align-items:center; gap:8px; flex-shrink:0;
}
.csc-step-dot { width:8px; height:8px; border-radius:50%; background:#ddd; transition:all .3s; flex-shrink:0; }
.csc-step-dot.done  { background:#1440fe; }
.csc-step-dot.active { background:#1440fe; width:22px; border-radius:4px; }
.csc-step-label { margin-left:auto; font-size:.65rem; font-weight:700; color:#aaa; letter-spacing:.05em; text-transform:uppercase; }
.csc-msgs {
  flex:1; overflow-y:auto; padding:18px 16px 10px;
  display:flex; flex-direction:column; gap:10px;
  scroll-behavior:smooth; background:#f8f9fb;
}
.csc-msgs::-webkit-scrollbar { width:3px; }
.csc-msgs::-webkit-scrollbar-thumb { background:#ddd; border-radius:2px; }
.csc-row { display:flex; align-items:flex-end; gap:8px; }
.csc-row.usr { flex-direction:row-reverse; }
.csc-ava {
  width:30px; height:30px; border-radius:50%; flex-shrink:0;
  background:linear-gradient(135deg,#1440fe,#001a91);
  display:flex; align-items:center; justify-content:center; font-size:.8rem;
  box-shadow:0 2px 8px rgba(0,0,0,.12);
}
.csc-bub {
  max-width: 100%; /* Mudamos para 100% para ele usar o espaço todo permitido pela caixa pai */
  padding: 11px 14px; border-radius: 18px;
  font-size: .88rem; line-height: 1.55;
  animation: csc-in .2s ease; position: relative; word-wrap: break-word;
}
@keyframes csc-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
.csc-row.bot .csc-bub { background:#fff; color:#2d3436; border-bottom-left-radius:4px; box-shadow:0 2px 10px rgba(0,0,0,.08); }
.csc-row.usr .csc-bub { background:#0A2DC7; color:#fff; border-bottom-right-radius:4px; }
.csc-bub b { font-weight:800; }
.csc-bub .g { color:#1440fe; }
.csc-time { font-size:.58rem; color:#bbb; margin-top:2px; align-self:flex-end; }
.csc-row.usr .csc-time { text-align:right; }
.csc-typing { display:flex; gap:4px; align-items:center; padding:8px 2px; }
.csc-tdot { width:7px; height:7px; border-radius:50%; background:#ccc; animation:csc-td .8s infinite ease-in-out; }
.csc-tdot:nth-child(2) { animation-delay:.14s; }
.csc-tdot:nth-child(3) { animation-delay:.28s; }
@keyframes csc-td { 0%,60%,100%{transform:translateY(0);background:#ccc} 30%{transform:translateY(-5px);background:#1440fe} }
.csc-cards { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:4px 14px 0; animation:csc-in .25s ease; }
.csc-card {
  background:#fff; border:2px solid #eee; border-radius:16px;
  padding:18px 12px 14px; text-align:center; cursor:pointer;
  transition:border-color .18s, transform .15s, box-shadow .18s;
  display:flex; flex-direction:column; align-items:center; gap:6px;
}
.csc-card:hover { border-color:#1440fe; transform:translateY(-2px); box-shadow:0 6px 24px rgba(20,64,254,.15); }
.csc-card-ico {
  width:60px; height:60px; border-radius:50%;
  background:linear-gradient(135deg,rgba(20,64,254,.1),rgba(0,26,145,.1));
  display:flex; align-items:center; justify-content:center; font-size:1.7rem;
}
.csc-card-lbl { font-weight:800; font-size:.85rem; color:#1a1a2e; }
.csc-card-sub { font-size:.68rem; color:#888; line-height:1.4; }
.csc-card-plus {
  width:22px; height:22px; border-radius:50%;
  border:2px solid #1440fe; color:#1440fe;
  display:flex; align-items:center; justify-content:center;
  font-size:.9rem; font-weight:700;
  transition:background .15s, color .15s;
}
.csc-card:hover .csc-card-plus { background:#1440fe; color:#fff; }
.csc-slider-wrap {
  background:#fff; border-radius:16px; padding:18px 16px;
  box-shadow:0 2px 12px rgba(0,0,0,.07); margin:4px 14px 0; animation:csc-in .25s ease;
}
.csc-slider-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.csc-slider-lbl { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#aaa; }
.csc-slider-mode { display:flex; background:#f0f2f5; border-radius:20px; padding:3px; gap:0; }
.csc-mode-btn {
  padding:5px 12px; border-radius:16px; font-size:.7rem; font-weight:700;
  border:none; cursor:pointer; background:transparent; color:#888;
  transition:all .15s; font-family:'Nunito',sans-serif;
}
.csc-mode-btn.on { background:#1440fe; color:#fff; }
.csc-val-display { font-size:2rem; font-weight:900; color:#1a1a2e; text-align:center; margin:8px 0; letter-spacing:-.03em; }
.csc-val-display span.prefix { font-size:1rem; font-weight:600; color:#888; margin-right:4px; }
.csc-range {
  width:100%; height:5px; -webkit-appearance:none; appearance:none;
  border-radius:10px; outline:none; cursor:pointer;
  background:linear-gradient(90deg,#1440fe var(--pct,10%),#e0e0e0 var(--pct,10%));
}
.csc-range::-webkit-slider-thumb {
  -webkit-appearance:none; width:20px; height:20px; border-radius:50%;
  background:#1440fe; cursor:pointer; border:3px solid #fff;
  box-shadow:0 2px 8px rgba(20,64,254,.4);
}
.csc-range-labels { display:flex; justify-content:space-between; font-size:.67rem; color:#bbb; margin-top:6px; font-weight:600; }
.csc-slider-preview {
  margin-top:10px; padding:8px 12px; border-radius:10px;
  background:rgba(20,64,254,.05); border:1px solid rgba(20,64,254,.12);
  font-size:.75rem; color:#555; text-align:center;
  display:flex; align-items:center; justify-content:center; gap:4px; min-height:34px;
}
.csc-slider-preview b { color:#1440fe; font-weight:800; }
.csc-pills { display:flex; flex-wrap:wrap; gap:7px; margin:4px 14px 0; animation:csc-in .25s ease; }
.csc-pill {
  padding:8px 16px; border-radius:22px; border:2px solid #eee;
  font-size:.8rem; font-weight:700; cursor:pointer; background:#fff;
  transition:all .15s; color:#555; font-family:'Nunito',sans-serif;white-space: nowrap;
}
.csc-pill:hover { border-color:#1440fe; color:#1440fe; }
.csc-pill.on { background:#1440fe; border-color:#1440fe; color:#fff; }
.csc-result {
  background:#fff; border-radius:16px; overflow:hidden;
  box-shadow:0 4px 20px rgba(0,0,0,.1); margin:4px 14px 0; animation:csc-in .25s ease;
}
.csc-result-header { background:linear-gradient(120deg,#001a91,#1440fe); padding:14px 16px; color:#fff; }
.csc-result-tipo { font-size:.65rem; font-weight:700; letter-spacing:.09em; text-transform:uppercase; opacity:.75; margin-bottom:2px; }
.csc-result-parcela { font-size:1.8rem; font-weight:900; letter-spacing:-.03em; }
.csc-result-parcela small { font-size:.85rem; font-weight:600; opacity:.75; margin-left:3px; }
.csc-result-credito { font-size:.78rem; opacity:.8; margin-top:2px; }
.csc-result-grid { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:#f0f2f5; }
.csc-ritem { background:#fff; padding:11px 14px; }
.csc-ritem-l { font-size:.62rem; text-transform:uppercase; letter-spacing:.07em; font-weight:700; color:#aaa; margin-bottom:3px; }
.csc-ritem-v { font-size:.88rem; font-weight:800; color:#1a1a2e; }
.csc-ritem-v.g { color:#1440fe; }
.csc-badge-row { padding:10px 14px; }
.csc-badge { display:inline-flex; align-items:center; gap:5px; background:rgba(20,64,254,.08); border:1px solid rgba(20,64,254,.2); border-radius:20px; padding:4px 10px; font-size:.7rem; font-weight:700; color:#1440fe; }
.csc-contract { background:#fff; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,.1); margin:4px 14px 0; overflow:hidden; animation:csc-in .25s ease; }
.csc-contract-head { padding:12px 16px; background:#f8f9fb; border-bottom:1px solid #eee; display:flex; align-items:center; gap:10px; }
.csc-contract-ico { width:32px; height:32px; background:linear-gradient(135deg,#001a91,#1440fe); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:.9rem; flex-shrink:0; }
.csc-contract-ttl { font-weight:800; font-size:.85rem; color:#1a1a2e; }
.csc-contract-id { font-size:.63rem; color:#aaa; }
.csc-crow { display:flex; justify-content:space-between; padding:8px 16px; border-bottom:1px solid #f0f2f5; font-size:.78rem; }
.csc-crow:last-of-type { border:none; }
.csc-crow-k { color:#888; }
.csc-crow-v { font-weight:700; color:#1a1a2e; }
.csc-sign-btn {
  margin:12px 16px 14px; width:calc(100% - 32px); padding:12px; border-radius:12px;
  background:linear-gradient(135deg,#001a91,#1440fe); color:#fff;
  border:none; font-weight:800; font-size:.88rem; cursor:pointer;
  font-family:'Nunito',sans-serif; display:block; text-align:center; transition:opacity .15s;
}
.csc-sign-btn:hover { opacity:.9; }
.csc-signed-ok { display:none; margin:0 16px 14px; padding:10px; border-radius:10px; background:#eef1ff; color:#1440fe; font-weight:700; font-size:.8rem; text-align:center; }
.csc-pay-btns { display:grid; grid-template-columns:1fr; gap:8px; margin:4px 14px 10px; animation:csc-in .25s ease; }
.csc-pay-opt {
  background:#fff; border:2px solid #eee; border-radius:14px;
  padding:14px 16px; cursor:pointer; display:flex; align-items:center; gap:12px;
  transition:all .15s;
}
.csc-pay-opt:hover { border-color:#1440fe; box-shadow:0 4px 14px rgba(20,64,254,.12); }
.csc-pay-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
.csc-pay-info { flex:1; }
.csc-pay-name { font-weight:800; font-size:.88rem; color:#1a1a2e; }
.csc-pay-desc { font-size:.7rem; color:#888; margin-top:1px; }
.csc-pay-arrow { color:#ccc; font-size:1rem; }
.csc-pix { background:#fff; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,.1); padding:18px; text-align:center; margin:4px 14px 0; animation:csc-in .25s ease; }
.csc-pix-title { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#aaa; margin-bottom:12px; }
.csc-qr { width:130px; height:130px; margin:0 auto 12px; background:#fff; border:3px solid #f0f2f5; border-radius:10px; padding:8px; display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
.csc-qr-c { border-radius:1px; }
.csc-pix-val { font-size:1.6rem; font-weight:900; color:#1a1a2e; margin-bottom:4px; }
.csc-pix-sub { font-size:.72rem; color:#888; margin-bottom:12px; }
.csc-pix-key { background:#f8f9fb; border:1px solid #eee; border-radius:8px; padding:8px 12px; font-size:.72rem; color:#555; margin-bottom:10px; word-break:break-all; text-align:left; }
.csc-copy { width:100%; padding:10px; border-radius:10px; background:#eef1ff; border:1px solid rgba(20,64,254,.25); color:#1440fe; font-weight:800; font-size:.82rem; cursor:pointer; font-family:'Nunito',sans-serif; margin-bottom:8px; transition:background .15s; }
.csc-copy:hover { background:#dde5ff; }
.csc-confirm-btn { width:100%; padding:11px; border-radius:10px; background:linear-gradient(135deg,#001a91,#1440fe); color:#fff; border:none; font-weight:800; font-size:.88rem; cursor:pointer; font-family:'Nunito',sans-serif; transition:opacity .15s; }
.csc-confirm-btn:hover { opacity:.9; }
.csc-boleto { background:#fff; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,.1); padding:18px; margin:4px 14px 0; animation:csc-in .25s ease; }
.csc-barcode { height:56px; background:#fff; border:1px solid #eee; border-radius:8px; padding:6px 10px; display:flex; align-items:center; gap:1px; overflow:hidden; margin:12px 0; }
.csc-bar { background:#1a1a2e; border-radius:1px; flex-shrink:0; }
.csc-boleto-info { display:flex; justify-content:space-between; margin-bottom:4px; }
.csc-boleto-item-l { font-size:.62rem; color:#aaa; text-transform:uppercase; letter-spacing:.06em; font-weight:700; }
.csc-boleto-item-v { font-size:.88rem; font-weight:800; color:#1a1a2e; margin-top:2px; }
.csc-boleto-num { font-size:.65rem; color:#aaa; text-align:center; margin-bottom:12px; }
.csc-copy-bol { width:100%; padding:10px; border-radius:10px; border:2px solid #eee; background:#fff; color:#555; font-weight:700; font-size:.8rem; cursor:pointer; font-family:'Nunito',sans-serif; margin-bottom:8px; transition:all .15s; }
.csc-copy-bol:hover { border-color:#1440fe; color:#1440fe; }
.csc-cardform { background:#fff; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,.1); padding:18px; margin:4px 14px 0; animation:csc-in .25s ease; }
.csc-finput { width:100%; border:2px solid #eee; border-radius:10px; padding:10px 14px; font-size:.85rem; font-family:'Nunito',sans-serif; color:#1a1a2e; outline:none; transition:border-color .15s; margin-bottom:8px; background:#fff; }
.csc-finput:focus { border-color:#1440fe; }
.csc-finput::placeholder { color:#bbb; }
.csc-finput-row { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.csc-pay-card-btn { width:100%; padding:12px; border-radius:10px; margin-top:4px; background:linear-gradient(135deg,#001a91,#1440fe); color:#fff; border:none; font-weight:800; font-size:.9rem; cursor:pointer; font-family:'Nunito',sans-serif; transition:opacity .15s; }
.csc-pay-card-btn:hover { opacity:.9; }
.csc-success { text-align:center; padding:8px 4px; animation:csc-in .25s ease; margin:4px 14px 0; }
.csc-success-ani { font-size:2.6rem; animation:csc-pop .5s cubic-bezier(.34,1.56,.64,1); margin-bottom:8px; }
@keyframes csc-pop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
.csc-success-ttl { font-weight:900; font-size:1.05rem; color:#1440fe; margin-bottom:6px; }
.csc-success-id { font-size:.72rem; background:#f0f2f5; border-radius:6px; padding:4px 10px; display:inline-block; margin:8px 0; color:#555; }
.csc-success-txt { font-size:.8rem; color:#666; line-height:1.6; }
.csc-replies { display:none; flex-wrap:wrap; gap:7px; padding:10px 14px 12px; background:#fff; border-top:1px solid #f0f2f5; flex-shrink:0; }
.csc-reply {
  padding:8px 16px; border-radius:22px; border:2px solid rgba(20,64,254,.25);
  font-size:.8rem; font-weight:700; cursor:pointer;
  color:#1440fe; background:rgba(20,64,254,.04);
  transition:all .15s; font-family:'Nunito',sans-serif;
}
.csc-reply:hover { background:#1440fe; color:#fff; border-color:#1440fe; }
.csc-reply.wide { flex:1; text-align:center; }
.csc-reply.sec { color:#888; border-color:#ddd; background:#fff; }
.csc-reply.sec:hover { background:#f0f2f5; color:#555; border-color:#ccc; }
.csc-bottom { display:none; border-top:1px solid #f0f2f5; background:#fff; padding:12px 14px; flex-shrink:0; }
.csc-inp-wrap { display:none; align-items:center; gap:8px; }
.csc-inp-wrap.on { display:flex; }
.csc-text-inp { flex:1; border:2px solid #eee; border-radius:24px; padding:10px 16px; font-size:.85rem; font-family:'Nunito',sans-serif; outline:none; transition:border-color .15s; background:#f8f9fb; color:#1a1a2e; }
.csc-text-inp:focus { border-color:#1440fe; background:#fff; }
.csc-text-inp::placeholder { color:#bbb; }
.csc-send { width:40px; height:40px; border-radius:50%; flex-shrink:0; background:linear-gradient(135deg,#001a91,#1440fe); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:.85rem; color:#fff; box-shadow:0 4px 12px rgba(20,64,254,.35); transition:transform .12s; }
.csc-send:hover { transform:scale(1.08); }
    `;
    document.head.appendChild(style);
  }

  /* ─── BUILD HTML ─── */
  TARGET.innerHTML = `<div class="csc-widget">
    <div class="csc-header">
      <div class="csc-logo">
        <div class="csc-logo-ico">AC</div>
        <div class="csc-logo-txt">Autopilot Consórcios<span>Consultor Digital</span></div>
      </div>
      <a class="csc-wpp-btn" href="https://wa.me/5500000000000" target="_blank">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.527 5.855L.057 23.998l6.305-1.655A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.497-5.18-1.367l-.371-.22-3.844 1.008 1.027-3.741-.241-.385A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        WhatsApp
      </a>
    </div>
    <div class="csc-steps">
      <div class="csc-step-dot active"></div><div class="csc-step-dot"></div>
      <div class="csc-step-dot"></div><div class="csc-step-dot"></div>
      <div class="csc-step-dot"></div><div class="csc-step-dot"></div>
      <div class="csc-step-dot"></div>
      <span class="csc-step-label" id="csc-step-lbl">Início</span>
    </div>
    <div class="csc-msgs" id="csc-msgs"></div>
    <div class="csc-replies" id="csc-replies"></div>
    <div class="csc-bottom" id="csc-bottom">
      <div class="csc-inp-wrap" id="csc-inp-wrap">
        <input class="csc-text-inp" id="csc-inp" placeholder="Se preferir, fale direto comigo..." autocomplete="off">
        <button class="csc-send" id="csc-send">➤</button>
      </div>
    </div>
  </div>`;

  /* ─── CONFIG PRODUTOS ─── */
  const PROD = {
    imovel:  { emoji:"🏠", label:"Imóveis",  sub:"Casa, apê, terreno",    prazo:[60,100,120,180,200,240], adminRate:0.20 },
    veiculo: { emoji:"🚗", label:"Veículos", sub:"Carro, moto, caminhão", prazo:[36,48,60,72,84],         adminRate:0.18 }
  };

  /* ─── CONFIG SLIDER por tipo e modo ─── */
 /* ─── CONFIG SLIDER por tipo e modo ─── */
  const SLIDER = {
    imovel: {
      carta:   { min:100000, max:800000, step:10000, fmtMin:"R$ 100 mil", fmtMax:"R$ 800 mil", label:"Valor da Carta de Crédito" },
      // Limite de parcela aumentado para 5500 para comportar a carta de 800k em 180x
      parcela: { min:600,    max:5500,   step:50,    fmtMin:"R$ 600",     fmtMax:"R$ 5.500",   label:"Valor da Parcela Mensal" }
    },
    veiculo: {
      carta:   { min:30000,  max:350000, step:5000,  fmtMin:"R$ 30 mil",  fmtMax:"R$ 350 mil", label:"Valor da Carta de Crédito" },
      // Limite de parcela aumentado para 7500 para comportar a carta de 350k em 60x
      parcela: { min:500,    max:7500,   step:50,    fmtMin:"R$ 500",     fmtMax:"R$ 7.500",   label:"Valor da Parcela Mensal" }
    }
  };

  const STEPS  = ["welcome","tipo","valor","prazo","sim","confirm","nome","tel","email","contrato","pagamento","pix","cartao","boleto","fim"];
  const LABELS = { welcome:"Início",tipo:"Tipo",valor:"Valor",prazo:"Prazo",sim:"Simulação",confirm:"Confirmação",nome:"Cadastro",tel:"Cadastro",email:"Cadastro",contrato:"Contrato",pagamento:"Pagamento",pix:"PIX",cartao:"Cartão",boleto:"Boleto",fim:"Concluído" };

  /* ─── STATE ─── */
  const S = { tipo:null, valor:0, parcela:0, mode:"carta", prazo:0, nome:"", tel:"", email:"", contractId:null, simData:null };

  /* ─── HELPERS ─── */
  const fmt  = v => "R$\u00A0" + v.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
  const now  = () => { const d=new Date(); return d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0"); };
  const sl   = ms => new Promise(r => setTimeout(r, ms));
  const $    = id => document.getElementById(id);
  const msgs = () => $("csc-msgs");

  // fator total aplicado sobre a carta (adm + reserva + seguro)
  function fator(tipo) {
    return tipo === "veiculo"
      ? (1 + PROD[tipo].adminRate + 0.02 + 0.008)
      : (1 + PROD[tipo].adminRate + 0.02 + 0.005);
  }
  // parcela → carta estimada para um prazo
  function parcelaToCarta(tipo, parcela, prazo) {
    return Math.round((parcela * prazo) / fator(tipo));
  }
  // carta → parcela estimada para um prazo
  function cartaToParcela(tipo, carta, prazo) {
    return Math.round((carta * fator(tipo)) / prazo);
  }
  // prazo de referência para o preview (usa prazo selecionado ou o meio da lista)
  function prazoRef(tipo) {
    const list = PROD[tipo].prazo;
    return S.prazo || list[Math.floor(list.length / 2)];
  }

  function setProgress(name) {
    const i = STEPS.indexOf(name);
    document.querySelectorAll(".csc-step-dot").forEach((d,idx) => {
      d.classList.remove("done","active");
      const p = Math.round((i / (STEPS.length - 1)) * 7);
      if (idx < p) d.classList.add("done");
      else if (idx === p) d.classList.add("active");
    });
    const lbl = $("csc-step-lbl"); if (lbl) lbl.textContent = LABELS[name] || "";
  }

  function scrollEnd() { 
    setTimeout(() => {
      const m = msgs(); 
      if(m) m.scrollTop = m.scrollHeight;
    }, 150); // 150ms é o tempo perfeito para a animação do CSS revelar o tamanho real
  }

  /* ─── MESSAGES ─── */
  function addBot(html, delay) {
    return new Promise(res => {
      setTimeout(() => {
        const row = document.createElement("div");
        row.className = "csc-row bot";
        row.innerHTML = `<div class="csc-ava">🏦</div><div style="display:flex;flex-direction:column;gap:3px;max-width:78%"><div class="csc-bub">${html}</div><span class="csc-time">${now()}</span></div>`;
        msgs().appendChild(row); scrollEnd(); res();
      }, delay || 0);
    });
  }
  function addUsr(text) {
    return new Promise(res => {
      const row = document.createElement("div");
      row.className = "csc-row usr";
      row.innerHTML = `<div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;max-width:78%"><div class="csc-bub">${text}</div><span class="csc-time">${now()}</span></div>`;
      msgs().appendChild(row); scrollEnd(); res();
    });
  }
  async function typing(ms) {
    const row = document.createElement("div");
    row.className = "csc-row bot"; row.id = "csc-typing";
    row.innerHTML = `<div class="csc-ava">🏦</div><div class="csc-bub"><div class="csc-typing"><span class="csc-tdot"></span><span class="csc-tdot"></span><span class="csc-tdot"></span></div></div>`;
    msgs().appendChild(row); scrollEnd();
    await sl(ms || 900);
    const t = $("csc-typing"); if (t) t.remove();
  }

  /* ─── CONTROLS ─── */
  function setReplies(btns) {
    const el = $("csc-replies");
    el.innerHTML = ""; el.style.display = "flex";
    $("csc-inp-wrap").classList.remove("on"); $("csc-bottom").style.display = "none";
    btns.forEach(b => {
      const btn = document.createElement("button");
      btn.className = "csc-reply" + (b.wide ? " wide" : "") + (b.sec ? " sec" : "");
      btn.textContent = b.label;
      btn.onclick = () => b.cb();
      el.appendChild(btn);
    });
  }
  function showInput(ph, cb) {
    $("csc-replies").style.display = "none";
    $("csc-bottom").style.display = "block";
    $("csc-inp-wrap").classList.add("on");
    const i = $("csc-inp"), s = $("csc-send");
    i.placeholder = ph; i.value = "";
    setTimeout(() => i.focus(), 100);
    function fire() { const v = i.value.trim(); if (!v) return; clear(); cb(v); }
    function clear() { s.onclick = null; i.onkeydown = null; $("csc-inp-wrap").classList.remove("on"); $("csc-bottom").style.display = "none"; }
    s.onclick = fire;
    i.onkeydown = e => { if (e.key === "Enter") fire(); };
  }
  function hideControls() { $("csc-replies").style.display = "none"; $("csc-bottom").style.display = "none"; }
  function inject(html) {
    const w = document.createElement("div");
    w.style.cssText = "margin:4px 0 0;animation:csc-in .25s ease;";
    w.innerHTML = html;
    msgs().appendChild(w); scrollEnd(); return w;
  }

  /* ─── CALC ─── */
  function calc(tipo, valor, prazo) {
    const p = PROD[tipo];
    const adm = valor * p.adminRate;
    const res = valor * 0.02;
    const seg = tipo === "veiculo" ? valor * 0.008 : valor * 0.005;
    const total = valor + adm + res + seg;
    const parcela = total / prazo;
    const contemp = tipo === "veiculo" ? Math.round(prazo * .18) : Math.round(prazo * .22);
    return { parcela, total, adm, res, seg, contemp, taxaAdm: (p.adminRate * 100).toFixed(0) };
  }

  /* ─── SLIDER ─── */
  function sliderHTML() {
    const modo = S.mode;
    const cfg  = SLIDER[S.tipo][modo];
    const val  = modo === "carta" ? (S.valor || cfg.min) : (S.parcela || cfg.min);
    const pct  = Math.round(((val - cfg.min) / (cfg.max - cfg.min)) * 100);
    const numFmt = val.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
    const pr = prazoRef(S.tipo);
    const preview = modo === "parcela"
      ? `≈ Carta estimada: <b>${fmt(parcelaToCarta(S.tipo, val, pr))}</b> em ${pr} meses`
      : `≈ Parcela estimada: <b>${fmt(cartaToParcela(S.tipo, val, pr))}/mês</b> em ${pr} meses`;

    return `<div class="csc-slider-wrap" id="csc-slid">
      <div class="csc-slider-top">
        <span class="csc-slider-lbl">Simular por</span>
        <div class="csc-slider-mode">
          <button class="csc-mode-btn ${modo==="carta"?"on":""}" id="csc-mc">Carta</button>
          <button class="csc-mode-btn ${modo==="parcela"?"on":""}" id="csc-mp">Parcela</button>
        </div>
      </div>
      <div class="csc-slider-lbl" id="csc-slid-lbl">${cfg.label}:</div>
      <div class="csc-val-display"><span class="prefix">R$</span><span id="csc-vnum">${numFmt}</span></div>
      <input type="range" class="csc-range" id="csc-range"
        min="${cfg.min}" max="${cfg.max}" step="${cfg.step}" value="${val}" style="--pct:${pct}%">
      <div class="csc-range-labels"><span id="csc-rmin">${cfg.fmtMin}</span><span id="csc-rmax">${cfg.fmtMax}</span></div>
      <div class="csc-slider-preview" id="csc-preview">${preview}</div>
    </div>`;
  }

  function attachSlider() {
    const r = $("csc-range"), n = $("csc-vnum");
    if (!r) return;

    function refreshPreview(val) {
      const prev = $("csc-preview"); if (!prev) return;
      const pr = prazoRef(S.tipo);
      if (S.mode === "parcela") {
        const ce = parcelaToCarta(S.tipo, val, pr);
        S.valor = ce;
        prev.innerHTML = `≈ Carta estimada: <b>${fmt(ce)}</b> em ${pr} meses`;
      } else {
        const pe = cartaToParcela(S.tipo, val, pr);
        prev.innerHTML = `≈ Parcela estimada: <b>${fmt(pe)}/mês</b> em ${pr} meses`;
      }
    }

    r.addEventListener("input", () => {
      const cfg = SLIDER[S.tipo][S.mode];
      const val = parseInt(r.value);
      const pct = Math.round((val - cfg.min) / (cfg.max - cfg.min) * 100);
      r.style.setProperty("--pct", pct + "%");
      n.textContent = val.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
      if (S.mode === "carta") S.valor = val; else S.parcela = val;
      refreshPreview(val);
    });

    function switchMode(novo) {
      S.mode = novo;
      const cfg = SLIDER[S.tipo][novo];
      const mc = $("csc-mc"), mp = $("csc-mp");
      mc.classList.toggle("on", novo === "carta");
      mp.classList.toggle("on", novo === "parcela");
      const lbl = $("csc-slid-lbl");
      if (lbl) lbl.textContent = cfg.label + ":";
      const rmin = $("csc-rmin"), rmax = $("csc-rmax");
      if (rmin) rmin.textContent = cfg.fmtMin;
      if (rmax) rmax.textContent = cfg.fmtMax;

      // converte valor atual para o novo modo usando prazo de referência
      const pr = prazoRef(S.tipo);
      let newVal;
      if (novo === "parcela") {
        const pe = cartaToParcela(S.tipo, S.valor || SLIDER[S.tipo].carta.min, pr);
        newVal = Math.max(cfg.min, Math.min(cfg.max, Math.round(pe / cfg.step) * cfg.step));
        S.parcela = newVal;
      } else {
        const ce = parcelaToCarta(S.tipo, S.parcela || SLIDER[S.tipo].parcela.min, pr);
        newVal = Math.max(cfg.min, Math.min(cfg.max, Math.round(ce / cfg.step) * cfg.step));
        S.valor = newVal;
      }

      r.min = cfg.min; r.max = cfg.max; r.step = cfg.step; r.value = newVal;
      const pct = Math.round((newVal - cfg.min) / (cfg.max - cfg.min) * 100);
      r.style.setProperty("--pct", pct + "%");
      n.textContent = newVal.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
      refreshPreview(newVal);
    }

    $("csc-mc").onclick = () => switchMode("carta");
    $("csc-mp").onclick = () => switchMode("parcela");
  }

  /* ─── HTML BUILDERS ─── */
  function resultHTML() {
    const d = S.simData, p = PROD[S.tipo];
    return `<div class="csc-result">
      <div class="csc-result-header">
        <div class="csc-result-tipo">${p.emoji} Consórcio ${p.label}</div>
        <div class="csc-result-parcela">${fmt(d.parcela)}<small>/mês</small></div>
        <div class="csc-result-credito">Carta de ${fmt(S.valor)} em ${S.prazo}x</div>
      </div>
      <div class="csc-result-grid">
        <div class="csc-ritem"><div class="csc-ritem-l">Crédito</div><div class="csc-ritem-v g">${fmt(S.valor)}</div></div>
        <div class="csc-ritem"><div class="csc-ritem-l">Total a pagar</div><div class="csc-ritem-v">${fmt(d.total)}</div></div>
        <div class="csc-ritem"><div class="csc-ritem-l">Taxa adm.</div><div class="csc-ritem-v">${d.taxaAdm}%</div></div>
        <div class="csc-ritem"><div class="csc-ritem-l">Fundo de reserva</div><div class="csc-ritem-v">2,00%</div></div>
      </div>
      <div class="csc-badge-row"><span class="csc-badge">⚡ Contemplação estimada em ~${d.contemp} meses</span></div>
    </div>`;
  }

  function contractHTML() {
    const id = "APC-" + Date.now().toString(36).toUpperCase().slice(-6);
    S.contractId = id;
    const d = S.simData;
    return `<div class="csc-contract">
      <div class="csc-contract-head">
        <div class="csc-contract-ico">📄</div>
        <div><div class="csc-contract-ttl">Contrato de Adesão</div><div class="csc-contract-id">${id} · ${now()}</div></div>
      </div>
      <div class="csc-crow"><span class="csc-crow-k">Contratante</span><span class="csc-crow-v">${S.nome}</span></div>
      <div class="csc-crow"><span class="csc-crow-k">Produto</span><span class="csc-crow-v">${PROD[S.tipo].emoji} ${PROD[S.tipo].label}</span></div>
      <div class="csc-crow"><span class="csc-crow-k">Crédito</span><span class="csc-crow-v">${fmt(S.valor)}</span></div>
      <div class="csc-crow"><span class="csc-crow-k">Parcela</span><span class="csc-crow-v">${fmt(d.parcela)}/mês</span></div>
      <div class="csc-crow"><span class="csc-crow-k">Prazo</span><span class="csc-crow-v">${S.prazo} meses</span></div>
      <div class="csc-crow"><span class="csc-crow-k">Taxa adm. total</span><span class="csc-crow-v">${d.taxaAdm}%</span></div>
      <button class="csc-sign-btn" id="csc-sign">✍️ Assinar Digitalmente</button>
      <div class="csc-signed-ok" id="csc-signed">✅ Assinado digitalmente às ${now()}</div>
    </div>`;
  }

  function pixHTML() {
    let cells = "";
    for (let i = 0; i < 49; i++) {
      const on = ((i * 17 + i * 3 + S.valor) % 11) < 5 || [0,1,2,6,7,8,14,42,43,44,48,47,46,40,41].includes(i);
      cells += `<div class="csc-qr-c" style="background:${on ? "#1a1a2e" : "#fff"}"></div>`;
    }
    return `<div class="csc-pix">
      <div class="csc-pix-title">⚡ Pagamento via PIX</div>
      <div class="csc-qr">${cells}</div>
      <div class="csc-pix-val">${fmt(S.simData.parcela)}</div>
      <div class="csc-pix-sub">1ª parcela · vence hoje</div>
      <div class="csc-pix-key">🔑 autopilotconsorcios@pix.com.br</div>
      <button class="csc-copy" id="csc-pix-copy">📋 Copiar chave PIX</button>
      <button class="csc-confirm-btn" id="csc-pix-ok">✓ Confirmar Pagamento (Demo)</button>
    </div>`;
  }

  function boletoHTML() {
    let bars = "";
    [2,1,3,1,2,2,1,3,2,1,2,3,1,2,1,3,2,1,2,2,3,1,2,1,3,2,1,2,3,1,2,1,2,3,1,2,1,3,2,1].forEach((w, i) => {
      bars += `<div class="csc-bar" style="width:${w}px;height:${i%5===0?"100%":"80%"}"></div>`;
    });
    const venc = new Date(Date.now() + 3 * 86400000).toLocaleDateString("pt-BR");
    const cod  = "34191.09008 09182.726309 " + Math.round(S.simData.parcela * 100).toString().padStart(14,"0");
    return `<div class="csc-boleto">
      <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#aaa;margin-bottom:10px;">🧾 Boleto Bancário</div>
      <div class="csc-boleto-info">
        <div><div class="csc-boleto-item-l">Valor</div><div class="csc-boleto-item-v">${fmt(S.simData.parcela)}</div></div>
        <div><div class="csc-boleto-item-l">Vencimento</div><div class="csc-boleto-item-v">${venc}</div></div>
        <div><div class="csc-boleto-item-l">Banco</div><div class="csc-boleto-item-v">341 · Itaú</div></div>
      </div>
      <div class="csc-barcode">${bars}</div>
      <div class="csc-boleto-num">${cod}</div>
      <button class="csc-copy-bol" id="csc-bol-copy">📋 Copiar código de barras</button>
      <button class="csc-confirm-btn" id="csc-bol-ok">✓ Confirmar Pagamento (Demo)</button>
    </div>`;
  }

  function cartaoHTML() {
    return `<div class="csc-cardform">
      <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#aaa;margin-bottom:10px;">💳 Cartão de Crédito</div>
      <div style="font-size:1.4rem;font-weight:900;color:#1a1a2e;margin-bottom:12px;">${fmt(S.simData.parcela)}</div>
      <input class="csc-finput" id="csc-cc" placeholder="0000 0000 0000 0000" maxlength="19">
      <input class="csc-finput" placeholder="Nome impresso no cartão">
      <div class="csc-finput-row">
        <input class="csc-finput" placeholder="MM/AA" maxlength="5">
        <input class="csc-finput" placeholder="CVV" maxlength="4">
      </div>
      <button class="csc-pay-card-btn" id="csc-card-ok">Pagar ${fmt(S.simData.parcela)}</button>
    </div>`;
  }

  /* ════ FLOW ════ */

  async function welcome() {
    setProgress("welcome"); hideControls();
    await sl(300);
    await addBot("Olá! 👋 Bem-vindo ao <b>Autopilot Consórcios</b>.<br>Vou te ajudar a encontrar o plano ideal em poucos cliques.");
    await typing(700);
    await addBot("O que você pretende <b>fazer ou conquistar</b>?");
    inject(`<div class="csc-cards">
      <div class="csc-card" id="cc-imovel">
        <div class="csc-card-ico">🏠</div>
        <div class="csc-card-lbl">Imóveis</div>
        <div class="csc-card-sub">Casa, apê, terreno</div>
        <div class="csc-card-plus">+</div>
      </div>
      <div class="csc-card" id="cc-veiculo">
        <div class="csc-card-ico">🚗</div>
        <div class="csc-card-lbl">Veículos</div>
        <div class="csc-card-sub">Carro, moto, caminhão</div>
        <div class="csc-card-plus">+</div>
      </div>
    </div>`);
    $("cc-imovel").onclick  = () => pickTipo("imovel");
    $("cc-veiculo").onclick = () => pickTipo("veiculo");
    $("csc-bottom").style.display = "block";
    $("csc-inp-wrap").classList.add("on");
    const i = $("csc-inp"), s = $("csc-send");
    i.placeholder = "Se preferir, fale direto comigo..."; i.value = "";
    function fire() {
      const v = i.value.trim().toLowerCase(); if (!v) return;
      $("csc-inp-wrap").classList.remove("on"); $("csc-bottom").style.display = "none";
      if      (v.includes("imov")||v.includes("casa")||v.includes("apto")) pickTipo("imovel");
      else if (v.includes("veic")||v.includes("carro")||v.includes("moto")||v.includes("auto")) pickTipo("veiculo");
      else { addUsr(v).then(() => typing(600).then(() => addBot("Entendido 😊 Por favor, escolha uma das opções acima para continuar."))); }
    }
    s.onclick = fire; i.onkeydown = e => { if (e.key === "Enter") fire(); };
  }

  async function pickTipo(t) {
    S.tipo = t; S.mode = "carta";
    S.valor = SLIDER[t].carta.min;
    S.parcela = SLIDER[t].parcela.min;
    setProgress("tipo"); hideControls();
    document.querySelectorAll(".csc-cards").forEach(el => el.parentElement?.remove());
    await addUsr(PROD[t].emoji + " " + PROD[t].label);
    await typing(800);
    await addBot("Ótimo! 💼 Qual o <b>valor</b> que você quer simular?");
    inject(sliderHTML());
    attachSlider();
    setReplies([{ label:"Continuar →", wide:true, cb:() => goValor() }]);
  }

  async function goValor() {
    // garante S.valor preenchido independente do modo
    if (S.mode === "parcela") {
      S.valor = parcelaToCarta(S.tipo, S.parcela || SLIDER[S.tipo].parcela.min, prazoRef(S.tipo));
    }
    if (!S.valor) S.valor = SLIDER[S.tipo].carta.min;

    setProgress("valor"); hideControls();
    document.querySelector(".csc-slider-wrap")?.parentElement?.remove();

    const label = S.mode === "parcela"
      ? `Parcela de ${fmt(S.parcela)}/mês → Carta ~${fmt(S.valor)}`
      : fmt(S.valor);
    await addUsr(label);
    await typing(700);
    await addBot("Em <b>quantas parcelas</b> você quer pagar?");
    const wrap = inject(`<div class="csc-pills">${PROD[S.tipo].prazo.map(p => `<button class="csc-pill" data-p="${p}">${p}x</button>`).join("")}</div>`);
    wrap.querySelectorAll(".csc-pill").forEach(btn => {
      btn.onclick = () => {
        wrap.querySelectorAll(".csc-pill").forEach(x => x.classList.remove("on"));
        btn.classList.add("on");
        S.prazo = parseInt(btn.dataset.p);
      };
    });
    setReplies([{ label:"Ver simulação →", wide:true, cb:() => { if (!S.prazo) return; goPrazo(); } }]);
  }

  async function goPrazo() {
    setProgress("prazo"); hideControls();
    document.querySelector(".csc-pills")?.parentElement?.remove();
    await addUsr(`${S.prazo} parcelas`);
    await typing(1200);
    S.simData = calc(S.tipo, S.valor, S.prazo);
    await addBot("Calculei sua simulação! 🎯");
    inject(resultHTML());
    await typing(600);
    await addBot(`Parcela de <b class="g">${fmt(S.simData.parcela)}/mês</b> para uma carta de <b>${fmt(S.valor)}</b>. O que achou? 😊`);
    setReplies([
      { label:"✅ Quero contratar!", wide:true, cb:() => goConfirm() },
      { label:"🔄 Ajustar valores", sec:true, cb:() => { hideControls(); addUsr("Quero ajustar").then(() => sl(400).then(() => pickTipo(S.tipo))); } },
    ]);
  }

  async function goConfirm() {
    setProgress("confirm"); hideControls();
    await addUsr("Quero contratar!");
    await typing(800);
    await addBot("Excelente! 🎉 Preciso de alguns dados para gerar seu contrato.<br>Qual é o seu <b>nome completo</b>?");
    showInput("Seu nome completo…", v => { S.nome = v; addUsr(v).then(() => goTel()); });
  }

  async function goTel() {
    setProgress("tel"); await typing(700);
    await addBot(`Prazer, <b>${S.nome.split(" ")[0]}</b>! 😊 Qual é o seu <b>telefone com DDD</b>?`);
    showInput("(00) 00000-0000", v => { S.tel = v; addUsr(v).then(() => goEmail()); });
  }

  async function goEmail() {
    setProgress("email"); await typing(600);
    await addBot("E seu <b>e-mail</b> para receber o contrato?");
    showInput("seuemail@exemplo.com", v => { S.email = v; addUsr(v).then(() => goContrato()); });
  }

  async function goContrato() {
    setProgress("contrato"); hideControls();
    await typing(1600);
    await addBot("Gerando seu contrato… ✅");
    inject(contractHTML());
    await typing(500);
    await addBot("Leia e assine digitalmente para avançar. ✍️");
    setTimeout(() => {
      const btn = $("csc-sign"), sig = $("csc-signed");
      if (!btn) return;
      btn.onclick = async () => {
        btn.textContent = "Assinando…"; btn.disabled = true;
        await sl(1400);
        btn.style.display = "none"; sig.style.display = "block";
        await sl(600);
        await addBot(`Contrato assinado! ✅ Cópia enviada para <b>${S.email}</b>.<br>Vamos ao <b>pagamento da 1ª parcela</b> de <b class="g">${fmt(S.simData.parcela)}</b>.`, 500);
        goPagamento();
      };
    }, 300);
  }

  async function goPagamento() {
    setProgress("pagamento");
    inject(`<div class="csc-pay-btns">
      <div class="csc-pay-opt" id="csc-p-pix"><div class="csc-pay-ico" style="background:rgba(20,64,254,.08)">⚡</div><div class="csc-pay-info"><div class="csc-pay-name">PIX</div><div class="csc-pay-desc">Confirmação imediata</div></div><span class="csc-pay-arrow">›</span></div>
      <div class="csc-pay-opt" id="csc-p-card"><div class="csc-pay-ico" style="background:rgba(20,64,254,.08)">💳</div><div class="csc-pay-info"><div class="csc-pay-name">Cartão de Crédito</div><div class="csc-pay-desc">Visa, Master, Elo</div></div><span class="csc-pay-arrow">›</span></div>
      <div class="csc-pay-opt" id="csc-p-bol"><div class="csc-pay-ico" style="background:rgba(26,26,46,.06)">🧾</div><div class="csc-pay-info"><div class="csc-pay-name">Boleto Bancário</div><div class="csc-pay-desc">Vence em 3 dias úteis</div></div><span class="csc-pay-arrow">›</span></div>
    </div>`);
    hideControls();
    setTimeout(() => {
      $("csc-p-pix").onclick  = () => goPix();
      $("csc-p-card").onclick = () => goCartao();
      $("csc-p-bol").onclick  = () => goBoleto();
    }, 200);
  }

  async function goPix() {
    setProgress("pix"); hideControls();
    document.querySelector(".csc-pay-btns")?.parentElement?.remove();
    await addUsr("PIX"); await typing(1000);
    inject(pixHTML());
    setTimeout(() => {
      const cp = $("csc-pix-copy"), ok = $("csc-pix-ok");
      if (cp) cp.onclick = () => { cp.textContent = "✓ Chave copiada!"; cp.style.background = "#dde5ff"; };
      if (ok) ok.onclick = () => goFim();
    }, 200);
  }

  async function goCartao() {
    setProgress("cartao"); hideControls();
    document.querySelector(".csc-pay-btns")?.parentElement?.remove();
    await addUsr("Cartão de Crédito"); await typing(800);
    inject(cartaoHTML());
    setTimeout(() => {
      const cc = $("csc-cc"), ok = $("csc-card-ok");
      if (cc) cc.addEventListener("input", e => { let v = e.target.value.replace(/\D/g,"").slice(0,16); e.target.value = v.replace(/(.{4})/g,"$1 ").trim(); });
      if (ok) ok.onclick = () => goFim();
    }, 200);
  }

  async function goBoleto() {
    setProgress("boleto"); hideControls();
    document.querySelector(".csc-pay-btns")?.parentElement?.remove();
    await addUsr("Boleto Bancário"); await typing(1100);
    inject(boletoHTML());
    setTimeout(() => {
      const cp = $("csc-bol-copy"), ok = $("csc-bol-ok");
      if (cp) cp.onclick = () => { cp.textContent = "✓ Código copiado!"; };
      if (ok) ok.onclick = () => goFim();
    }, 200);
  }

  async function goFim() {
    setProgress("fim"); hideControls();
    await typing(1600);
    inject(`<div class="csc-success">
      <div class="csc-success-ani">🎉</div>
      <div class="csc-success-ttl">Pagamento Confirmado!</div>
      <div class="csc-success-id">${S.contractId}</div>
      <div class="csc-success-txt">Sua <b style="color:#1440fe">cota está ativa</b>!<br>Você receberá os detalhes em <b>${S.email}</b>.<br><br>Bem-vindo(a) ao grupo Autopilot Consórcios! 🚀</div>
    </div>`);
    await typing(700);
    await addBot(`Qualquer dúvida, fale conosco pelo WhatsApp. Obrigado, <b>${S.nome.split(" ")[0]}</b>! 😊`);
    setTimeout(() => {
      setReplies([{ label:"🔄 Nova simulação", wide:true, cb:() => {
        msgs().innerHTML = "";
        Object.assign(S, { tipo:null, valor:0, parcela:0, mode:"carta", prazo:0, nome:"", tel:"", email:"", contractId:null, simData:null });
        welcome();
      }}]);
    }, 1000);
  }

  /* ─── BOOT ─── */
  welcome();

})();
