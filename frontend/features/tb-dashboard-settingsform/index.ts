import { DashboardMetadata } from "@toolboard/tb-api";
import {html, LitElement, TemplateResult} from "lit";
import {customElement, property, query, queryAll} from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import { globalStyle } from "@toolboard/tb-utils";
import {InputType, TbInput} from "@toolboard/tb-input";
import {TbForm} from "@toolboard/tb-form";
import "@toolboard/tb-button";
import "@toolboard/tb-form";
import {when} from "lit/directives/when.js";

@customElement("tb-dashboard-settingsform")
export class TbDashboardSettingsform extends LitElement {

    @property()
    protected readonly panel: 'general' | 'appearance' = 'general'

    @property()
    protected readonly metadata: DashboardMetadata = {};

    @query('tb-form')
    protected formElem?: TbForm;

    @queryAll('tb-input')
    protected inputElems!: NodeList;

    static styles = [globalStyle]

    protected render(): TemplateResult {
        console.log("Rendering!");
        return html`
            ${when(this.metadata, () => html`
                <tb-form @submit="${() => this.onSubmit()}">
                    ${choose(this.panel, [
                        ["general", () => getGeneralSettingsTemplate(this.metadata, () => this.onFieldUpdate(), () => this.onSubmit())],
                        ["appearance", () => getAppearanceSettingsTemplate(this.metadata)]
                    ], () => html`
                        Please provide a form type.
                    `)}
                </tb-form>
            `, () => html`
                <span>Error! Settings could not be found.</span>
            `)}
        `;
    }

    protected onFieldUpdate() {
        const valid = this.formElem?.validate(false);
    }
    protected onSubmit() {
        this.dispatchEvent(new CustomEvent("submit"));
    }
}


/* ---------------------------------------- */


function getGeneralSettingsTemplate(metadata: DashboardMetadata, update: () => void, submit: () => void): TemplateResult {
    console.log(metadata);
    return html`
        <div>
            <tb-input class="tbInput" id="displayNameInput" label="Displayname" placeholder="My special dashboard"
                      value="${metadata.displayName}" required @change="${(ev: CustomEvent) => { metadata.displayName = ev.detail.value; update(); }}"
            ></tb-input>
            <br/>
            <tb-input class="tbInput" .type="${InputType.TEXTAREA}" label="Description" placeholder="This is a very special dashboard."
                      value="${metadata.description}" @change="${(ev: CustomEvent) => { metadata.description = ev.detail.value; update(); }}"
            ></tb-input>
            <br/>
        </div>
    `
}

function getAppearanceSettingsTemplate(metadata: DashboardMetadata | undefined): TemplateResult {
    return html`
        <div>
            <form class="input-validation-type">
                <sl-input label="Some settig" placeholder="Idk" value="${metadata?.displayName}" required></sl-input>
                <br />
                <sl-button type="submit" variant="primary">Submit</sl-button>
                <sl-button type="reset" variant="default">Reset</sl-button>
            </form>
        </div>
    `
}