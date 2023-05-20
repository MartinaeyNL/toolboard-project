import { globalStyle } from "@toolboard/tb-utils";
import {html, LitElement, TemplateResult} from "lit";
import {customElement, query, state} from "lit/decorators.js";
import {TbForm} from "@toolboard/tb-form";
import {Api, Dashboard} from "@toolboard/tb-api";
import {InputType} from "@toolboard/tb-input";
import "@toolboard/tb-form"; // TODO: Do i need this import?

@customElement("tb-dashboard-createform")
export class TbDashboardCreateform extends LitElement {

    @state()
    protected dashboard: Dashboard = this.initDashboard();

    @state()
    protected isSubmitting: boolean = false;

    @query("tb-form")
    protected formElem?: TbForm;

    static styles = [globalStyle]

    protected render(): TemplateResult {
        return html`
            <div>
                <tb-form autoValidate="true" .loading="${this.isSubmitting}" @submit="${() => this.onSubmit()}">
                    <tb-input class="tbInput" id="displayNameInput" label="Displayname" placeholder="My special dashboard"
                              value="${this.dashboard.metadata!.displayName}" required @change="${(ev: CustomEvent) => { this.dashboard.metadata!.displayName = ev.detail.value; }}"
                    ></tb-input>
                    <br/>
                    <tb-input class="tbInput" .type="${InputType.TEXTAREA}" label="Description" placeholder="This is a very special dashboard."
                              value="${this.dashboard.metadata!.description}" @change="${(ev: CustomEvent) => { this.dashboard.metadata!.description = ev.detail.value; }}"
                    ></tb-input>
                </tb-form>
            </div>
        `;
    }

    protected onSubmit() {
        console.log("Submit!");
        console.log(this.dashboard);
        this.isSubmitting = true;
        new Api().dashboard.postDashboard(this.dashboard).finally(() => {
            this.isSubmitting = false;
            this.dispatchEvent(new CustomEvent("submit"))
        })
    }

    protected initDashboard(): Dashboard {
        return {
            metadata: {}
        }
    }
}