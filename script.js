/* =========================================================================
   EDU MINIS — script.js
   -------------------------------------------------------------------------
   1. Menu mobile (abrir/fechar)
   2. Efeito de "revelar" os cards do catálogo ao rolar a página
   3. Filtro de categorias do catálogo
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------------------------------
     1. MENU MOBILE
  ----------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks  = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // fecha o menu ao clicar em qualquer link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------------------
     2. REVELAR CARDS AO ROLAR
     (sem isso, os cards ficam com opacity:0 travado no CSS)
  ----------------------------------------------------------------- */
  const cards = document.querySelectorAll(".card");

  if ("IntersectionObserver" in window && cards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(card => observer.observe(card));
  } else {
    // navegador sem suporte (ou JS bloqueado): mostra tudo direto
    cards.forEach(card => card.classList.add("is-visible"));
  }

  /* -----------------------------------------------------------------
     3. FILTRO DE CATEGORIAS DO CATÁLOGO
  ----------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const categoria = button.dataset.categoria;

      filterButtons.forEach(b => b.classList.remove("is-active"));
      button.classList.add("is-active");

      cards.forEach(card => {
        const categorias = (card.dataset.categoria || "").split(" ");
        const mostrar = categoria === "todos" || categorias.includes(categoria);
        card.style.display = mostrar ? "" : "none";
      });
    });
  });

});
