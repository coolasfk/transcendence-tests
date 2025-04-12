function create(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const first = template.content.firstElementChild;
    if (!first)
        throw new Error("frontend.create(): HTML string must have at least one root element.");
    return first.cloneNode(true);
}
function mount(selector, component, clear = true) {
    console.log(selector);
    if (selector) {
        selector.appendChild(component);
    }
    else
        console.warn(`mount(): Target element not found or null.`);
}
export default {
    create,
    mount
};
