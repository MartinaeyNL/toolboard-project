import {html, LitElement, PropertyValues, TemplateResult} from "lit";
import {customElement, query, state} from 'lit/decorators.js';
import "@toolboard/tb-split-panel";
import {GetCurrentDashboardObserver, SetCurrentDashboard} from "@toolboard/tb-state";
import {Api, Dashboard, HttpResponse} from "@toolboard/tb-api";
import {globalStyle} from "@toolboard/tb-utils";
import { when } from "lit/directives/when.js";
import {ListItem, TbListItem} from "@toolboard/tb-list-browse";
import "@toolboard/tb-dashboard-card";
import "@toolboard/tb-dashboard-createform";
import "@toolboard/tb-dialog";
import "@toolboard/tb-list-browse";
import "@toolboard/tb-spinner";
import {TbDialog} from "@toolboard/tb-dialog";

@customElement("pages-desktop-home")
export class DesktopHome extends LitElement {

    @state()
    protected selected?: Dashboard;

    @state()
    protected loadedDashboards?: Dashboard[];

    @state()
    protected dashboardPromise?: Promise<HttpResponse<Dashboard[], void>>;

    @query('tb-dialog')
    protected createDashboardDialogElem?: TbDialog;

    // Local vars
    protected dashboardSub?: any;

    static styles = [globalStyle];

    /* --------------------- */

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dashboardSub?.unsubscribe()
    }

    protected willUpdate(_changedProperties: PropertyValues) {
        console.log(_changedProperties);
        if(!this.dashboardSub) {
            this.dashboardSub = GetCurrentDashboardObserver().subscribe((dashboard) => {
                this.selected = dashboard;
            })
        }
        if(this.loadedDashboards == undefined && !this.isLoading()) {
            this.getAllDashboards().then((dashboards) => {
                if(dashboards == undefined) {
                    console.error("dashboards was undefined!");
                    dashboards = [];
                }
                console.log(dashboards);
                this.loadedDashboards = dashboards;
            });
        }
    }

    protected async getAllDashboards(): Promise<Dashboard[] | undefined> {
        this.dashboardPromise = new Api().dashboard.getDashboard();
        this.dashboardPromise.finally(() => this.dashboardPromise = undefined);
        const response = await this.dashboardPromise;
        return response.data;
    }

    protected isLoading(): boolean {
        return this.dashboardPromise != undefined;
    }

    protected render() {
        return html`
            <div id="wrapper" style="height: calc(100% - 36px); padding: 18px 27px;">
                <div id="container" style="display: flex; flex-direction: column; height: 100%; gap: 18px;">
                    <div id="top-bar" style="padding: 9px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h1>Browse Dashboards</h1>
                            </div>
                            <div>
                                <span>Button 1</span>
                                <tb-button variant="primary" text="Create" icon="plus-lg" @click="${() => this.createDashboardDialogElem?.open()}"></tb-button>
                            </div>
                        </div>
                    </div>
                    <div id="content" style="flex: 1;">
                        <!-- TODO: This causes a 'disconnect' and 'connect' for the component within getLeftPanelTemplate(). Could be improved. -->
                        ${when(this.selected != null, () => html`
                            <tb-split-panel .start="${this.getLeftPanelTemplate()}" .end="${this.getRightPanelTemplate()}"></tb-split-panel>
                        `, () => html`
                            ${this.getLeftPanelTemplate()}
                        `)}
                    </div>
                </div>
            </div>
            <tb-dialog subject="Create a new Dashboard" .hideFooter="${true}">
                <tb-dashboard-createform @submit="${() => {
                    this.createDashboardDialogElem?.close();
                    this.loadedDashboards = undefined;
                }}"></tb-dashboard-createform>
            </tb-dialog>
        `
    }

    protected getLeftPanelTemplate(): TemplateResult {
        if(this.isLoading()) {
            return html`
                <div>
                    <tb-spinner></tb-spinner>
                    <span>Loading dashboards..</span>
                </div>
            `
        } else if(this.loadedDashboards?.length == 0) {
            return html`
                <div>
                    <span>No dashboards found.</span>
                </div>
            `
        } else if(this.loadedDashboards != null) {
            console.log(this.loadedDashboards);
            const items: TbListItem[] = this.loadedDashboards.map((d) => ({
                id: d.id.toString(),
                title: d.metadata?.displayName,
                description: d.metadata?.description,
                prefixIcon: "columns-gap",
                clickable: true,
                backgroundColor: "var(--tb-color-background-300)",
                hoverColor: "var(--tb-color-background-200)",
                hoverAccentColor: "yellow",
                selectedColor: "var(--tb-color-background-200)",
                selectedAccentColor: "yellow"
            }));
            const selectedItem = items.find((i) => i.id == this.selected?.id?.toString());
            return html`
                <div style="padding-right: 18px;">
                    <tb-list-browse .items="${items}" .selected="${selectedItem?.id}"
                                    @select="${(ev: CustomEvent) => this.onListItemSelect(ev.detail.value)}"></tb-list-browse>
                </div>
            `
        } else {
            return html`Error`
        }
    }

    protected onListItemSelect(item: ListItem) {
        const fItem = item as TbListItem;
        if(this.selected?.id?.toString() == fItem.id) {
            this.deselectDashboard();
        } else {
            this.selectDashboard(fItem.id);
        }
    }

    protected selectDashboard(id: string) {
        const dashboard = this.loadedDashboards.find((d) => d.id!.toString() == id);
        if(dashboard) {
            SetCurrentDashboard(dashboard);
        }
    }
    protected deselectDashboard() {
        SetCurrentDashboard(undefined);
    }

    protected getRightPanelTemplate(): TemplateResult {
        return html`
            <div style="padding-left: 18px; height: 100%;">
                <tb-dashboard-card></tb-dashboard-card>
            </div>
        `
    }
}