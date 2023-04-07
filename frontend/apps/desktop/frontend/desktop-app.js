import {html, LitElement} from 'lit';
import "pages-desktop-main";

export class DesktopApp extends LitElement {

  render() {
    return html`
      <main>
        <span>This is our new Desktop app</span>
        <pages-desktop-main></pages-desktop-main>
      </main>
    `
  }

}

window.customElements.define('desktop-app', DesktopApp)
