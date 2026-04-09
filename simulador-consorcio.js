<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulador Autopilot Consórcios</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* Reset and base styles for the page background */
        body {
            background-color: #05080F; /* Dark background for the whole page */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        }

        /* --- INÍCIO DO CSS DO SIMULADOR (DARK THEME) --- */
        #simulador-consorcio { width: 100%; max-width: 420px; margin: 0 auto; }
        .csc-widget {
          font-family: 'Nunito', sans-serif; background: #0B0F19; border-radius: 22px;
          box-shadow: 0 12px 60px rgba(0,0,0,.4), 0 2px 8px rgba(0,0,0,.2);
          overflow: hidden; display: flex; flex-direction: column;
          max-height: 680px; min-height: 540px; position: relative; color: #e2e8f0;
        }
        .csc-header {
          background: #0B0F19; border-bottom: 1px solid #1A2235;
          padding: 18px 20px 16px; display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0; position: relative; overflow: hidden;
        }
        .csc-logo { display:flex; align-items:center; gap:8px; z-index:1; }
        .csc-logo-ico {
          width:34px; height:34px; background: transparent; border-radius:8px; display:flex; align-items:center; justify-content:center;
          font-size:.85rem; font-weight:900; color:#fff; border:1px solid rgba(255,255,255,.2);
        }
        .csc-logo-txt { color:#fff; font-weight:800; font-size:.9rem; line-height:1.2; }
        .csc-logo-txt span { display:block; font-size:.62rem; font-weight:600; opacity:.6; letter-spacing:.04em; text-transform:uppercase; }
        .csc-wpp-btn {
          z-index:1; background: #25D366; border-radius:20px; padding:6px 12px; display:flex; align-items:center; gap:6px;
          color:#fff; font-size:.72rem; font-weight:800; cursor:pointer;
          text-decoration:none; transition:transform .15s;
          letter-spacing:.03em; text-transform:uppercase; border: none;
        }
        .csc-wpp-btn:hover { transform: scale(1.05); }
        .csc-steps { background:#0B0F19; border-bottom:1px solid #1A2235; padding:8px 20px; display:flex; align-items:center; gap:8px; flex-shrink:0; }
        .csc-step-dot { width:8px; height:8px; border-radius:50%; background:#1A2235; transition:all .3s; flex-shrink:0; }
        .csc-step-dot.done  { background:#3B82F6; }
        .csc-step-dot.active { background:#fff; width:22px; border-radius:4px; }
        .csc-step-label { margin-left:auto; font-size:.65rem; font-weight:700; color:#64748B; letter-spacing:.05em; text-transform:uppercase; }
        .csc-msgs { flex:1; overflow-y:auto; padding:18px 16px 10px; display:flex; flex-direction:column; gap:10px; scroll-behavior:smooth; background:#0B0F19; }
        .csc-msgs::-webkit-scrollbar { width:3px; }
        .csc-msgs::-webkit-scrollbar-thumb { background:#1A2235; border-radius:2px; }
        .csc-row { display:flex; align-items:flex-end; gap:8px; }
        .csc-row.usr { flex-direction:row-reverse; }
        .csc-ava {
          width:30px; height:30px; border-radius:50%; flex-shrink:0; background:#1A2235; border: 1px solid #2A354D;
          display:flex; align-items:center; justify-content:center; font-size:.8rem; color: #fff;
        }
        .csc-bub {
          max-width:78%; padding:11px 14px; border-radius:18px; font-size:.88rem; line-height:1.55;
          animation:csc-in .2s ease; position:relative; word-wrap:break-word;
        }
        @keyframes csc-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        .csc-row.bot .csc-bub { background:#161D2B; color:#F8FAFC; border-bottom-left-radius:4px; border: 1px solid #1A2235; }
        .csc-row.usr .csc-bub { background:#1A3DF9; color:#fff; border-bottom-right-radius:4px; }
        .csc-bub b { font-weight:800; color: #fff; }
        .csc-bub .g { color:#60A5FA; }
        .csc-time { font-size:.58rem; color:#475569; margin-top:2px; align-self:flex-end; }
        .csc-row.usr .csc-time { text-align:right; }
        .csc-typing { display:flex; gap:4px; align-items:center; padding:8px 2px; }
        .csc-tdot { width:7px; height:7px; border-radius:50%; background:#475569; animation:csc-td .8s infinite ease-in-out; }
        .csc-tdot:nth-child(2) { animation-delay:.14s; }
        .csc-tdot:nth-child(3) { animation-delay:.28s; }
        @keyframes csc-td { 0%,60%,100%{transform:translateY(0);background:#475569} 30%{transform:translateY(-5px);background:#fff} }
        .csc-cards { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:4px 14px 0; animation:csc-in .25s ease; }
        .csc-card {
          background:#161D2B; border:1px solid #1A2235; border-radius:16px; padding:18px 12px 14px; text-align:center; cursor:pointer;
          transition:all .18s; display:flex; flex-direction:column; align-items:center; gap:6px;
        }
        .csc-card:hover { border-color:#1A3DF9; transform:translateY(-2px); box-shadow:0 6px 24px rgba(26,61,249,.15); }
        .csc-card-ico {
          width:60px; height:60px; border-radius:50%; background:#1A2235;
          display:flex; align-items:center; justify-content:center; font-size:1.7rem;
        }
        .csc-card-lbl { font-weight:800; font-size:.85rem; color:#fff; }
        .csc-card-sub { font-size:.68rem; color:#64748B; line-height:1.4; }
        .csc-card-plus {
          width:22px; height:22px; border-radius:50%; border:1px solid #2A354D; color:#94A3B8; background:#0B0F19;
          display:flex; align-items:center; justify-content:center; font-size:.9rem; font-weight:700; transition:all .15s;
        }
        .csc-card:hover .csc-card-plus { background:#1A3DF9; color:#fff; border-color:#1A3DF9; }
        .csc-slider-wrap { background:#161D2B; border-radius:16px; padding:18px 16px; border: 1px solid #1A2235; margin:4px 14px 0; animation:csc-in .25s ease; }
        .csc-slider-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .csc-slider-lbl { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#64748B; }
        .csc-slider-mode { display:flex; background:#0B0F19; border-radius:20px; padding:3px; gap:0; }
        .csc-mode-btn { padding:5px 12px; border-radius:16px; font-size:.7rem; font-weight:700; border:none; cursor:pointer; background:transparent; color:#64748B; transition:all .15s; font-family:'Nunito',sans-serif; }
        .csc-mode-btn.on { background:#1A3DF9; color:#fff; }
        .csc-val-display { font-size:2rem; font-weight:900; color:#fff; text-align:center; margin:8px 0; letter-spacing:-.03em; }
        .csc-val-display span.prefix { font-size:1rem; font-weight:600; color:#64748B; margin-right:4px; }
        .csc-range { width:100%; height:5px; -webkit-appearance:none; appearance:none; border-radius:10px; outline:none; cursor:pointer; background:linear-gradient(90deg,#1A3DF9 var(--pct,10%),#1A2235 var(--pct,10%)); }
        .csc-range::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:#1A3DF9; cursor:pointer; border:3px solid #fff; box-shadow:0 2px 8px rgba(26,61,249,.4); }
        .csc-range-labels { display:flex; justify-content:space-between; font-size:.67rem; color:#64748B; margin-top:6px; font-weight:600; }
        .csc-pills { display:flex; flex-wrap:wrap; gap:7px; margin:4px 14px 0; animation:csc-in .25s ease; }
        .csc-pill { padding:8px 16px; border-radius:22px; border:1px solid #1A2235; font-size:.8rem; font-weight:700; cursor:pointer; background:#161D2B; transition:all .15s; color:#94A3B8; font-family:'Nunito',sans-serif; }
        .csc-pill:hover { border-color:#1A3DF9; color:#fff; }
        .csc-pill.on { background:#1A3DF9; border-color:#1A3DF9; color:#fff; }
        .csc-result { background:#161D2B; border-radius:16px; overflow:hidden; border: 1px solid #1A2235; margin:4px 14px 0; animation:csc-in .25s ease; }
        .csc-result-header { background:linear-gradient(120deg,#1A3DF9,#0B0F19); padding:14px 16px; color:#fff; }
        .csc-result-tipo { font-size:.65rem; font-weight:700; letter-spacing:.09em; text-transform:uppercase; opacity:.75; margin-bottom:2px; }
        .csc-result-parcela { font-size:1.8rem; font-weight:900; letter-spacing:-.03em; }
        .csc-result-parcela small { font-size:.85rem; font-weight:600; opacity:.75; margin-left:3px; }
        .csc-result-credito { font-size:.78rem; opacity:.8; margin-top:2px; }
        .csc-result-grid { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:#0B0F19; }
        .csc-ritem { background:#161D2B; padding:11px 14px; }
        .csc-ritem-l { font-size:.62rem; text-transform:uppercase; letter-spacing:.07em; font-weight:700; color:#64748B; margin-bottom:3px; }
        .csc-ritem-v { font-size:.88rem; font-weight:800; color:#fff; }
        .csc-ritem-v.g { color:#60A5FA; }
        .csc-badge-row { padding:10px 14px; border-top: 1px solid #1A2235; }
        .csc-badge { display:inline-flex; align-items:center; gap:5px; background:rgba(96,165,250,.1); border:1px solid rgba(96,165,250,.2); border-radius:20px; padding:4px 10px; font-size:.7rem; font-weight:700; color:#60A5FA; }
        .csc-success { text-align:center; padding:8px 4px; animation:csc-in .25s ease; margin:4px 14px 0; }
        .csc-success-ani { font-size:2.6rem; animation:csc-pop .5s cubic-bezier(.34,1.56,.64,1); margin-bottom:8px; }
        .csc-success-ttl { font-weight:900; font-size:1.1rem; color:#fff; margin-bottom:6px; }
        .csc-success-txt { font-size:.82rem; color:#94A3B8; line-height:1.5; }
        .csc-replies { display:none; flex-wrap:wrap; gap:7px; padding:10px 14px 12px; background:#0B0F19; border-top:1px solid #1A2235; flex-shrink:0; }
        .csc-reply { padding:8px 16px; border-radius:22px; border:1px solid #1A3DF9; font-size:.8rem; font-weight:700; cursor:pointer; color:#1A3DF9; background:#161D2B; transition:all .15s; font-family:'Nunito',sans-serif; }
        .csc-reply:hover { background:#1A3DF9; color:#fff; }
        .csc-reply.wide { flex:1; text-align:center; }
        .csc-reply.sec { color:#94A3B8; border-color:#2A354D; background:#161D2B; }
        .csc-reply.sec:hover { background:#1A2235; color:#fff; border-color:#475569; }
        .csc-bottom { display:none; border-top:1px solid #1A2235; background:#0B0F19; padding:12px 14px; flex-shrink:0; }
        .csc-inp-wrap { display:none; align-items:center; gap:8px; }
        .csc-inp-wrap.on { display:flex; }
        .csc-text-inp { flex:1; border:1px solid #2A354D; border-radius:24px; padding:10px 16px; font-size:.85rem; font-family:'Nunito',sans-serif; outline:none; transition:border-color .15s; background:#161D2B; color:#fff; }
        .csc-text-inp:focus { border-color:#1A3DF9; }
        .csc-text-inp::placeholder { color:#475569; }
        .csc-send { width:40px; height:40px; border-radius:50%; flex-shrink:0; background:linear-gradient(135deg,#1A3DF9,#0e26a8); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:.85rem; color:#fff; box-shadow:0 4px 12px rgba(26,61,249,.35); transition:transform .12s; }
        .csc-send:hover { transform:scale(1.08); }
    </style>
</head>
<body>

<div id="simulador-consorcio">
    <div class="csc-widget">
        <div class="csc-header">
            <div class="csc-logo">
                <div class="csc-logo-ico">AC</div>
                <div class="csc-logo-txt">Autopilot Consórcios<span>Simulador Digital</span></div>
            </div>
            <a class="csc-wpp-btn" href="https://wa.me/5500000000000" target="_blank">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.527 5.855L.057 23.998l6.305-1.655A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.497-5.18-1.367l-.371-.22-3.844 1.008 1.027-3.741-.241-.385A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                WhatsApp
            </a>
        </div>
        <div class="csc-steps">
            <div class="csc-step-dot active"></div><div class="csc-step-dot"></div>
            <div class="csc-step-dot"></div><div class="csc-step-dot"></div>
            <div class="csc-step-dot"></div><div class="csc-step-dot"></div>
            <div class="csc-step-dot"></div><div class="csc-step-dot"></div>
            <span class="csc-step-label" id="csc-step-lbl">Início</span>
        </div>
        <div class="csc-msgs" id="csc-msgs"></div>
        <div class="csc-replies" id="csc-replies"></div>
        <div class="csc-bottom" id="csc-bottom">
            <div class="csc-inp-wrap" id="csc-inp-wrap">
                <input type="text" class="csc-text-inp" id="csc-inp" placeholder="" autocomplete="off">
                <button class="csc-send" id="csc-send">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const PROD = {
    imovel:  { emoji:"🏠", label:"Imóveis",  sub:"Casa, apê, terreno",      min:100000, max:800000, step:10000, fmtMin:"R$ 100 mil", fmtMax:"R$ 800 mil",  prazo:[60,100,120,180,200,240], adminRate:0.20 },
    veiculo: { emoji:"🚗", label:"Veículos", sub:"Carro, moto, caminhão",   min:30000,  max:350000, step:5000,  fmtMin:"R$ 30 mil",  fmtMax:"R$ 350 mil", prazo:[36,48,60,72,84],         adminRate:0.18 }
  };
  
  const STEPS = ["welcome","tipo","valor","prazo","sim","confirm","nome","nasc","tel","email","fim"];
  const LABELS = { welcome:"Início", tipo:"Tipo", valor:"Valor", prazo:"Prazo", sim:"Simulação", confirm:"Confirmação", nome:"Cadastro", nasc:"Data Nasc.", tel:"Telefone", email:"E-mail", fim:"Concluído" };
  const S = { tipo:null, valor:0, prazo:0, nome:"", nasc:"", tel:"", email:"", simData:null };

  const fmt  = v => "R$ " + v.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
  const now  = () => { const d=new Date(); return d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0"); };
  const sl   = ms => new Promise(r => setTimeout(r, ms));
  const $    = id => document.getElementById(id);
  const msgs = () => $("csc-msgs");

  function setProgress(name) {
    const i = STEPS.indexOf(name);
    document.querySelectorAll(".csc-step-dot").forEach((d,idx) => {
      d.classList.remove("done","active");
      const p = Math.round((i / (STEPS.length - 1)) * (document.querySelectorAll(".csc-step-dot").length - 1));
      if (idx < p) d.classList.add("done");
      else if (idx === p) d.classList.add("active");
    });
    const lbl = $("csc-step-lbl");
    if (lbl) lbl.textContent = LABELS[name] || "";
  }

  // --- MOTOR DE SCROLL APRIMORADO ---
  // Adiciona um pequeno atraso para o DOM renderizar novas caixas/botões antes de rolar
  function scrollEnd() { 
      setTimeout(() => {
          const m = msgs(); 
          if(m) m.scrollTop = m.scrollHeight; 
      }, 150); 
  }

  function isValidDOB(dateStr) {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return false;
    const d = parseInt(parts[0], 10), m = parseInt(parts[1], 10), y = parseInt(parts[2], 10);
    if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900) return false;
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return false;

    const today = new Date();
    let age = today.getFullYear() - y;
    if (today.getMonth() < m - 1 || (today.getMonth() === m - 1 && today.getDate() < d)) age--;
    
    return age >= 18 && age <= 100; 
  }

  function addBot(html, delay) {
    return new Promise(res => {
      setTimeout(() => {
        const row = document.createElement("div"); row.className = "csc-row bot";
        row.innerHTML = `<div class="csc-ava">AC</div><div style="display:flex;flex-direction:column;gap:3px;max-width:78%"><div class="csc-bub">${html}</div><span class="csc-time">${now()}</span></div>`;
        msgs().appendChild(row); scrollEnd(); res();
      }, delay || 0);
    });
  }

  function addUsr(text) {
    return new Promise(res => {
      const row = document.createElement("div"); row.className = "csc-row usr";
      row.innerHTML = `<div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;max-width:78%"><div class="csc-bub">${text}</div><span class="csc-time">${now()}</span></div>`;
        msgs().appendChild(row); scrollEnd(); res();
    });
  }

  async function typing(ms) {
    const row = document.createElement("div"); row.className = "csc-row bot"; row.id = "csc-typing";
    row.innerHTML = `<div class="csc-ava">AC</div><div class="csc-bub"><div class="csc-typing"><span class="csc-tdot"></span><span class="csc-tdot"></span><span class="csc-tdot"></span></div></div>`;
    msgs().appendChild(row); scrollEnd();
    await sl(ms || 900);
    const t = $("csc-typing"); if (t) t.remove();
  }

  function inject(html) {
    const w = document.createElement("div"); w.style.cssText = "margin:4px 0 0;animation:csc-in .25s ease;"; w.innerHTML = html;
    msgs().appendChild(w); scrollEnd(); return w;
  }

  function setReplies(btns) {
    const el = $("csc-replies"); el.innerHTML = ""; el.style.display = "flex";
    $("csc-inp-wrap").classList.remove("on"); $("csc-bottom").style.display = "none";
    btns.forEach(b => {
      const btn = document.createElement("button"); btn.className = "csc-reply" + (b.wide ? " wide" : "") + (b.sec ? " sec" : "");
      btn.textContent = b.label; btn.onclick = () => b.cb(); el.appendChild(btn);
    });
    // GATILHO: Rola a tela quando os botões de opção aparecerem
    scrollEnd();
  }

  function showInput(ph, cb, maskType = null) {
    $("csc-replies").style.display = "none";
    $("csc-bottom").style.display = "block";
    $("csc-inp-wrap").classList.add("on");
    const i = $("csc-inp"), s = $("csc-send");
    i.placeholder = ph; i.value = "";
    setTimeout(() => i.focus(), 100);

    i.oninput = null;

    if (maskType === 'date') {
        i.oninput = e => {
            let v = e.target.value.replace(/\D/g,"");
            if (v.length > 2) v = v.replace(/^(\d{2})(\d)/g,"$1/$2");
            if (v.length > 5) v = v.replace(/^(\d{2})\/(\d{2})(\d)/g,"$1/$2/$3");
            e.target.value = v.slice(0, 10);
        };
    } else if (maskType === 'phone') {
        i.oninput = e => {
            let v = e.target.value.replace(/\D/g,"");
            if (v.length > 2) v = v.replace(/^(\d{2})(\d)/g,"($1) $2");
            if (v.length > 7) v = v.replace(/(\d{5})(\d)/,"$1-$2");
            e.target.value = v.slice(0, 15);
        };
    }

    function fire() { const v = i.value.trim(); if (!v) return; clear(); cb(v); }
    function clear() { s.onclick = null; i.onkeydown = null; i.oninput = null; $("csc-inp-wrap").classList.remove("on"); $("csc-bottom").style.display = "none"; }
    s.onclick = fire; i.onkeydown = e => { if (e.key === "Enter") fire(); };
    
    // GATILHO: Rola a tela quando a caixa de digitação/teclado aparecer
    scrollEnd();
  }

  function hideControls() { $("csc-replies").style.display = "none"; $("csc-bottom").style.display = "none"; }

  function calc(tipo, valor, prazo) {
    const p = PROD[tipo];
    const adm = valor * p.adminRate, res = valor * 0.02, seg = tipo === "veiculo" ? valor * 0.008 : valor * 0.005;
    const total = valor + adm + res + seg, parcela = total / prazo, contemp = tipo === "veiculo" ? Math.round(prazo * .18) : Math.round(prazo * .22);
    return { parcela, total, adm, res, seg, contemp, taxaAdm: (p.adminRate * 100).toFixed(0) };
  }

  function sliderHTML() {
    const p = PROD[S.tipo], val = S.valor || p.min, pct = Math.round(((val - p.min) / (p.max - p.min)) * 100);
    return `<div class="csc-slider-wrap" id="csc-slid">
      <div class="csc-slider-top"><span class="csc-slider-lbl">Simular por</span>
        <div class="csc-slider-mode"><button class="csc-mode-btn on" id="csc-mc">Carta</button><button class="csc-mode-btn" id="csc-mp">Parcela</button></div>
      </div>
      <div class="csc-slider-lbl">Escolha o valor:</div>
      <div class="csc-val-display"><span class="prefix">R$</span><span id="csc-vnum">${val.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}</span></div>
      <input type="range" class="csc-range" id="csc-range" min="${p.min}" max="${p.max}" step="${p.step}" value="${val}" style="--pct:${pct}%">
      <div class="csc-range-labels"><span>${p.fmtMin}</span><span>${p.fmtMax}</span></div>
    </div>`;
  }

  function attachSlider() {
    const r = $("csc-range"), n = $("csc-vnum"); if (!r) return;
    r.addEventListener("input", () => {
      const p = PROD[S.tipo], pct = Math.round((r.value - p.min) / (p.max - p.min) * 100);
      r.style.setProperty("--pct", pct + "%"); S.valor = parseInt(r.value);
      n.textContent = S.valor.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
    });
    const mc = $("csc-mc"), mp = $("csc-mp");
    mc.onclick = () => { mc.classList.add("on"); mp.classList.remove("on"); }; mp.onclick = () => { mp.classList.add("on"); mc.classList.remove("on"); };
  }

  function resultHTML() {
    const d = S.simData, p = PROD[S.tipo];
    return `<div class="csc-result">
      <div class="csc-result-header"><div class="csc-result-tipo">${p.emoji} Consórcio ${p.label}</div>
        <div class="csc-result-parcela">${fmt(d.parcela)}<small>/mês</small></div><div class="csc-result-credito">Carta de ${fmt(S.valor)} em ${S.prazo}x</div>
      </div>
      <div class="csc-result-grid">
        <div class="csc-ritem"><div class="csc-ritem-l">Crédito</div><div class="csc-ritem-v g">${fmt(S.valor)}</div></div>
        <div class="csc-ritem"><div class="csc-ritem-l">Total a pagar</div><div class="csc-ritem-v">${fmt(d.total)}</div></div>
      </div>
      <div class="csc-badge-row"><span class="csc-badge">⚡ Contemplação estimada em ~${d.contemp} meses</span></div>
    </div>`;
  }

  async function welcome() {
    setProgress("welcome"); hideControls(); await sl(300);
    await addBot("Olá! 👋 Bem-vindo ao <b>Simulador Autopilot Consórcios</b>.<br>Vou te ajudar a encontrar o plano ideal em poucos cliques.");
    await typing(700); await addBot("O que você pretende <b>fazer ou conquistar</b>?");
    inject(`<div class="csc-cards">
      <div class="csc-card" id="cc-imovel"><div class="csc-card-ico">🏠</div><div class="csc-card-lbl">Imóveis</div><div class="csc-card-sub">Casa, apê, terreno</div><div class="csc-card-plus">+</div></div>
      <div class="csc-card" id="cc-veiculo"><div class="csc-card-ico">🚗</div><div class="csc-card-lbl">Veículos</div><div class="csc-card-sub">Carro, moto, caminhão</div><div class="csc-card-plus">+</div></div>
    </div>`);
    $("cc-imovel").onclick = () => pickTipo("imovel"); $("cc-veiculo").onclick = () => pickTipo("veiculo");
    
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
    scrollEnd();
  }

  async function pickTipo(t) {
    S.tipo = t; setProgress("tipo"); hideControls(); document.querySelectorAll(".csc-cards").forEach(el => el.parentElement?.remove());
    await addUsr(PROD[t].emoji + " " + PROD[t].label); await typing(800);
    await addBot("Ótimo! 💼 Qual o <b>valor da carta de crédito</b> que você precisa?");
    inject(sliderHTML()); S.valor = PROD[t].min; attachSlider();
    setReplies([{ label:"Continuar →", wide:true, cb:() => goValor() }]);
  }

  async function goValor() {
    if (!S.valor) S.valor = PROD[S.tipo].min;
    setProgress("valor"); hideControls(); document.querySelector(".csc-slider-wrap")?.parentElement?.remove();
    await addUsr(fmt(S.valor)); await typing(700);
    await addBot("Em <b>quantas parcelas</b> você quer pagar?");
    const wrap = inject(`<div class="csc-pills">${PROD[S.tipo].prazo.map(p => `<button class="csc-pill" data-p="${p}">${p}x</button>`).join("")}</div>`);
    wrap.querySelectorAll(".csc-pill").forEach(btn => {
      btn.onclick = () => { wrap.querySelectorAll(".csc-pill").forEach(x => x.classList.remove("on")); btn.classList.add("on"); S.prazo = parseInt(btn.dataset.p); };
    });
    setReplies([{ label:"Ver simulação →", wide:true, cb:() => { if (!S.prazo) return; goPrazo(); } }]);
  }

  async function goPrazo() {
    setProgress("prazo"); hideControls(); document.querySelector(".csc-pills")?.parentElement?.remove();
    await addUsr(`${S.prazo} parcelas`); await typing(1200);
    S.simData = calc(S.tipo, S.valor, S.prazo);
    await addBot("Calculei sua simulação! 🎯"); inject(resultHTML()); await typing(600);
    await addBot(`Parcela de <b class="g">${fmt(S.simData.parcela)}/mês</b>. O que achou? 😊`);
    setReplies([
      { label:"✅ Sim, quero avançar!", wide:true, cb:() => goConfirm() },
      { label:"🔄 Ajustar valores", sec:true, cb:() => { hideControls(); addUsr("Quero ajustar").then(() => sl(400).then(() => pickTipo(S.tipo))); } },
    ]);
  }

  async function goConfirm() {
    setProgress("cadastro"); hideControls(); await addUsr("Quero avançar!"); await typing(800);
    await addBot("Excelente! 🎉 Preciso de poucos dados para reservar sua simulação.<br>Qual é o seu <b>nome completo</b>?");
    showInput("Seu nome completo...", v => { S.nome = v; addUsr(v).then(() => goNasc()); });
  }

  async function goNasc() {
    setProgress("nasc"); await typing(700);
    await addBot(`Prazer, <b>${S.nome.split(" ")[0]}</b>! Qual é a sua <b>Data de Nascimento</b>?`);
    showInput("DD/MM/AAAA", v => {
      if(isValidDOB(v)) {
        S.nasc = v; addUsr(v).then(() => goTel());
      } else {
        addUsr(v).then(() => typing(500).then(() => { addBot("Data inválida ou restrita a menores de 18 anos. Digite novamente:"); goNasc(); }));
      }
    }, 'date'); 
  }

  async function goTel() {
    setProgress("tel"); await typing(700);
    await addBot(`Ótimo! Qual é o seu <b>telefone com DDD</b>?`);
    showInput("(00) 00000-0000", v => {
      if(v.length >= 14) { 
        S.tel = v; addUsr(v).then(() => goEmail());
      } else {
        addUsr(v).then(() => typing(500).then(() => { addBot("Telefone incompleto. Digite novamente com DDD:"); goTel(); }));
      }
    }, 'phone'); 
  }

  async function goEmail() {
    setProgress("email"); await typing(600);
    await addBot("E por último, seu <b>e-mail</b> para enviarmos o resumo oficial:");
    showInput("seuemail@exemplo.com", v => {
      if (v.includes("@") && v.includes(".")) {
        S.email = v; addUsr(v).then(() => goFim());
      } else {
        addUsr(v).then(() => typing(500).then(() => { addBot("Parece que falta algo no e-mail. Digite novamente:"); goEmail(); }));
      }
    });
  }

  async function goFim() {
    setProgress("fim"); hideControls(); await typing(1200);

    const numWhatsapp = "5584998982888"; // <--- SEU NÚMERO DE ATENDIMENTO AQUI
    const msg = `Olá! Fiz uma simulação no site e quero solicitar minha cota.\n\n*Resumo da Simulação:*\n- Produto: Consórcio de ${PROD[S.tipo].label}\n- Crédito: ${fmt(S.valor)}\n- Parcela: ${fmt(S.simData.parcela)} em ${S.prazo}x\n\n*Meus Dados:*\n- Nome: ${S.nome}\n- Nasc: ${S.nasc}\n- Tel: ${S.tel}\n- E-mail: ${S.email}\n\nAguardo o link para pagamento da adesão e o contrato!`;
    const wppLink = `https://wa.me/${numWhatsapp}?text=${encodeURIComponent(msg)}`;

    inject(`<div class="csc-success" style="padding-bottom:0;">
      <div class="csc-success-ani">🚀</div>
      <div class="csc-success-ttl">Cadastro Finalizado!</div>
      <div class="csc-success-txt">Falta apenas um detalhe para garantir sua cota de <b style="color:#60A5FA">${fmt(S.valor)}</b>.</div>
    </div>`);

    await typing(800);
    await addBot("Para emitirmos seu contrato oficial e o link seguro de pagamento da adesão, clique no botão abaixo e fale direto com nossa central:");

    setTimeout(() => {
      inject(`<div style="margin: 0 14px 10px;">
        <a href="${wppLink}" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:8px; padding:14px; border-radius:12px; background:linear-gradient(135deg,#25D366,#128C7E); color:#fff; text-decoration:none; font-weight:800; font-size:.9rem; box-shadow:0 6px 20px rgba(37,211,102,.3); transition:transform .2s;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.527 5.855L.057 23.998l6.305-1.655A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.497-5.18-1.367l-.371-.22-3.844 1.008 1.027-3.741-.241-.385A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Solicitar Contrato e Pagamento
        </a>
      </div>`);

      setReplies([{ label:"🔄 Nova simulação", wide:true, cb:() => {
        msgs().innerHTML = ""; Object.assign(S, { tipo:null, valor:0, prazo:0, nome:"", nasc:"", tel:"", email:"", simData:null }); welcome();
      }}]);
    }, 500);
  }

  welcome();
});
</script>
</body>
</html>
