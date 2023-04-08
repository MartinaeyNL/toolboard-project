import {html, LitElement} from 'lit';
import "pages-desktop-main";

export class DesktopApp extends LitElement {

  render() {
    return html`
      <main>
        <pages-desktop-main></pages-desktop-main>
      </main>
    `
  }

}

window.customElements.define('desktop-app', DesktopApp)
