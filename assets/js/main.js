(() => {
  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const icons = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    quant: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/></svg>',
    ml: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>',
    software: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 22V4M4 4h13l-2 4 2 4H4"/></svg>',
    medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="15" r="6"/><path d="M8.5 10 6 2h4l2 5 2-5h4l-2.5 8"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/></svg>',
    repo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  };

  const linkHTML = (l) => {
    const ico = /github\.com/.test(l.url) ? icons.github : icons.arrow;
    return `<a class="link" href="${esc(l.url)}" target="_blank" rel="noopener">${ico}${esc(l.label)}</a>`;
  };

  // Profile links
  const p = D.profile;
  const linkMap = { github: p.github, linkedin: p.linkedin, resume: p.resume, instagram: p.instagram, mailto: `mailto:${p.email}` };
  $$("[data-link]").forEach((a) => (a.href = linkMap[a.dataset.link]));
  $("#email-text").textContent = p.email;
  $("#year").textContent = new Date().getFullYear();

  // Skills
  $("#skills").innerHTML = Object.entries(D.skills)
    .map(([k, list]) => `<div class="skill-row"><h4>${esc(k)}</h4><div class="tags">${list.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div></div>`)
    .join("");

  // Experience
  $("#timeline").innerHTML = D.experience
    .map(
      (e) => `
      <li class="tl-item reveal">
        <div class="tl-meta">
          <div class="tl-period">${esc(e.period)}</div>
          <div class="tl-place">${esc(e.place)}</div>
        </div>
        <article class="card tl-card">
          <div class="tl-head">
            <h3>${esc(e.role)}</h3>
            ${e.badge ? `<span class="badge">★ ${esc(e.badge)}</span>` : ""}
          </div>
          <div class="tl-org">${esc(e.org)}</div>
          <ul>${e.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
          <div class="metrics">${e.metrics.map((m) => `<span class="metric">${esc(m)}</span>`).join("")}</div>
          <div class="tags">${e.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
        </article>
      </li>`
    )
    .join("");

  // Projects
  const grid = $("#projects-grid");
  grid.innerHTML = D.projects
    .map(
      (pr) => `
      <article class="card project cat-${pr.category} reveal" data-cat="${pr.category}">
        <div class="project-top">
          <span class="project-icon">${icons[pr.category]}</span>
          <span class="project-period">${esc(pr.period)}</span>
        </div>
        <h3>${esc(pr.title)}${pr.featured ? '<span class="featured-flag">NEW</span>' : ""}</h3>
        <div class="project-sub">${esc(pr.subtitle)}</div>
        <div class="project-metric">${esc(pr.metric)}</div>
        <p class="desc">${esc(pr.desc)}</p>
        <div class="tags">${pr.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        ${pr.links.length ? `<div class="links">${pr.links.map(linkHTML).join("")}</div>` : ""}
      </article>`
    )
    .join("");

  $$(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".filter").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn);
      });
      const f = btn.dataset.filter;
      $$(".project", grid).forEach((card) => {
        card.classList.toggle("is-hidden", f !== "all" && card.dataset.cat !== f);
        card.classList.add("is-visible");
      });
    })
  );

  // Competitions
  $("#comps").innerHTML = D.competitions
    .map(
      (c) => `
      <article class="card comp ${c.highlight ? "is-highlight" : ""} reveal">
        <div class="comp-rank">${esc(c.rank)}</div>
        <h3>${esc(c.title)}</h3>
        <div class="comp-org">${esc(c.org)} · <span class="mono">${esc(c.date)}</span></div>
        <p>${esc(c.desc)}</p>
        ${c.links.length ? `<div class="links">${c.links.map(linkHTML).join("")}</div>` : ""}
      </article>`
    )
    .join("");

  // Achievements
  $("#achievements-grid").innerHTML = D.achievements
    .map(
      (a) => `
      <article class="card ach reveal">
        <span class="ach-icon">${icons[a.icon] || icons.star}</span>
        <div><h3>${esc(a.title)}</h3><p>${esc(a.desc)}</p></div>
      </article>`
    )
    .join("");

  // Leadership
  $("#leadership-grid").innerHTML = D.leadership
    .map(
      (l) => `
      <article class="card lead-card reveal">
        <span class="tl-period">${esc(l.period)}</span>
        <h3>${esc(l.role)}</h3>
        <div class="tl-org">${esc(l.org)}</div>
        <ul>${l.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </article>`
    )
    .join("");
  $("#extra").innerHTML = D.extracurricular.map((x) => `<li>${esc(x)}</li>`).join("");

  // Education
  $("#edu").innerHTML = D.education
    .map(
      (e) => `
      <div class="card edu-item reveal">
        <h3>${esc(e.degree)}</h3>
        <div class="score"><strong>${esc(e.score)}</strong><span>${esc(e.period)}</span></div>
        <div class="school">${esc(e.school)}</div>
      </div>`
    )
    .join("");
  $("#courses").innerHTML = D.courses.map((c) => `<li>${esc(c)}</li>`).join("");

  // GitHub repos (live)
  const langColors = {
    Python: "#3572A5", JavaScript: "#f1e05a", Java: "#b07219", "Jupyter Notebook": "#DA5B0B",
    TypeScript: "#3178c6", "C++": "#f34b7d", CSS: "#563d7c", HTML: "#e34c26",
  };
  const repoKey = (url) => url.toLowerCase().replace(/\/tree\/.*$/, "").replace(/\/$/, "");
  const knownDesc = {};
  [...D.projects, ...D.competitions].forEach((item) =>
    item.links.forEach((l) => {
      if (/github\.com\/[^/]+\/[^/]+/.test(l.url)) knownDesc[repoKey(l.url)] = item.desc;
    })
  );
  const renderRepos = (repos) => {
    $("#repos").innerHTML = repos
      .map(
        (r) => `
        <a class="card repo reveal" href="${esc(r.html_url)}" target="_blank" rel="noopener">
          <div class="repo-name">${icons.repo}${esc(r.name)}</div>
          <p>${esc(r.description || knownDesc[repoKey(r.html_url)] || "View the repository on GitHub.")}</p>
          <div class="repo-meta">
            ${r.language ? `<span><i class="lang-dot" style="background:${langColors[r.language] || "#a8a29e"}"></i>${esc(r.language)}</span>` : ""}
            <span>★ ${r.stargazers_count}</span>
            <span>Updated ${new Date(r.pushed_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
          </div>
        </a>`
      )
      .join("");
    observe($$("#repos .reveal"));
  };
  fetch(`https://api.github.com/users/${p.githubUser}/repos?per_page=100&sort=pushed`)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((repos) => {
      const list = repos
        .filter((r) => !r.fork && r.name.toLowerCase() !== `${p.githubUser.toLowerCase()}.github.io`)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 9);
      renderRepos(list);
    })
    .catch(() => {
      $("#repos").innerHTML = `<p class="muted">Couldn't load repositories right now — <a href="${esc(p.github)}" target="_blank" rel="noopener" style="text-decoration:underline">see them on GitHub</a>.</p>`;
    });

  // Reveal on scroll
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-visible");
              io.unobserve(en.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      )
    : null;
  function observe(els) {
    els.forEach((el, i) => {
      if (!io || reduceMotion) return el.classList.add("is-visible");
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
      io.observe(el);
    });
  }
  observe($$(".reveal"));

  // Typing roles
  const typed = $("#typed");
  if (!reduceMotion) {
    let ri = 0, ci = p.roles[0].length, deleting = true;
    const tick = () => {
      const word = p.roles[ri];
      typed.textContent = word.slice(0, ci);
      let delay = deleting ? 35 : 70;
      if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % p.roles.length; delay = 300; }
      else if (!deleting && ci === p.roles[ri].length) { deleting = true; delay = 1800; }
      ci += deleting ? -1 : 1;
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2200);
  }

  // Counters
  const counters = $$("[data-count]");
  const runCounter = (el) => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || "";
    if (reduceMotion) return (el.textContent = target + suffix);
    const start = performance.now(), dur = 1400;
    const step = (t) => {
      const k = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (io) {
    const cio = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); }
    }), { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  } else counters.forEach(runCounter);

  // Nav: scrolled state, active link, mobile menu
  const navWrap = $(".nav-wrap");
  const onScroll = () => navWrap.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = $$(".nav-links a");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if (io) {
    const sio = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
    }), { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => sio.observe(s));
  }

  const toggle = $("#nav-toggle"), menu = $("#nav-links");
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  navLinks.forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Copy email
  const hint = $("#copy-hint");
  $("#copy-email").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(p.email);
      hint.textContent = "Copied!";
      hint.classList.add("is-done");
    } catch {
      window.location.href = `mailto:${p.email}`;
    }
    setTimeout(() => { hint.textContent = "Copy"; hint.classList.remove("is-done"); }, 1800);
  });
})();
