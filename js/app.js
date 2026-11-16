(() => {
  const D = window.DECK, app = document.getElementById("app"), flare = document.querySelector(".flare");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const em = (s) => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const vid = (name, alt, cls) => `<div class="media ${cls || ""}"><video muted loop playsinline preload="none" poster="media/${name}.jpg" data-src="media/${name}.mp4" aria-label="${esc(alt || "")}"></video><span class="tag mono">Live</span></div>`;
  const SW = [["S", "Situation", "The problem"], ["T", "Task", "The needs"], ["A", "Action", "The solution"], ["R", "Result", "The outcome"], ["(T)", "Tradeoffs", "Lessons learned"]];
  const order = D.lanes.flatMap((l) => l[2]); const byKey = (k) => D.decks.find((d) => d.key === k);

  // theme
  const root = document.documentElement, tbtn = document.getElementById("theme");
  const setTheme = (t) => { root.dataset.theme = t; tbtn.textContent = t === "dark" ? "Light" : "Dark"; try { localStorage.setItem("jm-theme", t); } catch (e) {} };
  let saved = null; try { saved = localStorage.getItem("jm-theme"); } catch (e) {}
  setTheme(saved || "dark"); tbtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // lazy video: load and play only while on screen
  const vio = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target;
    if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; if (!reduce) v.play().catch(() => {}); } else if (!v.paused) v.pause(); }), { rootMargin: "200px" });

  const home = () => {
    let n = 0;
    return `<section class="hero"><div class="wrap">
      <p class="mono eyebrow">Jesse Myer · Enterprise and AI Architect</p>
      <h1>Twelve programs, <em>one</em> method</h1>
      <p class="lede">Twelve business problems, each solved with architecture, each told the same way.</p></div>
      <div class="splash">${vid("mega_splash2", "One marker travels through five stations, S, T, A, R and T for tradeoffs, then twelve deck tiles fill in", "wide")}</div>
      <div class="wrap"><p class="emps">Nationwide. UnitedHealth. Travelers. Waste Management. Aetna. Lincoln Financial.</p></div>
    </section><div class="wrap">
    <section id="index">
      <h2 class="sec">Pick a <em>program</em></h2>
      <p class="secsub">Three lanes, twelve programs. Each one stands alone: situation, task, action, result, then tradeoffs.</p>
      <div class="lanes">${D.lanes.map((L, li) => `<div class="lane rv">
        <div class="lanehd"><div class="ico"><video muted loop playsinline preload="none" poster="media/lane_${li}.jpg" data-src="media/lane_${li}.mp4" aria-hidden="true"></video></div><div><h3>${esc(L[0])}</h3><p>${esc(L[1])}</p></div></div>
        ${L[2].map((k) => { const d = byKey(k); n++; return `<a class="card" href="#/p/${k}" title="${esc(d.one)}"><span class="n">${String(n).padStart(2, "0")}</span><span class="nm">${esc(d.name)}<span class="wh">${esc(d.where.split(" · ")[0])}</span></span><span class="mt">${esc(d.big)}<small>${esc(d.bigCap)}</small></span><span class="go" aria-hidden="true">›</span></a>`; }).join("")}
      </div>`).join("")}</div>
      <div class="why rv"><h3>WHY THIS MATTERS FOR AWS TMEGS</h3><p><strong>Telecom, media, entertainment, games and sports customers run live, customer-facing systems at scale, through mergers, spin-offs and peak events.</strong> A Solutions Architect earns their trust by turning the business problem into an architecture and being plain about what it costs. Each program is one proof of that.</p></div>
    </section>
    <section class="about" id="about">
      <div class="who rv">
        <img class="hs" src="img/headshot.png" alt="Portrait of Jesse Myer" width="170" height="170">
        <div><p class="mono eyebrow">Questions, and where to find more</p><h2>Thank <em>you</em></h2><div class="nm">Jesse Myer</div><div class="rl">Enterprise and AI Architect</div><div class="tg">Clarity from complexity.</div></div>
        <div class="nums"><div><b>20+</b><span>Years in technology</span></div><div><b>7</b><span>Fortune 100 firms</span></div><div><b>$3.3B</b><span>Largest M&amp;A led</span></div><div><b>$4.7B+</b><span>Est. value influenced</span></div></div>
        <a class="helmet" href="https://myersmiles.com" rel="noopener"><img src="img/helmet.jpg" alt="Jesse Myer in a racing helmet, lit half teal and half red; photo by Myers Miles" loading="lazy"><span class="mono">Off the clock: track, camera, cockpit</span></a>
      </div>
      <div style="margin-top:26px" class="rv">${vid("career_mega", "Career track from AOL in 2005 through JPMorgan Chase, Nationwide, UnitedHealth, Travelers, Waste Management, Aetna and Lincoln Financial to NHPRI, the current client")}</div>
      <div class="links rv">
        <a class="l" href="https://bio.jessemyer.com" rel="noopener"><small>CV, resumes, contact form</small>bio.jessemyer.com</a>
        <a class="l" href="https://jessemyer.com/perspective" rel="noopener"><small>Articles on architecture and AI</small>jessemyer.com/perspective</a>
        <a class="l" href="https://www.linkedin.com/in/jessemyer" rel="noopener"><small>LinkedIn</small>linkedin.com/in/jessemyer</a>
        <img class="qr" src="img/qr_bio.png" alt="QR code for bio.jessemyer.com" loading="lazy">
        <a class="l" href="https://github.com/JesseMyer/miskatonic" rel="noopener"><small>Miskatonic: a governed AI platform for EA</small>github.com/JesseMyer/miskatonic</a>
        <a class="l" href="https://myersmiles.com" rel="noopener"><small>MyersMiles: racing, photography, travel</small>myersmiles.com</a>
        <a class="l" href="https://github.com/JesseMyer/12ProjectsSTAR" rel="noopener"><small>This site, source</small>github.com/JesseMyer/12ProjectsSTAR</a>
      </div>
      <div class="made rv" id="made"><p class="mono eyebrow">Colophon</p><h2 class="sec">How this <em>deck</em> was made</h2><p class="secsub"><strong>I directed, reviewed and corrected.</strong> Claude wrote the code that drew every slide, every animation and this site, from the record I already keep.</p>${vid("made_sankey", "Sankey diagram: the CV and resume suite, session handoffs, bio.jessemyer.com, the Amazon brief, the Leadership Principles, public benchmarks, the Miskatonic visual language and a reference board flow into a story spec and a design system, then a deck engine, animation code and an honesty pass, and out as twelve program decks, a mega deck, a website and PDF backups, with a review loop back from Jesse")}</div>
      <div class="creds rv"><span>TOGAF 9 Master Architect</span><span>SEI CPAA</span><span>ITIL v3</span><span>AWS Cloud Practitioner</span><span>SAFe</span><span>Remote-native since 2013</span></div>
    </section></div>`;
  };

  const head = (i, d) => `<div class="sthead"><p class="mono eyebrow">${SW[i][0]} · ${SW[i][1]} · ${SW[i][2]}</p><div class="chips">${(d.lps[i] || []).map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div></div><h2>${em(d.titles[i])}</h2>`;
  const program = (d) => {
    const i = order.indexOf(d.key), prev = byKey(order[(i + 11) % 12]), next = byKey(order[(i + 1) % 12]);
    return `<nav class="star" aria-label="Sections"><div class="wrap">${SW.map((s, k) => `<a href="#/p/${d.key}/${k}" data-k="${k}"><b>${s[0]}</b><span>${s[1]}<small>${s[2]}</small></span></a>`).join("")}<a class="idx" href="#/"><span>◇ Index</span></a><i class="bar"></i></div></nav>
    <section class="cover"><video muted loop playsinline preload="none" poster="media/${d.key}_cover.jpg" data-src="media/${d.key}_cover.mp4" aria-label="${esc(d.cover.alt || "")}"></video><div class="scrim"></div>
      <div class="ct"><div><p class="mono eyebrow">${esc(d.where)}</p><h1>${em(d.coverTitle)}</h1>
      <p><span class="mono ow">The old way</span>${esc(d.cover.old)}</p><p><span class="mono nw">The new way</span>${esc(d.cover.neu)}</p><p class="payoff">${esc(d.cover.payoff)}</p><div class="chips"><span class="chip">${esc(d.where.split(" · ")[0])}</span>${d.tech.map((t) => `<span class="chip tech">${esc(t)}</span>`).join("")}</div></div></div></section>
    <div class="wrap">
    <section class="st" id="s0">${head(0, d)}<p class="sub">${esc(d.p.sub)}</p><div class="two"><div class="rv"><div class="box"><h4>OBJECTIVE</h4><p>${esc(d.p.objective)}</p></div>${d.p.stats.map((s) => `<div class="stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("")}</div><div class="rv">${vid(d.key + "_lanes", d.p.alt)}</div></div></section>
    <section class="st" id="s1">${head(1, d)}<p class="sub">${esc(d.n.sub)}</p><div class="rv">${vid(d.key + "_needs", d.n.alt)}</div><div class="four">${d.n.rows.map((r, k) => `<div class="rv"><b>${esc(d.n.kp[k][0])}</b><span class="k">${esc(d.n.kp[k][1])}</span><h5>${esc(r[0])}</h5><p>${esc(r[1])}</p></div>`).join("")}</div></section>
    <section class="st" id="s2">${head(2, d)}<p class="sub">${esc(d.s.sub)}</p><div class="rv">${vid(d.key + "_flow", d.s.alt)}</div></section>
    <section class="st" id="s3">${head(3, d)}<p class="sub">${esc(d.o.sub)}</p><div class="two"><div class="rv">${vid(d.key + "_ring", d.o.alt)}</div><div class="rv"><div class="box gold"><h4>${esc(d.o.resLabel)}</h4><div class="res">${d.o.results.map((s) => `<div class="stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("")}</div></div><div class="box" style="margin-top:14px"><h4>THE PRINCIPLE BEHIND IT</h4><p style="font-weight:400;font-style:italic">${esc(cap(d.pattern))}</p></div></div></div><p class="close rv">${esc(d.o.close)}</p></section>
    <section class="st" id="s4">${head(4, d)}<p class="sub">An ATAM-style read: four quality attributes, the decision behind each, what it cost, and what I learned.</p><div class="rv">${vid(d.key + "_uplift", d.t.alt)}</div>
      <div class="four">${d.t.at.map((r, k) => `<div class="qa rv" style="--qc:var(--q${k})"><h5><span class="num">${k + 1}</span>${esc(r[0])}</h5><p><span class="lbl sp">Sensitivity point</span>${esc(r[1])}</p><p><span class="lbl tp">Tradeoff point</span>${esc(r[2])}</p></div>`).join("")}</div>
      <div class="box gold lessons rv"><h4>LESSONS LEARNED</h4><ul>${d.o.carry.map((c) => `<li>${esc(c)}.</li>`).join("")}</ul><p class="role"><span>FOR THIS ROLE</span>${esc(d.aws)}</p></div></section>
    <section class="st" id="s5"><div class="sthead"><p class="mono eyebrow">Backup for Q&amp;A · Leadership Principles, evidence map</p></div><p class="sub" style="margin-top:10px">${esc(d.name)} against the sixteen principles.</p>
      <div class="lpgrid">${D.lpn.map((n, k) => d.lp[k] ? `<div class="lp rv"><h5>${esc(n)}</h5><p>${esc(d.lp[k])}</p></div>` : `<div class="lp off rv"><h5>${esc(n)}</h5><p>Not shown in this project.</p></div>`).join("")}</div></section>
    <div class="pager"><a class="btn" href="#/p/${prev.key}">‹ ${esc(prev.name)}</a><a class="btn" href="#/">◇ Index</a><a class="btn" href="#/p/${next.key}">${esc(next.name)} ›</a></div></div>`;
  };

  let spy = null;
  const moveFlare = (el, instant) => { if (!el) return; const r = el.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.bottom;
    if (reduce || instant) gsap.set(flare, { x, y, opacity: .9 }); else gsap.to(flare, { x, y, opacity: .9, duration: .9, ease: "power3.out" }); };
  const setActive = (k) => { const nav = document.querySelector(".star"); if (!nav) return; const as = nav.querySelectorAll("a[data-k]");
    as.forEach((a) => a.classList.toggle("on", +a.dataset.k === k)); const a = as[Math.min(k, 4)], bar = nav.querySelector(".bar"), w = nav.querySelector(".wrap").getBoundingClientRect(), r = a.getBoundingClientRect();
    gsap.to(bar, { left: r.left - w.left + nav.querySelector(".wrap").scrollLeft, width: r.width, duration: reduce ? 0 : .45, ease: "power3.out" }); moveFlare(a); };

  const render = () => {
    const h = location.hash.replace(/^#\/?/, "").split("/"); if (spy) { spy.disconnect(); spy = null; } ScrollTrigger.getAll().forEach((t) => t.kill());
    const d = h[0] === "p" && byKey(h[1]);
    if (d) { const same = app.dataset.key === d.key; if (!same) { app.innerHTML = program(d); app.dataset.key = d.key; document.title = d.name + " · Jesse Myer"; }
      const target = h[2] != null ? document.getElementById("s" + h[2]) : null; if (target) target.scrollIntoView(); else if (!same) scrollTo(0, 0);
      spy = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(+e.target.id.slice(1)); }), { rootMargin: "-35% 0px -60% 0px" });
      document.querySelectorAll(".st").forEach((s) => spy.observe(s)); requestAnimationFrame(() => setActive(h[2] != null ? +h[2] : 0));
    } else { app.innerHTML = home(); app.dataset.key = ""; document.title = "Jesse Myer · Twelve programs, one method";
      if (h[0] === "about") setTimeout(() => document.getElementById("about").scrollIntoView(), 60); else scrollTo(0, 0);
      const hero = document.querySelector(".hero h1"); if (hero) { const r = hero.getBoundingClientRect(); gsap.set(flare, { x: innerWidth * .82, y: r.top + scrollY * 0 + r.height + 30 }); gsap.fromTo(flare, { opacity: 0, scale: .4 }, { opacity: .85, scale: 1, duration: reduce ? 0 : 1.4, ease: "power2.out" }); } }
    document.querySelectorAll("video[data-src]").forEach((v) => vio.observe(v));
    if (!reduce) { gsap.utils.toArray(".rv").forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: .7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
      gsap.from(".hero h1, .cover h1", { y: 26, opacity: 0, duration: .9, ease: "power3.out" }); }
    app.focus({ preventScroll: true });
  };
  addEventListener("hashchange", render); addEventListener("resize", () => { const on = document.querySelector(".star a.on"); if (on) setActive(+on.dataset.k); });
  addEventListener("scroll", () => { if (!document.querySelector(".star")) gsap.to(flare, { opacity: Math.max(0, .85 - scrollY / 500), duration: .2, overwrite: "auto" }); }, { passive: true });
  addEventListener("keydown", (e) => { if (e.target.closest("input,textarea") || e.metaKey || e.ctrlKey || e.altKey) return; const k = app.dataset.key; if (!k) return; const i = order.indexOf(k);
    if (e.key === "ArrowRight") location.hash = "#/p/" + order[(i + 1) % 12]; else if (e.key === "ArrowLeft") location.hash = "#/p/" + order[(i + 11) % 12]; else if (e.key === "i" || e.key === "Escape") location.hash = "#/"; });
  render();
})();
