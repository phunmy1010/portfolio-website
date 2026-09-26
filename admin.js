/* ============================================================
   PORTFOLIO ADMIN CMS — Blessing Joshua
   Access: yoursite/#admin  →  enter password
   ============================================================ */

const ADMIN_HASH = "d347065a1a02ad9ef7b896e30acc42ed1f4d4fd33d1a01a3b3bc28c4c4a1c381";
const STORAGE_KEY = "pf_content_v2";
const SESSION_KEY = "pf_admin_session";

// ── SHA-256 (no dependency) ──────────────────────────────────────
async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}

// ── Storage ──────────────────────────────────────────────────────
function loadContent() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveContent(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

// ── Session ──────────────────────────────────────────────────────
function isAdmin() { return sessionStorage.getItem(SESSION_KEY) === "1"; }
function setAdmin() { sessionStorage.setItem(SESSION_KEY, "1"); }

// ── Apply saved content on load ──────────────────────────────────
function applyContent() {
  const data = loadContent();
  // Text editables
  document.querySelectorAll("[data-editable]").forEach(el => {
    const val = data[el.dataset.editable];
    if (val !== undefined) el.innerHTML = val;
  });
  // Image editables
  document.querySelectorAll("[data-editable-img]").forEach(img => {
    const val = data[img.dataset.editableImg];
    if (val) img.src = val;
  });
}

// ── Load saved project overrides ─────────────────────────────────
function loadSavedProjects() {
  const data = loadContent();
  if (data["__projects__"]) {
    try {
      const saved = JSON.parse(data["__projects__"]);
      PROJECTS.length = 0;
      saved.forEach(p => PROJECTS.push(p));
    } catch(e) {}
  }
}

// ── ADMIN MODE: attach edit controls ────────────────────────────
function activateEditMode() {
  document.body.classList.add("admin-mode");

  // Text editables → wrap with dashed outline + edit button
  document.querySelectorAll("[data-editable]").forEach(el => {
    const wrap = document.createElement("div");
    wrap.className = "edit-wrap";
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);
    const btn = makeEditBtn("✏️ Edit", () => openTextEditor(el));
    wrap.appendChild(btn);
  });

  // Image editables → wrap + change button
  document.querySelectorAll("[data-editable-img]").forEach(img => {
    const wrap = document.createElement("div");
    wrap.className = "edit-wrap edit-wrap-img";
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
    const btn = makeEditBtn("🖼️ Change Image", () => openImagePicker(img));
    btn.classList.add("edit-btn-img");
    wrap.appendChild(btn);
  });

  // Watch for project cards rendered later
  const observer = new MutationObserver(() => tagProjectCards());
  const pl = document.getElementById("projectList");
  if (pl) observer.observe(pl, { childList: true });
  tagProjectCards();

  // Credential cards
  tagCredCards();

  showAdminBar();
}

function makeEditBtn(label, onClick) {
  const btn = document.createElement("button");
  btn.className = "edit-btn";
  btn.innerHTML = label;
  btn.addEventListener("click", e => { e.stopPropagation(); onClick(); });
  return btn;
}

// ── Tag project cards ─────────────────────────────────────────────
function tagProjectCards() {
  document.querySelectorAll(".project-card:not(.admin-tagged)").forEach((card, i) => {
    card.classList.add("admin-tagged");
    card.style.position = "relative";
    const btn = document.createElement("button");
    btn.className = "edit-btn-project";
    btn.innerHTML = "✏️ Edit Project";
    btn.addEventListener("click", e => { e.stopPropagation(); openProjectEditor(i); });
    card.appendChild(btn);
  });
}

// ── Tag credential cards ──────────────────────────────────────────
function tagCredCards() {
  document.querySelectorAll(".cred-card:not(.admin-tagged)").forEach(card => {
    card.classList.add("admin-tagged");
    card.style.position = "relative";
    const btn = makeEditBtn("✏️", () => openCredEditor(card));
    btn.style.cssText = "position:absolute;top:8px;right:8px;font-size:9px;padding:4px 8px;opacity:0;";
    card.addEventListener("mouseenter", () => btn.style.opacity = "1");
    card.addEventListener("mouseleave", () => btn.style.opacity = "0");
    card.appendChild(btn);
  });
}

// ── TEXT EDITOR ───────────────────────────────────────────────────
function openTextEditor(el) {
  closeAllPanels();
  const key = el.dataset.editable;
  const label = key.replace(/_/g," ");
  const panel = createPanel(`Editing: <strong>${label}</strong>`);
  panel.querySelector(".admin-panel-body").innerHTML = `
    <p class="panel-hint">HTML tags like &lt;strong&gt; &lt;em&gt; &lt;br&gt; are supported.</p>
    <textarea id="editTextarea">${escapeHtml(el.innerHTML)}</textarea>
    <div class="panel-actions">
      <button class="btn btn-primary" onclick="saveTextEdit('${key}')">Save</button>
      <button class="btn btn-ghost" onclick="closeAllPanels()">Cancel</button>
    </div>
  `;
  document.body.appendChild(panel);
  setTimeout(() => panel.classList.add("open"), 10);
  document.getElementById("editTextarea")?.focus();
}

function saveTextEdit(key) {
  const val = document.getElementById("editTextarea")?.value;
  if (val === undefined) return;
  const el = document.querySelector(`[data-editable="${key}"]`);
  if (el) el.innerHTML = val;
  const data = loadContent(); data[key] = val; saveContent(data);
  closeAllPanels(); showToast("✅ Saved!");
}

// ── IMAGE PICKER ──────────────────────────────────────────────────
function openImagePicker(img) {
  const input = document.createElement("input");
  input.type = "file"; input.accept = "image/*";
  input.onchange = () => {
    const file = input.files[0]; if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast("⚠️ Image must be under 5MB", "warn"); return; }
    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target.result;
      const data = loadContent(); data[img.dataset.editableImg] = e.target.result; saveContent(data);
      showToast("✅ Image updated!");
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

// ── PROJECT EDITOR ────────────────────────────────────────────────
function openProjectEditor(index) {
  closeAllPanels();
  const p = PROJECTS[index];
  if (!p) return;
  const panel = createPanel(`Project: <strong>${p.title}</strong>`, true);
  panel.querySelector(".admin-panel-body").innerHTML = `
    <div class="field-group"><label>Title</label><input id="pf_title" value="${esc(p.title)}"/></div>
    <div class="field-group"><label>Category</label><input id="pf_category" value="${esc(p.category)}"/></div>
    <div class="field-group"><label>Year</label><input id="pf_year" value="${esc(p.year)}" style="width:120px"/></div>
    <div class="field-group"><label>Your Role</label><input id="pf_role" value="${esc(p.role)}"/></div>
    <div class="field-group"><label>Short Description (card)</label><textarea id="pf_desc" rows="3">${esc(p.description)}</textarea></div>
    <div class="field-group"><label>Tags (comma-separated)</label><input id="pf_tags" value="${esc(p.tags.join(", "))}"/></div>
    <div class="field-group"><label>Overview (case study)</label><textarea id="pf_overview" rows="3">${esc(p.overview)}</textarea></div>
    <div class="field-group"><label>Discovery (case study)</label><textarea id="pf_discovery" rows="3">${esc(p.discovery)}</textarea></div>
    <div class="field-group"><label>Results (case study)</label><textarea id="pf_results" rows="3">${esc(p.results)}</textarea></div>
    <div class="field-group"><label>Tools (comma-separated)</label><input id="pf_tools" value="${esc(p.tools.join(", "))}"/></div>
    <div class="field-group"><label>Live URL (blank = not live)</label><input id="pf_live" value="${esc(p.live||'')}"/></div>
    <div class="field-group"><label>Case Study Page (e.g. mealpilot.html or blank)</label><input id="pf_page" value="${esc(p.caseStudyPage||'')}"/></div>
    <div class="field-group">
      <label>Cover Image</label>
      <div style="display:flex;align-items:center;gap:12px;margin-top:6px;">
        <img id="pf_img_preview" src="${esc(p.image)}" style="width:120px;height:70px;object-fit:cover;border-radius:8px;border:1px solid var(--border);"/>
        <button class="btn btn-ghost" onclick="pickProjectImage(${index})">📁 Upload Image</button>
      </div>
    </div>
    <div class="panel-actions">
      <button class="btn btn-primary" onclick="saveProjectEdit(${index})">Save Project</button>
      <button class="btn btn-ghost" onclick="closeAllPanels()">Cancel</button>
      <button class="btn" style="background:rgba(220,60,60,0.1);color:#e47070;border:1px solid rgba(220,60,60,0.2);" onclick="confirmDeleteProject(${index})">🗑 Remove</button>
    </div>
  `;
  document.body.appendChild(panel);
  setTimeout(() => panel.classList.add("open"), 10);
}

function pickProjectImage(index) {
  const input = document.createElement("input");
  input.type = "file"; input.accept = "image/*";
  input.onchange = () => {
    const file = input.files[0]; if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast("⚠️ Under 5MB please", "warn"); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const prev = document.getElementById("pf_img_preview");
      if (prev) prev.src = e.target.result;
      window._pendingProjectImg = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function saveProjectEdit(index) {
  const p = PROJECTS[index];
  p.title       = document.getElementById("pf_title").value;
  p.category    = document.getElementById("pf_category").value;
  p.year        = document.getElementById("pf_year").value;
  p.role        = document.getElementById("pf_role").value;
  p.description = document.getElementById("pf_desc").value;
  p.tags        = document.getElementById("pf_tags").value.split(",").map(t=>t.trim().toUpperCase()).filter(Boolean);
  p.overview    = document.getElementById("pf_overview").value;
  p.discovery   = document.getElementById("pf_discovery").value;
  p.results     = document.getElementById("pf_results").value;
  p.tools       = document.getElementById("pf_tools").value.split(",").map(t=>t.trim()).filter(Boolean);
  p.live        = document.getElementById("pf_live").value;
  p.isLive      = !!p.live;
  p.caseStudyPage = document.getElementById("pf_page").value || undefined;
  if (window._pendingProjectImg) { p.image = window._pendingProjectImg; window._pendingProjectImg = null; }
  saveProjectsToStorage(); renderProjects(); closeAllPanels(); showToast("✅ Project saved!");
}

function confirmDeleteProject(index) {
  if (confirm(`Remove "${PROJECTS[index].title}"?`)) {
    PROJECTS.splice(index, 1); saveProjectsToStorage(); renderProjects(); closeAllPanels(); showToast("🗑 Removed");
  }
}

function saveProjectsToStorage() {
  const data = loadContent(); data["__projects__"] = JSON.stringify(PROJECTS); saveContent(data);
}

// ── CREDENTIAL EDITOR ─────────────────────────────────────────────
function openCredEditor(card) {
  closeAllPanels();
  const h4 = card.querySelector("h4");
  const p  = card.querySelector("p");
  const titleKey = h4?.dataset.editable;
  const metaKey  = p?.dataset.editable;
  const panel = createPanel("Editing Credential");
  panel.querySelector(".admin-panel-body").innerHTML = `
    ${titleKey ? `<div class="field-group"><label>Title</label><input id="cred_title" value="${esc(h4.textContent)}"/></div>` : ""}
    ${metaKey  ? `<div class="field-group"><label>Details (org · date · notes)</label><input id="cred_meta" value="${esc(p.textContent)}"/></div>` : ""}
    <div class="panel-actions">
      <button class="btn btn-primary" onclick="saveCredEdit('${titleKey}','${metaKey}')">Save</button>
      <button class="btn btn-ghost" onclick="closeAllPanels()">Cancel</button>
    </div>
  `;
  document.body.appendChild(panel);
  setTimeout(() => panel.classList.add("open"), 10);
}

function saveCredEdit(titleKey, metaKey) {
  const data = loadContent();
  if (titleKey && titleKey !== "undefined") {
    const val = document.getElementById("cred_title")?.value;
    if (val !== undefined) {
      const el = document.querySelector(`[data-editable="${titleKey}"]`);
      if (el) el.textContent = val;
      data[titleKey] = val;
    }
  }
  if (metaKey && metaKey !== "undefined") {
    const val = document.getElementById("cred_meta")?.value;
    if (val !== undefined) {
      const el = document.querySelector(`[data-editable="${metaKey}"]`);
      if (el) el.textContent = val;
      data[metaKey] = val;
    }
  }
  saveContent(data); closeAllPanels(); showToast("✅ Saved!");
}

// ── ADD NEW PROJECT ───────────────────────────────────────────────
function addNewProject() {
  PROJECTS.push({
    id: "new_" + Date.now(), category: "New Project", year: String(new Date().getFullYear()),
    image: "images/mealpilot-cover.svg", title: "New Project", role: "Designer & Builder",
    tags: ["NEW"], description: "Describe this project.",
    challenge: "", solution: "", tools: [],
    overview: "Overview.", discovery: "Discovery.", results: "Results.",
    live: "", isLive: false
  });
  saveProjectsToStorage(); renderProjects();
  showToast("✅ New project added — click ✏️ to edit");
}

// ── ADMIN BAR ─────────────────────────────────────────────────────
function showAdminBar() {
  const bar = document.createElement("div");
  bar.id = "adminBar";
  bar.innerHTML = `
    <div class="admin-bar-inner">
      <span class="admin-bar-label">🔐 Admin Mode · <span style="color:var(--text-muted);font-size:10px;">Go to #admin to log in</span></span>
      <div class="admin-bar-actions">
        <button class="btn btn-primary" style="font-size:11px;padding:7px 14px;" onclick="addNewProject()">＋ Add Project</button>
        <button class="btn btn-ghost" style="font-size:11px;padding:7px 14px;" onclick="exportBackup()">⬇ Backup</button>
        <button class="btn btn-ghost" style="font-size:11px;padding:7px 14px;" onclick="importBackup()">⬆ Restore</button>
        <button class="btn btn-ghost" style="font-size:11px;padding:7px 14px;color:#e47070;" onclick="adminLogout()">🔒 Lock</button>
      </div>
    </div>
  `;
  document.body.prepend(bar);
}

function adminLogout() { sessionStorage.removeItem(SESSION_KEY); location.reload(); }

function exportBackup() {
  const blob = new Blob([JSON.stringify(loadContent(), null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = "portfolio-backup-" + new Date().toISOString().slice(0,10) + ".json"; a.click();
  showToast("📦 Backup downloaded");
}

function importBackup() {
  const input = document.createElement("input"); input.type = "file"; input.accept = ".json";
  input.onchange = () => {
    const file = input.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        showToast("✅ Backup restored — reloading...");
        setTimeout(() => location.reload(), 1500);
      } catch { showToast("⚠️ Invalid backup file", "warn"); }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ── LOGIN MODAL ───────────────────────────────────────────────────
function showLoginModal() {
  const modal = document.createElement("div");
  modal.id = "adminLoginModal";
  modal.innerHTML = `
    <div class="admin-login-box">
      <div class="admin-login-logo">🔐</div>
      <h2>Admin Access</h2>
      <p>Enter your password to edit this portfolio</p>
      <input type="password" id="adminPassInput" placeholder="••••••••••••" autocomplete="current-password"/>
      <div id="adminLoginError" class="admin-login-error"></div>
      <button class="btn btn-primary" style="width:100%;margin-bottom:8px;" onclick="attemptLogin()">Unlock</button>
      <button class="btn btn-ghost" style="width:100%;" onclick="cancelLogin()">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById("adminPassInput").addEventListener("keydown", e => { if (e.key==="Enter") attemptLogin(); });
  setTimeout(() => document.getElementById("adminPassInput")?.focus(), 100);
}

function cancelLogin() {
  document.getElementById("adminLoginModal")?.remove();
  history.replaceState(null, "", location.pathname);
}

async function attemptLogin() {
  const input = document.getElementById("adminPassInput");
  const err   = document.getElementById("adminLoginError");
  const hash  = await sha256(input.value);
  if (hash === ADMIN_HASH) {
    setAdmin();
    document.getElementById("adminLoginModal")?.remove();
    history.replaceState(null, "", location.pathname);
    activateEditMode();
    showToast("🔓 Admin mode unlocked — click ✏️ on any section to edit");
  } else {
    err.textContent = "Incorrect password.";
    input.value = ""; input.focus();
  }
}

// ── PANEL HELPER ─────────────────────────────────────────────────
function createPanel(headerHTML, wide = false) {
  const panel = document.createElement("div");
  panel.className = "admin-panel" + (wide ? " admin-panel-wide" : "");
  panel.id = "activePanel";
  panel.innerHTML = `
    <div class="admin-panel-header">
      <span>${headerHTML}</span>
      <button class="panel-close" onclick="closeAllPanels()">✕</button>
    </div>
    <div class="admin-panel-body"></div>
  `;
  return panel;
}

function closeAllPanels() {
  const p = document.getElementById("activePanel");
  if (p) { p.classList.remove("open"); setTimeout(() => p.remove(), 320); }
}

// ── TOAST ─────────────────────────────────────────────────────────
function showToast(msg, type = "success") {
  const t = document.createElement("div");
  t.className = `admin-toast ${type}`; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 400); }, 3000);
}

// ── UTILS ─────────────────────────────────────────────────────────
function esc(str) {
  return String(str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function escapeHtml(str) { return String(str||""); } // for textarea (raw HTML allowed)

// ── INIT ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadSavedProjects();
  applyContent();

  if (location.hash === "#admin") showLoginModal();
  if (isAdmin()) activateEditMode();

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAllPanels();
  });
});
