(() => {
  const SITE = {
    substackUrl: "https://startdoingthings.substack.com",
  };

  const PROJECTS = [
    {
      title: "Start Doing Things (companion site)",
      description: "A lightweight home for the newsletter, plus a place to track and share what I’m building.",
      status: "WIP",
      tags: ["Website", "Writing"],
      links: [{ label: "Substack", url: SITE.substackUrl }],
    },
    {
      title: "Agency playbooks",
      description: "Reusable checklists and prompts for getting unstuck, making decisions, and shipping consistently.",
      status: "Planned",
      tags: ["AI Workflow", "Templates"],
      links: [],
    },
    {
      title: "Prompt-to-plan workflow",
      description: "A repeatable system to turn vague goals into weekly sprints with review loops and next actions.",
      status: "Planned",
      tags: ["Planning", "Automation"],
      links: [],
    },
  ];

  const byId = (id) => document.getElementById(id);

  const grid = byId("projects-grid");
  const emptyState = byId("projects-empty");
  const search = byId("project-search");
  const tagFilters = byId("tag-filters");
  const substackLink = byId("substack-link");
  const substackCta = byId("substack-cta");
  const year = byId("year");

  if (substackLink) substackLink.href = SITE.substackUrl;
  if (substackCta) substackCta.href = SITE.substackUrl;
  if (year) year.textContent = String(new Date().getFullYear());

  if (!grid) return;

  const normalize = (value) => String(value ?? "").trim().toLowerCase();

  const state = {
    tag: "All",
    query: "",
  };

  const uniqTags = () => {
    const tags = new Set();
    for (const project of PROJECTS) {
      for (const tag of project.tags ?? []) tags.add(tag);
    }
    return ["All", ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  };

  const isExternalUrl = (url) => /^https?:\/\//i.test(url);

  const createBadge = (text) => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = text;
    return badge;
  };

  const createTag = (text) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = text;
    return tag;
  };

  const createProjectCard = (project) => {
    const card = document.createElement("article");
    card.className = "card";

    const titleRow = document.createElement("div");
    titleRow.className = "card-title-row";

    const title = document.createElement("h3");
    title.textContent = project.title;

    titleRow.appendChild(title);
    if (project.status) titleRow.appendChild(createBadge(project.status));
    card.appendChild(titleRow);

    if (project.description) {
      const description = document.createElement("p");
      description.textContent = project.description;
      card.appendChild(description);
    }

    const tags = project.tags ?? [];
    if (tags.length > 0) {
      const tagRow = document.createElement("div");
      tagRow.className = "tag-row";
      for (const tag of tags) tagRow.appendChild(createTag(tag));
      card.appendChild(tagRow);
    }

    const links = project.links ?? [];
    if (links.length > 0) {
      const linkRow = document.createElement("div");
      linkRow.className = "card-links";

      for (const { label, url } of links) {
        if (!label || !url) continue;
        const link = document.createElement("a");
        link.textContent = label;
        link.href = url;
        if (isExternalUrl(url)) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        linkRow.appendChild(link);
      }

      if (linkRow.childElementCount > 0) card.appendChild(linkRow);
    }

    return card;
  };

  const projectMatches = (project) => {
    const query = normalize(state.query);
    const tag = state.tag;

    if (tag !== "All" && !(project.tags ?? []).includes(tag)) return false;
    if (!query) return true;

    const haystack = [
      project.title,
      project.description,
      project.status,
      ...(project.tags ?? []),
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(query);
  };

  const renderProjects = () => {
    grid.replaceChildren();
    const matches = PROJECTS.filter(projectMatches);

    for (const project of matches) grid.appendChild(createProjectCard(project));

    if (emptyState) emptyState.classList.toggle("hidden", matches.length > 0);
  };

  const renderFilters = () => {
    if (!tagFilters) return;

    tagFilters.replaceChildren();
    const tags = uniqTags();

    for (const tag of tags) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chip";
      button.textContent = tag;
      button.setAttribute("aria-pressed", tag === state.tag ? "true" : "false");
      button.addEventListener("click", () => {
        state.tag = tag;
        renderFilters();
        renderProjects();
      });
      tagFilters.appendChild(button);
    }
  };

  if (search) {
    search.addEventListener("input", (event) => {
      state.query = event.target.value ?? "";
      renderProjects();
    });
  }

  renderFilters();
  renderProjects();
})();
