import {html, LitElement} from "lit";
import {customElement} from 'lit/decorators.js';

@customElement("pages-desktop-main")
export class DesktopMain extends LitElement {

    protected render() {
        return html`
            <div>
                <div>
                    <span>desktop-main page!</span>
                </div>
            </div>
        `
    }
}