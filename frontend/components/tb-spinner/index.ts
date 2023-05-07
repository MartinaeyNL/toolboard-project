import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import {globalStyle} from "@toolboard/tb-utils";

// Shoelace UI imports
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';

// @ts-ignore
import shoelaceLightStyle from "@shoelace-style/shoelace/dist/themes/light.styles.js"
// @ts-ignore
import shoelaceDarkStyle from "@shoelace-style/shoelace/dist/themes/dark.styles.js";

@customElement("tb-spinner")
export class TbSpinner extends LitElement {

    static styles = [globalStyle, shoelaceLightStyle, shoelaceDarkStyle]

    protected render(): TemplateResult {
        return html`
            <sl-spinner></sl-spinner>
        `
    }
}