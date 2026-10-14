/* ==========================================================
   CONFIGURAÇÃO — edite aqui os dados de contato da Bry
   ========================================================== */
const BRY = {
  whatsapp: "5500000000000", // DDI + DDD + número, só dígitos. Ex.: 5587999999999
  whatsappMsg: "Olá, Bry! Vim pelo site e quero transformar minha história em uma marca valente.",
  email: "contato@brymarketing.com.br",
  address: "Atendimento em todo o Brasil",
};

/* ---------- Links de contato ---------- */
const waUrl = `https://wa.me/${BRY.whatsapp}?text=${encodeURIComponent(BRY.whatsappMsg)}`;
document.querySelectorAll(".js-whatsapp").forEach((a) => (a.href = waUrl));
document.querySelectorAll(".js-email").forEach((a) => {
  a.href = `mailto:${BRY.email}`;
  a.textContent = BRY.email;
});
document.querySelectorAll(".js-address").forEach((el) => (el.textContent = BRY.address));
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Faixas em loop (serviços + tipográfica) ----------
   Repete o grupo até cobrir a tela e duplica o conjunto:
   a animação anda -50% e recomeça sem emenda visível. */
const loops = [...document.querySelectorAll("[data-loop]")];
const buildLoop = (track) => {
  const base = track.firstElementChild;
  [...track.children].slice(1).forEach((g) => g.remove());
  const groupW = base.offsetWidth;
  const copies = Math.max(1, Math.ceil(window.innerWidth / groupW)) * 2;
  for (let i = 1; i < copies; i++) track.appendChild(base.cloneNode(true)).setAttribute("aria-hidden", "true");
  // velocidade constante em px/s, independente do tamanho da tela
  const speed = Number(track.dataset.speed) || 70;
  track.style.setProperty("--loop-dur", `${(groupW * copies) / 2 / speed}s`);
};
document.fonts.ready.then(() => loops.forEach(buildLoop));
let loopTimer;
window.addEventListener("resize", () => {
  clearTimeout(loopTimer);
  loopTimer = setTimeout(() => loops.forEach(buildLoop), 200);
});

/* ---------- Header ao rolar ---------- */
const header = document.querySelector(".header");
const onScrollHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
onScrollHeader();

/* ---------- Menu mobile ---------- */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const setMenu = (open) => {
  burger.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
  header.classList.toggle("menu-open", open);
};
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  // pequeno atraso em cascata para elementos irmãos
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 80}ms`;
  io.observe(el);
});

/* ---------- Link ativo no menu ---------- */
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...nav.querySelectorAll("a[href^='#']")];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

/* ---------- Parallax do hero ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroBg = document.querySelector(".hero__bg");

let ticking = false;
const onScroll = () => {
  onScrollHeader();
  if (reduceMotion || ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) heroBg.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;

    ticking = false;
  });
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
