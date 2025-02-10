/**
 * EarningsWidget Web Component
 * 
 * This class defines a custom web component (`<earnings-widget>`) that renders a React application inside a Shadow DOM.
 **/
import ReactDOM from "react-dom/client";
import App from "../App";
import tailwindStyles from "../index.css?inline";

class EarningsWidget extends HTMLElement {
  private root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const mountPoint = document.createElement("div");
    this.root.innerHTML = "";
    this.root.appendChild(mountPoint);

    // Inject Tailwind styles
    const style = document.createElement("style");
    style.textContent = tailwindStyles;
    this.root.appendChild(style);
    ReactDOM.createRoot(mountPoint).render(<App />);
  }
}

// Register custom element
if (!customElements.get("earnings-widget")) {
  customElements.define("earnings-widget", EarningsWidget);
}
