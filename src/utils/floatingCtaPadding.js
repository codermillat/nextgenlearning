const FLOATING_CTA_CLASS = 'has-floating-cta';
const FLOATING_CTA_COUNT_ATTR = 'data-floating-cta-count';

function getCount(body) {
  const value = Number.parseInt(body.getAttribute(FLOATING_CTA_COUNT_ATTR) || '0', 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function setCount(body, count) {
  if (count > 0) {
    body.setAttribute(FLOATING_CTA_COUNT_ATTR, String(count));
  } else {
    body.removeAttribute(FLOATING_CTA_COUNT_ATTR);
  }
}

function applyFloatingClass(doc, enabled) {
  doc.body.classList.toggle(FLOATING_CTA_CLASS, enabled);
  doc.documentElement.classList.toggle(FLOATING_CTA_CLASS, enabled);
}

export function registerFloatingCtaPadding() {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const count = getCount(document.body) + 1;
  setCount(document.body, count);
  applyFloatingClass(document, true);

  return () => {
    const current = getCount(document.body);
    const next = Math.max(0, current - 1);
    setCount(document.body, next);
    applyFloatingClass(document, next > 0);
  };
}

