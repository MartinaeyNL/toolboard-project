import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import {globalStyle} from "@toolboard/tb-utils";
import {choose} from 'lit/directives/choose.js';

// Shoelace UI imports
import '@shoelace-style/shoelace/dist/components/button/button.js';

// @ts-ignore
import shoelaceLightStyle from "@shoelace-style/shoelace/dist/themes/light.styles.js"
// @ts-ignore
import shoelaceDarkStyle from "@shoelace-style/shoelace/dist/themes/dark.styles.js";
import {when} from "lit/directives/when.js";

@customElement("tb-button")
export class TbButton extends LitElement {

    @property()
    protected readonly type: 'icon' | 'text' = 'text';

    @property()
    protected readonly text: string = 'Button';

    @property()
    protected readonly icon: string = 'gear';

    @property()
    protected readonly label: string = 'Button';

    @property()
    protected readonly size: 'xl' | 'lg' | 'md' | 'sm' = 'lg'

    @property()
    protected readonly variant: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' = 'default';

    @property()
    protected readonly loading: boolean = false;

    @property()
    protected readonly disabled: boolean = false;



    static styles = [globalStyle, shoelaceLightStyle, shoelaceDarkStyle]

    protected render(): TemplateResult {
        console.log(this.loading);
        return html`
            ${choose(this.type, [
                ['icon', () => {
                    const styles = {
                        'font-size': (this)
                    }
                    return html`
                        <sl-icon-button name="${this.icon}" label="${this.label}" style="font-size: var(--tb-icon-size-${this.size})"></sl-icon-button>
                    `
                }],
                ['text', () => {
                    return html`
                        <sl-button .disabled="${this.disabled}" .loading="${this.loading}" variant="${this.variant}">
                            ${when(this.icon, () => html`
                                <sl-icon slot="prefix" name="${this.icon}"></sl-icon>
                            `)}
                            ${this.text}
                        </sl-button>
                    `;
                }]
            ])}
        `
    }
}