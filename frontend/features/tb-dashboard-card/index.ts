import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import {GetCurrentDashboardObserver, SetCurrentPage} from "@toolboard/tb-state";
import {Dashboard} from "@toolboard/tb-api";
import {globalStyle} from "@toolboard/tb-utils";
import {PropertyValues} from "lit/development";
import {when} from "lit/directives/when.js";
import "@toolboard/tb-button";

@customElement("tb-dashboard-card")
export class TbDashboardCard extends LitElement {

    @property()
    protected selected?: Dashboard;

    @property()
    protected loading: boolean = false;

    // local vars
    protected dashboardSub?: any;

    static styles = [globalStyle];

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dashboardSub?.unsubscribe()
    }

    protected willUpdate(_changedProperties: PropertyValues) {
        if(!this.selected && !this.dashboardSub) {
            this.dashboardSub = GetCurrentDashboardObserver().subscribe((dashboard) => {
                this.selected = dashboard;
            })
        }
    }

    protected render(): TemplateResult {
        return html`
            ${when(this.loading, () => html`
                <span>Loading..</span>
            `, () => html`
                ${when(!this.selected, () => html`
                    <span>No dashboard has been selected.</span>
                `, () => {
                    const d = this.selected;
                    console.log(d);
                    return html`
                        <div id="card-wrapper" style="height: 100%; width: 100%;">
                            <div id="card-container" style="height: 100%; display: flex; flex-direction: column; align-items: center;">
                                
                                <!-- Header image -->
                                <div id="card-image-container" style="width: 100%;">
                                    ${when(d?.metadata?.headerImage, () => {
                                        const imageSrc = 'data:image/png;base64,' + (d!.metadata!.headerImage)
                                        return html`
                                            <img src="${imageSrc}"  alt="Alternative text"/>
                                        `
                                    }, () => html`
                                        <div style="background: #707070; display: flex; justify-content: center; align-items: center; aspect-ratio: 16 / 9;">
                                            <span>No image found.</span>
                                        </div>
                                    `)}
                                </div>

                                <!-- action buttons for the header image -->
                                <div id="bottomContent-wrapper" style="width: 100%; display: flex; justify-content: end; gap: 12px; margin-top: 4px;">
                                    <tb-button type="icon" icon="gear" size="md"></tb-button>
                                </div>
                                
                                
                                <!-- Main content, which is everything else than the image -->
                                <div id="content-wrapper" style="flex: 1; width: 100%; display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
                                    
                                    <!-- Top aligned content, aka action buttons, displayname and description -->
                                    <div id="topContent-wrapper" style="display: flex; flex-direction: column; gap: 12px;">
                                        <div id="displayName-container" style="display: flex; justify-content: center;">
                                            ${when(d?.metadata?.displayName, () => html`
                                            <h2>${d!.metadata!.displayName}</h2>
                                        `, () => html`
                                            <h2 style="opacity: 0.7;">Displayname not defined</h2>
                                        `)}
                                        </div>
                                        ${when(d?.metadata?.description, () => html`
                                        <div id="description-container">
                                            <span>${d!.metadata!.description}</span>
                                        </div>
                                    `)}
                                    </div>
                                    
                                    <!-- Bottom aligned content, such as the "Edit" button -->
                                    <div id="bottomContent-wrapper" style="display: flex; gap: 12px; justify-content: end;">
                                        <div id="controls-container" style="display: flex; align-items: center; gap: 8px;">
                                            <tb-button type="icon" icon="share" label="Share" size="md"></tb-button>
                                            <tb-button type="icon" icon="gear" label="Dashboard Settings" size="lg" @click="${() => this.onEditClick()}"></tb-button>
                                            <tb-button text="View" @click="${() => {}}"></tb-button>
                                            <tb-button text="Edit" variant="primary"></tb-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                })}
            `)}
        `
    }

    protected onEditClick() {
        SetCurrentPage('dashboard-settings')
        /*this.dispatchEvent(new CustomEvent("edit", { detail: { value: this.selected }}))*/
    }

}