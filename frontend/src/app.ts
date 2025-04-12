import router from './router.js';

// global.d.ts
export {};

declare global {
  interface Window {
    app: {
      router?: any;
      state?: any;
      selector?: Record<string, HTMLElement | null>;
    };
  }
}

window.app = window.app || {};
window.app.router = router;
//window.app.state = state;

window.app.selector = {
    navbar: document.querySelector('[data-id="navbar"]'),
    view: document.querySelector('[data-id="view"]'),
    sidebarLeft: document.querySelector('[data-id="sidebar-left"]'),
    sidebarRight: document.querySelector('[data-id="sidebar-right"]')
}

window.addEventListener("DOMContentLoaded", () => {
    router.init();
});

// fdskjfsdkjhf ksdjhfkj sdhkjfhsdfsdfsd