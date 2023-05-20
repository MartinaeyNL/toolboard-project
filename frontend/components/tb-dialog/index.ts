import {html, LitElement, PropertyValues, TemplateResult} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import {globalStyle} from "@toolboard/tb-utils";

// Shoelace UI imports
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

// @ts-ignore
import shoelaceLightStyle from "@shoelace-style/shoelace/dist/themes/light.styles.js"
// @ts-ignore
import shoelaceDarkStyle from "@shoelace-style/shoelace/dist/themes/dark.styles.js";
import {when} from "lit/directives/when.js";

@customElement("tb-dialog")
export class TbDialog extends LitElement {

    @property()
    protected subject?: string;

    @property()
    protected opened: boolean = true;

    @property()
    protected hideFooter: boolean = false;

    @query('sl-dialog')
    protected dialogElem?: any

    static styles = [globalStyle, shoelaceLightStyle, shoelaceDarkStyle]


    protected willUpdate(_changedProperties: PropertyValues) {
        if(_changedProperties.has('opened')) {
            if(this.opened) {
                this.open();
            } else {
                this.close();
            }
        }
    }

    public async open(): Promise<void> {
        return await this.dialogElem?.show();
    }
    public async close(): Promise<void> {
        return await this.dialogElem?.hide()
    }

    protected render(): TemplateResult {
        return html`
            <sl-dialog label="${this.subject}">
                <slot></slot>
                ${when(!this.hideFooter, () => html`
                    <sl-button slot="footer" variant="primary" @click="${() => this.close()}">Close</sl-button>
                `)}
            </sl-dialog>
        `
    }
}