import {html, LitElement, PropertyValues, TemplateResult} from "lit";
import {customElement, property} from 'lit/decorators.js';

@customElement("tb-menu")
export class TbSidebar extends LitElement {

    protected render() {
        return html`<span>This is TbSidebar!</span>`
    }
}