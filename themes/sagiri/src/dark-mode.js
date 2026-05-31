function isCorpseModeEnabled() {
  return document.body.classList.contains('corpse-mode');
}

function swapImageAttributes(id, enabled) {
  const node = document.getElementById(id);

  if (!node) {
    return;
  }

  const nextSrc = enabled ? node.dataset.darkSrc : node.dataset.lightSrc;
  const nextSrcset = enabled ? node.dataset.darkSrcset : node.dataset.lightSrcset;
  const nextType = enabled ? node.dataset.darkType : node.dataset.lightType;

  if (nextSrc) {
    node.src = nextSrc;
  }

  if (nextSrcset) {
    node.srcset = nextSrcset;
  }

  if (nextType) {
    node.type = nextType;
  }
}

function applyCorpseMode(enabled) {
  document.body.classList.toggle('corpse-mode', enabled);
  swapImageAttributes('header-brand-source-webp', enabled);
  swapImageAttributes('header-brand-source-fallback', enabled);
  swapImageAttributes('header-brand-image', enabled);
  swapImageAttributes('site-master-avatar', enabled);
}

function enableDarkTheme() {
  if (isCorpseModeEnabled()) {
    applyCorpseMode(true);
    return false;
  }

  applyCorpseMode(true);

  if (typeof document.onclick === 'function') {
    document.onclick();
  }

  return false;
}

window.enableDarkTheme = enableDarkTheme;
applyCorpseMode(false);