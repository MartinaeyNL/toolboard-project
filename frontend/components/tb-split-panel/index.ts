import {css, html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import {when} from 'lit/directives/when.js';
import {globalStyle} from "@toolboard/tb-utils";

// Shoelace UI imports
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';

// @ts-ignore
import shoelaceLightStyle from "@shoelace-style/shoelace/dist/themes/light.styles.js"
// @ts-ignore
import shoelaceDarkStyle from "@shoelace-style/shoelace/dist/themes/dark.styles.js";

const styling = css`
  .split-panel-divider sl-split-panel::part(divider) {
    background-color: #707070;
  }
`;

@customElement("tb-split-panel")
export class TbSplitPanel extends LitElement {

    @property()
    protected start: TemplateResult = html`<span>Panel #1</span>`;

    @property()
    protected end: TemplateResult = html`<span>Panel #2</span>`;

    @property()
    protected dividerOverride?: TemplateResult

    static styles = [globalStyle, shoelaceLightStyle, shoelaceDarkStyle, styling]

    protected render(): TemplateResult {
        return html`
            <div class="split-panel-divider" style="height: 100%;">
                <sl-split-panel style="height: 100%;">
                    <div slot="start">
                        ${this.start}
                    </div>
                    ${when(this.dividerOverride, () => html`
                        <div slot="divider">
                            ${this.dividerOverride}
                        </div>
                    `)}
                    <div slot="end">
                        ${this.end}
                    </div>
                </sl-split-panel>
            </div>
        `
    }
}