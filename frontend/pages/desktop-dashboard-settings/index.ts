import {css, html, LitElement, PropertyValues, TemplateResult} from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyle } from "@toolboard/tb-utils";
import {Api, Dashboard} from "@toolboard/tb-api";
import { GetCurrentDashboardObserver } from "@toolboard/tb-state";
import { when } from 'lit/directives/when.js';
import "@toolboard/tb-dashboard-settingsform";

//language=css
const styling = css`
    .content-panel {
        flex: 1;
        padding: 24px;
        background: var(--tb-color-background-300)
    }
`;

@customElement("pages-desktop-dashboard-settings")
export class DesktopDashboardSettings extends LitElement {

    @state()
    protected selected?: Dashboard;

    @state()
    protected loadedDashboards?: Dashboard[];

    @state()
    protected isLoading = false;

    // Local vars
    protected dashboardSub?: any;

    static styles = [globalStyle, styling];

    protected willUpdate(_changedProperties: PropertyValues) {
        if (!this.dashboardSub) {
            this.dashboardSub = GetCurrentDashboardObserver().subscribe((dashboard) => {
                console.log(dashboard);
                if(dashboard == undefined) {
                    this.fetchAllDashboards().then((dashboards) => {
                        this.selected = dashboards[0]
                    })
                } else {
                    this.selected = dashboard;
                }
            })
        }
    }

    protected async fetchAllDashboards(): Promise<Dashboard[]> {
        this.isLoading = true;
        const promise = new Api().dashboard.getDashboard();
        promise.finally(() => {
            this.isLoading = false;
        })
        const response = await promise;
        return response.data;
    }

    protected render(): TemplateResult {
        return html`
            <div id="wrapper" style="height: calc(100% - 36px); padding: 18px 27px;">
                <div id="container" style="display: flex; flex-direction: column; height: 100%; gap: 18px;">
                    <div id="top-bar" style="padding: 9px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                ${when(this.selected?.id, () => html`
                                    <h1>Settings of Dashboard #${this.selected?.id}</h1>
                                `, () => html`
                                    <div>
                                        <h1 style="display: inline;">Settings of Dashboard</h1>
                                        <h1 style="display: inline; opacity: 0.5; margin-left: 4px;">#0</h1>
                                    </div>
                                `)}
                            </div>
                            <div>
                                <span>Button 1</span>
                                <span>Button 2</span>
                            </div>
                        </div>
                    </div>
                    <div id="content" style="flex: 1;">
                        <div id="content-container" style="display: flex; gap: 27px;">
                            <div class="content-panel">
                                ${when(this.isLoading, () => html`
                                    <tb-spinner></tb-spinner>
                                `, () => html`
                                    <tb-dashboard-settingsform panel="general" .metadata="${this.selected?.metadata}"
                                                               @submit="${(e: CustomEvent) => this.onMetadataSubmit()}"
                                    ></tb-dashboard-settingsform>
                                `)}
                            </div>
                            <div class="content-panel">
                                <tb-dashboard-settingsform panel="appearance" .metadata="${this.selected?.metadata}"
                                                           @submit="${(e: CustomEvent) => this.onMetadataSubmit()}"
                                ></tb-dashboard-settingsform>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    protected onMetadataSubmit() {
        console.log(this.selected?.metadata);
        const dashboard = this.selected as Dashboard;
        console.log(dashboard);
        new Api().dashboard.putDashboard(dashboard).then((value) => {
            console.log("fulfilled!");
            console.log(value);
        }, (reason) => {
            console.log("failed!");
            console.error(reason);
        }).finally(() => {
            console.log("Done!")
        })
    }
}