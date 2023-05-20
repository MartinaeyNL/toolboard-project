import {html, LitElement, PropertyValues, TemplateResult} from "lit";
import { customElement, state } from "lit/decorators.js";
import { Dashboard } from "@toolboard/tb-api";
import { GetCurrentDashboardObserver } from "@toolboard/tb-state";
import {globalStyle} from "@toolboard/tb-utils"
import "@toolboard/tb-dashboard-settingsform";

@customElement("pages-desktop-dashboard-editor")
export class DesktopDashboardEditor extends LitElement {

    @state()
    protected selected?: Dashboard;

    @state()
    protected loadedDashboards: Dashboard[] = [];

    // Local vars
    protected dashboardSub?: any;

    static styles = [globalStyle];

    protected willUpdate(_changedProperties: PropertyValues) {
        if (!this.dashboardSub) {
            this.dashboardSub = GetCurrentDashboardObserver().subscribe((dashboard) => {
                this.selected = dashboard;
            })
        }
    }

    protected render(): TemplateResult {
        return html`
            <span>This is what the editor should look like.</span>
        `
    }

}