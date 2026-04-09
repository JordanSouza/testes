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
