import dom from './shared/dom.js';

// --- Importing views ---
import homeView from './view/homeView.js';
import registerView from './view/registerView.js';
import chatView from './view/chatView.js';

const Router = {
  init: () => {
    // --- Preventing default behavior of links ---
    document.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", event => {
        event.preventDefault();
        const href = a.getAttribute("href");
        if (href)
            Router.go(href);
      })
    });

    // --- Listens for history changes ---
    window.addEventListener('popstate', event => {
      Router.go(location.pathname, false);
    })

    // --- Process initial URL ---
    Router.go(location.pathname);
  },
  go: (route : string, addToHistory = true) => {
    // --- Add to browser history (or not) ---
    if (addToHistory)
      history.pushState({ route }, '', route);

    // --- Routing ---
    let view : HTMLElement;
    switch (route) {
      case "/":
        view = homeView();
        break;
      case "/register":
        view = registerView();
        break;
      case "/chat":
        view = chatView();
        break;
      default:
        view = homeView();
        break;
    }

    if (view) {
        // --- Set view ---
        if (window.app.selector)
            dom.mount(window.app.selector.view, view);
    }

    // --- Reset scrollbar ---
    window.scrollX = 0;
  }
}

export default Router;