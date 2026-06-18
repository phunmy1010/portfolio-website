const PROJECTS = [
  {
    id: "mealpilot",
    category: "Live App · No-Code Build",
    year: "2026",
    image: "images/mealpilot-cover.svg",
    title: "MealPilot",
    role: "Solo Designer & Builder",
    tags: ["NIGERIAN MARKET", "MEAL PLANNING", "SUPABASE"],
    description: "A Nigerian kitchen companion web app — weekly meal planning, smart budget tools, a spend tracker, premium Gym Mode and Healthy & Diet sections, and a Kids Lunchbox planner with 110+ combos. Built end-to-end on vanilla HTML/CSS/JS with a Supabase backend.",
    challenge: "Most meal-planning apps are built around Western grocery pricing and ingredients, leaving Nigerian users without a tool that reflects real local market costs, real Nigerian dishes, or how families actually budget for food.",
    solution: "Built a weekly planner alongside Nigerian-specific budget tools — 'What Can I Cook?', 'What Can I Buy With?', a family budget estimator, and a spend tracker — plus premium Gym Mode (50 bulking meals) and Healthy & Diet (50 recipes, 7 diet filters) tiers gated by Supabase row-level security.",
    tools: ["Vanilla HTML/CSS/JS", "Supabase Auth & DB", "Row Level Security", "GitHub Pages"],
    overview: "MealPilot helps Nigerian households plan meals and food spending around realistic local market budgets, with dedicated tools for fitness goals, special diets, and kids' school lunches.",
    discovery: "Existing meal-planning tools assumed grocery-store pricing and ingredient availability that simply doesn't match Nigerian open-market shopping patterns, leaving users to do all the price-translation work themselves.",
    results: "Shipped with full auth, a working premium paywall, and seven free-standing tools: Weekly Planner, Shopping List, Budget Tools, Spend Tracker, Meals & Recipes, Gym Mode, and Kids Lunchbox (110+ combos).",
    live: "https://lorvyn-core.github.io/MealPilot/",
    isLive: true
  },
  {
    id: "brightmind-ng",
    category: "Live App · No-Code Build",
    year: "2026",
    image: "images/brightmind-cover.svg",
    title: "BrightMind NG",
    role: "Solo Designer & Builder",
    tags: ["EDTECH", "EXAM PREP", "LOCALIZATION"],
    description: "A gamified exam-prep PWA for Nigerian learners, covering WAEC, NECO, JAMB and Post-UTME practice, 20 original Nigerian-setting folktales, phonics, and a star-based reward system.",
    challenge: "Nigerian students preparing for major exams often rely on disconnected PDFs and past-question booklets, with little that's both locally relevant and genuinely engaging for younger learners.",
    solution: "Designed a single dark-themed PWA combining structured exam practice with culturally-rooted reading content — folktales set in Lagos, Abuja, Abeokuta and Ibadan — plus phonics and maths drills, all wrapped in a star-reward gamification loop.",
    tools: ["Vanilla HTML/CSS/JS", "Progressive Web App", "Local Storage", "Custom Illustration"],
    overview: "BrightMind NG is a self-contained learning PWA built for Nigerian primary and secondary students preparing for major standardized exams.",
    discovery: "Younger learners disengage quickly from plain past-question drilling; pairing exam practice with stories set in recognizably Nigerian places gave the content a sense of relevance that generic global ed-tech apps don't have.",
    results: "Delivered 20 original folktales, structured phonics and maths modules, and full WAEC/NECO/JAMB/Post-UTME practice sets in a single offline-capable PWA.",
    live: "brightmind-ng.html",
    isLive: true
  },
  {
    id: "zahar-global",
    category: "Web Platform",
    year: "2024",
    image: "images/zahar-global.jpg",
    title: "Zahar Global Export Portal",
    role: "UX/UI Lead Designer",
    tags: ["ONE STOP AFRICAN FOOD SHOP", "EXPORT LOGISTICS", "BRAND IDENTITY"],
    description: "A premium corporate presence and export logistics platform for Zahar Global, enabling streamlined food sourcing and international distribution of African staples.",
    challenge: "Accessing high-trust, authentic West African food staples (e.g. dry shrimp, ogbono, dry catfish) was highly disjointed for diaspora buyers, lacking compliant bulk sourcing channels and transport trust.",
    solution: "Designed a clean, high-contrast B2B portal featuring dedicated staple catalogs, request quotation systems, and transparent Air, Bulk & Last-Mile infrastructure grids.",
    tools: ["Figma Wireframes", "Tailwind CSS Layouts", "Canva Packaging Specs", "Visual Brand Strategy"],
    overview: "Zahar Global serves as a premium logistics and sourcing portal connecting West African agricultural suppliers directly to B2B food retailers, wholesalers, and consumers in North America and Europe.",
    discovery: "User research showed food import coordinators prioritize standardized packaging, freshness benchmarks, and customs compliance metrics above simple digital shopping convenience.",
    results: "Launched a tailored logistics framework with instant catalogs, boosting professional inquiries and strengthening relationships with diaspora wholesale networks."
  },
  {
    id: "naija-stable",
    category: "No-Code Build",
    year: "2024",
    image: "images/naijastable.jpg",
    title: "NaijaStable Wallet",
    role: "UX/UI Lead Researcher",
    tags: ["FINTECH", "ACCESSIBILITY", "LOCALIZATION"],
    description: "A pidgin-English fintech mobile app concept designed for local Nigerian market sellers, providing intuitive financial safety and voice assistance.",
    challenge: "Traditional banking apps use overly academic English terminology, triggering anxiety and transaction confusion among low-literacy trade merchants.",
    solution: "Introduced pidgin-language interfaces, simplified visual transfer verification badges, and voice-assisted balance checks.",
    tools: ["Figma", "User Interviews", "Canva", "AI Writing"],
    overview: "NaijaStable addresses financial exclusion in Nigerian retail hubs by translating complex transaction information into digestible local cues.",
    discovery: "Field research in Benin City and Enugu found sellers confirming customer transfers via screenshots due to mistrust in standard SMS alerts.",
    results: "Concept testing showed a sharp drop in transaction-confirmation confusion and a clear increase in daily transfer confidence."
  },
  {
    id: "ab-prime",
    category: "Web Platform",
    year: "2024",
    image: "images/ab-prime.jpg",
    title: "AB Prime Mobile Communication Ltd",
    role: "No-Code Designer",
    tags: ["ECOMMERCE", "PRODUCT SERVICES", "WEB PLATFORM"],
    description: "A complete responsive business webpage tailored for selling, swapping, and repairing high-end mobile gadgets and telecommunication hardware.",
    challenge: "Customers trading in devices faced friction due to non-transparent grading policies and clunky spec-matching tables.",
    solution: "Engineered responsive device evaluation grids, a clean dark-mode catalog flow, and a simplified repair-slot scheduler.",
    tools: ["Figma", "No-Code Platform", "Canva Asset Grids", "GitHub Pages"],
    overview: "AB Prime functions as a complete digital showroom for newly landed phones, repairs, and device trade-in evaluations.",
    discovery: "Competitive analysis showed other device-trading sites overloaded users with overly complex spec comparisons.",
    results: "Built a clear comparison checklist rated highly intuitive in user testing, reducing catalog drop-off."
  },
  {
    id: "horizon-salon",
    category: "Web Platform",
    year: "2024",
    image: "images/horizon-salon.jpg",
    title: "Horizon Unisex Salon Portal",
    role: "UX/UI Lead Researcher",
    tags: ["LOCAL SERVICES", "BOOKING FLOW", "BRAND IDENTITY"],
    description: "A fast, clean, luxury-tiered booking web presence with rich hair-styling galleries and seamless calendar bookings.",
    challenge: "The salon was losing a large share of potential weekend bookings due to slow, manually coordinated WhatsApp reservations.",
    solution: "Designed a visual booking flow with styled service-card selectors, cutting scheduling friction significantly.",
    tools: ["Figma Layouts", "Notion Schedule Hooks", "Canva Layouts", "GitHub Pages"],
    overview: "This portal acts as a welcoming virtual receptionist — stylists manage slots while clients preview before-and-after results.",
    discovery: "Visual testing showed high-contrast dark tones emphasized premium hair-color values and matched the salon's luxury positioning.",
    results: "Reduced manual reservation handling and increased advance weekend bookings completed without staff intervention."
  },
  {
    id: "jumia-redesign",
    category: "UX Case Study",
    year: "2023",
    image: "images/jumia-redesign.jpg",
    title: "Jumia App UX Redesign",
    role: "UX Researcher",
    tags: ["UX OVERHAUL", "CHECKOUT FLOW", "CONVERSION OPTIMIZATION"],
    description: "A redesigned checkout-flow mockup for Jumia, focusing on cleaner navigation, review trust signals, and clear shipping cost breakdowns.",
    challenge: "Shoppers abandoned carts due to surprise delivery-fee calculations at checkout and low confidence in generic rating summaries.",
    solution: "Designed transparent delivery-fee calculators and a verified-purchase review system with real customer photos.",
    tools: ["Figma Wireframes", "UX Competitive Auditing", "Notion Research Hub"],
    overview: "The project targeted reducing cognitive overload during checkout and raising the perceived authenticity of product reviews.",
    discovery: "User interviews found shoppers preferred paying a known premium for guaranteed delivery over facing unpredictable last-step pricing.",
    results: "The redesigned flow cut checkout from 6 screens to 2, with a meaningful projected lift in completed purchases in usability testing."
  }
];

function renderProjects() {
  const list = document.getElementById("projectList");
  list.innerHTML = PROJECTS.map((p, i) => {
    const reverse = i % 2 === 1 ? " reverse" : "";
    const liveBadge = p.isLive
      ? `<span class="live-badge"><span class="dot"></span>Live Build</span>`
      : "";
    return `
    <div class="project-card reveal${reverse}">
      <div class="project-media">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </div>
      <div class="project-body">
        <div class="project-meta-row">
          <span class="stamp" style="color:#e493b3;">${p.category}</span>
          <span class="project-year">${p.year}</span>
        </div>
        <h3>${p.title}</h3>
        <span class="project-role">${liveBadge ? liveBadge + " &nbsp; " : ""}Role: ${p.role}</span>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag-chip">${t}</span>`).join("")}
        </div>
        <button class="project-cta" onclick="openCaseStudy('${p.id}')">Read Case Study →</button>
      </div>
    </div>`;
  }).join("");
}

function openCaseStudy(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const overlay = document.getElementById("modalOverlay");
  const box = document.getElementById("modalBox");
  const liveLink = p.isLive
    ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top:6px;">Open Live App →</a>`
    : "";
  box.innerHTML = `
    <button class="modal-close" onclick="closeCaseStudy()">✕</button>
    <img class="modal-img" src="${p.image}" alt="${p.title}" />
    <div class="modal-content">
      <h3>${p.title}</h3>
      <span class="project-role">Role: ${p.role}</span>
      <div class="modal-section">
        <span class="label">Executive Overview</span>
        <p>${p.overview}</p>
      </div>
      <div class="modal-section">
        <span class="label">Deep Discovery</span>
        <p>${p.discovery}</p>
      </div>
      <div class="modal-result" style="margin-bottom:20px;">"${p.results}"</div>
      <div class="project-tags" style="margin-bottom:18px;">
        ${p.tools.map(t => `<span class="tag-chip">${t}</span>`).join("")}
      </div>
      ${liveLink}
    </div>
  `;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCaseStudy() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modalOverlay")?.addEventListener("click", (e) => {
  if (e.target.id === "modalOverlay") closeCaseStudy();
});
