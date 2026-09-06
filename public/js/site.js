(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.querySelector(".nav-mobile");
  const navLinks = document.querySelectorAll("[data-nav]");
  const tabs = document.querySelectorAll(".stage-tab");
  const panels = document.querySelectorAll(".workflow-panel");
  const moreBtns = document.querySelectorAll("[data-more]");
  const expandRoles = document.querySelector(".expand-roles");
  const earlier = document.querySelector(".earlier");

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mobile?.classList.toggle("is-open", !open);
  });

  mobile?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      mobile.classList.remove("is-open");
    });
  });

  const ids = [...navLinks]
    .map((a) => a.getAttribute("href")?.slice(1))
    .filter(Boolean);
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible[0]) return;
        const id = visible[0].target.id;
        navLinks.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((s) => io.observe(s));
  }

  const activateStage = (key) => {
    tabs.forEach((tab) => {
      const on = tab.dataset.stage === key;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === `stage-${key}`);
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activateStage(tab.dataset.stage));
    tab.addEventListener("keydown", (e) => {
      const next =
        e.key === "ArrowRight" || e.key === "ArrowDown"
          ? tabs[(i + 1) % tabs.length]
          : e.key === "ArrowLeft" || e.key === "ArrowUp"
            ? tabs[(i - 1 + tabs.length) % tabs.length]
            : e.key === "Home"
              ? tabs[0]
              : e.key === "End"
                ? tabs[tabs.length - 1]
                : null;
      if (!next) return;
      e.preventDefault();
      activateStage(next.dataset.stage);
      next.focus();
    });
  });

  moreBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project") || btn.parentElement;
      const extra = card?.querySelectorAll("[data-extra]");
      const open = btn.getAttribute("aria-expanded") === "true";
      extra?.forEach((li) => {
        li.hidden = open;
      });
      btn.setAttribute("aria-expanded", String(!open));
      btn.textContent = open
        ? `+ ${extra?.length ?? 0} more`
        : "Show less";
    });
  });

  expandRoles?.addEventListener("click", () => {
    const open = expandRoles.getAttribute("aria-expanded") === "true";
    if (earlier) earlier.hidden = open;
    expandRoles.setAttribute("aria-expanded", String(!open));
    expandRoles.textContent = open
      ? "Show earlier roles"
      : "Hide earlier roles";
  });

  const schema = document.createElement("script");
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joshua Roark",
    alternateName: ["Josh Roark", "JR Roark"],
    jobTitle: "Security / IT Analyst",
    worksFor: { "@type": "Organization", name: "Nymbl Systems" },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Howard High School of Technology",
      },
    ],
    description:
      "I work the part of security where the promises have to survive contact with evidence.",
    url: "https://prod.fail",
    sameAs: [
      "https://github.com/prodfail",
      "https://www.linkedin.com/in/joshroark",
    ],
    knowsAbout: [
      "Microsoft 365 DFIR",
      "Entra ID forensics",
      "SOC coordination",
      "Unified Audit Log analysis",
      "HIPAA",
      "SOC 2 readiness",
      "Vendor and third-party risk",
      "Identity and access management",
      "Cloud security",
      "PowerShell 7",
    ],
    subjectOf: [
      {
        "@type": "SoftwareSourceCode",
        name: "M365IR",
        description:
          "A tested incident-response module for Microsoft 365, built for the analyst working a breach at 2am.",
        codeRepository: "https://github.com/prodfail/M365IR",
        programmingLanguage: "PowerShell",
      },
      {
        "@type": "SoftwareSourceCode",
        name: "M365 IR Toolkit",
        description:
          "Sixteen investigation modules covering the M365 compromise surface, with a non-destructive posture.",
        codeRepository: "https://github.com/prodfail/m365-ir-toolkit",
        programmingLanguage: "PowerShell",
      },
      {
        "@type": "SoftwareSourceCode",
        name: "AI Questionnaire Kit",
        description:
          "A maturity-tiered answer library for AI security questionnaires.",
        codeRepository: "https://github.com/prodfail/ai-questionnaire-kit",
        programmingLanguage: "Markdown",
      },
    ],
  });
  document.head.appendChild(schema);
})();
