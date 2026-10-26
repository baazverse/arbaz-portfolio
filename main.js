import { SITE, PROJECTS } from "./projects.js";
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wa = t => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t || SITE.whatsappText)}`;
$$("[data-wa]").forEach(a => { a.href = wa(); a.target = "_blank"; a.rel = "noopener noreferrer"; });
$$("[data-mail]").forEach(a => a.href = `mailto:${SITE.email}`);
$$("[data-li]").forEach(a => a.href = SITE.linkedin);
$("#yr").textContent = new Date().getFullYear();
const av = $("[data-avail]"); SITE.showAvailability ? $("span", av).textContent = SITE.availabilityText : av.remove();

// Gallery
const live = PROJECTS.filter(p => p.published);
const ratio = p => p.aspectRatio.replace(":", " / ");
const card = p => {
  const b = document.createElement("button");
  b.className = "card rv" + (p.featured ? " feat" : ""); b.type = "button";
  b.setAttribute("aria-label", `Play ${p.title}`);
  b.innerHTML = `<div class="thumb" style="aspect-ratio:${ratio(p)}"><img src="${p.posterSrc}" alt="Poster frame from ${p.title}" loading="lazy" decoding="async"><span class="play"></span></div>
  <div class="meta"><small>${p.category} · ${p.platform || ""}</small><h3>${p.title}</h3><p>${p.description}</p></div>`;
  b.onclick = () => open(p, b); return b;
};
const work = live.filter(p => p.slot === "work").sort((a, b) => !!b.featured - !!a.featured);
$("#grid").append(...work.map(card));
if (!work.length) $("#work").hidden = true;
const ab = live.find(p => p.slot === "about"); if (ab) $("#about-media").append(card(ab));

// Player (native <dialog>: focus trap, Escape, backdrop handled by the browser)
const dlg = $("#player"), vid = $("video", dlg), err = $(".perr", dlg), tabs = $(".ptabs", dlg);
let opener, cur;
const load = src => { err.hidden = true; vid.src = src; vid.load(); vid.play().catch(() => {}); };
function open(p, from) {
  opener = from; cur = p; $("#ptitle").textContent = p.title; $("#pdesc").textContent = p.description;
  vid.poster = p.posterSrc; vid.style.aspectRatio = ratio(p); vid.style.maxWidth = p.aspectRatio === "9:16" ? "min(100%,calc(72vh*9/16))" : "100%";
  tabs.hidden = !p.beforeSrc; $$("button", tabs).forEach(x => x.setAttribute("aria-pressed", x.dataset.t === "after"));
  dlg.showModal(); load(p.videoSrc);
}
vid.onerror = () => err.hidden = false;
$$("button", tabs).forEach(x => x.onclick = () => { $$("button", tabs).forEach(y => y.setAttribute("aria-pressed", y === x)); load(x.dataset.t === "before" ? cur.beforeSrc : cur.videoSrc); });
$(".x", dlg).onclick = () => dlg.close();
dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
dlg.onclose = () => { vid.pause(); vid.removeAttribute("src"); vid.load(); opener && opener.focus(); };

// Testimonials: only render real, enabled entries
if (SITE.showTestimonials && SITE.testimonials.length) {
  const s = $("#testimonials"); s.hidden = false;
  s.innerHTML = "<h2>Kind Words.</h2>" + SITE.testimonials.map(t => `<blockquote><p></p><footer></footer></blockquote>`).join("");
  $$("blockquote", s).forEach((q, i) => { $("p", q).textContent = SITE.testimonials[i].quote; $("footer", q).textContent = `${SITE.testimonials[i].name}, ${SITE.testimonials[i].role}`; });
}

// Nav, progress, reveal
const nav = $("#nav"), bar = $(".progress"), burger = $(".burger"), menu = $("#menu");
let tick = false;
addEventListener("scroll", () => { if (tick) return; tick = true; requestAnimationFrame(() => {
  nav.classList.toggle("on", scrollY > 40);
  bar.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})`; tick = false; }); }, { passive: true });
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
$$("a", menu).forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .1 });
$$("h2,.sub,.skills li,.steps li,.svc article,.why p,.about p").forEach(el => el.classList.add("rv")); $$(".rv").forEach(el => io.observe(el));

// Enquiry form: validates, then hands off via WhatsApp/email (or POSTs if formEndpoint is set). Never claims it was stored.
const form = $("#form"), note = $("#formnote"), sub = $("button", form);
sub.textContent = SITE.formEndpoint ? "Send enquiry" : "Send via WhatsApp";
form.addEventListener("submit", async e => {
  e.preventDefault(); let ok = true;
  $$(".err", form).forEach(x => x.remove());
  $$("input,select,textarea", form).forEach(f => {
    const bad = !f.checkValidity(); f.setAttribute("aria-invalid", bad); if (bad) { ok = false;
      const m = document.createElement("span"); m.className = "err"; m.textContent = f.type === "email" ? "Enter a valid email address." : f.name === "msg" ? "Add at least 15 characters about your project." : "This field is required."; f.after(m); } });
  if (!ok) { note.textContent = "Please fix the highlighted fields."; $("[aria-invalid=true]", form).focus(); return; }
  const d = Object.fromEntries(new FormData(form));
  const text = `Hi Arbaz, I'm ${d.name} (${d.email}). Project type: ${d.type}.${d.budget ? " Budget: " + d.budget + "." : ""}\n\n${d.msg}`;
  if (SITE.formEndpoint) {
    try { const r = await fetch(SITE.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw 0; note.textContent = "Sent. I'll reply by email."; form.reset(); } catch { note.textContent = "Couldn't send. Use WhatsApp or email instead."; }
  } else { open_(wa(text)); note.textContent = "Opening WhatsApp with your message. Nothing is stored on this site."; }
});
const open_ = u => window.open(u, "_blank", "noopener,noreferrer");
