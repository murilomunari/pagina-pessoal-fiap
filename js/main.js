const menuToggle = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector(".navegacao");
const linksMenu = document.querySelectorAll(".navegacao a");
const accordionTriggers = document.querySelectorAll(".accordion-trigger");
const botaoVoltarTopo = document.querySelector(".voltar-topo");
const formulario = document.querySelector(".formulario");

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

// Validação de formulário
if (formulario) {
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoMensagem = document.getElementById("mensagem");

  const validacoes = {
    nome: (valor) => {
      if (valor.trim().length < 3) {
        return "Nome deve ter pelo menos 3 caracteres";
      }
      return null;
    },
    email: (valor) => {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(valor)) {
        return "Email deve ser válido (exemplo: seu@email.com)";
      }
      return null;
    },
    mensagem: (valor) => {
      if (valor.trim().length < 10) {
        return "Mensagem deve ter pelo menos 10 caracteres";
      }
      return null;
    },
  };

  const exibirErro = (campo, mensagem) => {
    let container = campo.parentElement;
    let erroExistente = container.querySelector(".formulario__erro");

    if (erroExistente) {
      erroExistente.remove();
    }

    if (mensagem) {
      const elementoErro = document.createElement("span");
      elementoErro.className = "formulario__erro";
      elementoErro.textContent = mensagem;
      container.appendChild(elementoErro);
      campo.classList.add("formulario__input--erro");
    } else {
      campo.classList.remove("formulario__input--erro");
    }
  };

  const validarCampo = (campo, nomeValidacao) => {
    const erro = validacoes[nomeValidacao](campo.value);
    exibirErro(campo, erro);
    return !erro;
  };

  campoNome.addEventListener("blur", () => validarCampo(campoNome, "nome"));
  campoEmail.addEventListener("blur", () => validarCampo(campoEmail, "email"));
  campoMensagem.addEventListener("blur", () => validarCampo(campoMensagem, "mensagem"));

  const criarModal = (dados) => {
    const modal = document.createElement("div");
    modal.className = "modal modal--open";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "modal-titulo");
    modal.setAttribute("aria-modal", "true");

    modal.innerHTML = `
      <div class="modal__conteudo">
        <button class="modal__fechar" aria-label="Fechar modal" type="button">
          <span>&times;</span>
        </button>
        <div class="modal__header">
          <h2 id="modal-titulo">✓ Mensagem Enviada com Sucesso!</h2>
        </div>
        <div class="modal__body">
          <p><strong>Obrigado</strong> por entrar em contato! Recebi sua mensagem e responderei em breve.</p>
          <div class="modal__dados">
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>Email:</strong> ${dados.email}</p>
            <p><strong>Mensagem:</strong></p>
            <p class="modal__mensagem-texto">"${dados.mensagem}"</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const botaoFechar = modal.querySelector(".modal__fechar");
    botaoFechar.addEventListener("click", () => {
      modal.classList.remove("modal--open");
      setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("modal--open");
        setTimeout(() => modal.remove(), 300);
      }
    });
  };

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeValido = validarCampo(campoNome, "nome");
    const emailValido = validarCampo(campoEmail, "email");
    const mensagemValida = validarCampo(campoMensagem, "mensagem");

    if (nomeValido && emailValido && mensagemValida) {
      const dados = {
        nome: campoNome.value,
        email: campoEmail.value,
        mensagem: campoMensagem.value,
        dataEnvio: new Date().toLocaleString("pt-BR"),
      };

      console.log("📧 Dados do formulário enviados:", dados);

      criarModal(dados);

      formulario.reset();
      exibirErro(campoNome, null);
      exibirErro(campoEmail, null);
      exibirErro(campoMensagem, null);
    }
  });
}
