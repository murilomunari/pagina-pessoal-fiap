const menuToggle = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector(".navegacao");
const linksMenu = document.querySelectorAll(".navegacao a");
const accordionTriggers = document.querySelectorAll(".accordion-trigger");
const botaoVoltarTopo = document.querySelector(".voltar-topo");

if (menuToggle && menuPrincipal) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuPrincipal.classList.toggle("is-open", !expanded);
  });

  linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuPrincipal.classList.remove("is-open");
    });
  });
}

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const painelId = trigger.getAttribute("aria-controls");
    const painelAtual = painelId ? document.getElementById(painelId) : null;
    const expandedAtual = trigger.getAttribute("aria-expanded") === "true";

    accordionTriggers.forEach((outroTrigger) => {
      const outroPainelId = outroTrigger.getAttribute("aria-controls");
      const outroPainel = outroPainelId ? document.getElementById(outroPainelId) : null;
      outroTrigger.setAttribute("aria-expanded", "false");
      if (outroPainel) {
        outroPainel.hidden = true;
      }
    });

    trigger.setAttribute("aria-expanded", String(!expandedAtual));
    if (painelAtual) {
      painelAtual.hidden = expandedAtual;
    }
  });
});

if (botaoVoltarTopo) {
  const atualizarBotaoTopo = () => {
    const mostrarBotao = window.scrollY > 300;
    botaoVoltarTopo.classList.toggle("is-visible", mostrarBotao);
  };

  window.addEventListener("scroll", atualizarBotaoTopo);
  atualizarBotaoTopo();

  botaoVoltarTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
