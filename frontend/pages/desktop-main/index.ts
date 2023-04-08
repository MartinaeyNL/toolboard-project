import {html, LitElement} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';
import "pages-desktop-home";
import {globalStyle} from "@toolboard/tb-utils";
import {TbMenuItem, TbMenuItemType} from "@toolboard/tb-menu";

export enum DesktopPage {
    PAGE_HOME = "home",
    PAGE_DASHBOARDS = "dashboards",
    PAGE_WIDGETS = "widgets",
    PAGE_SETTINGS = "settings"
}

@customElement("pages-desktop-main")
export class DesktopMain extends LitElement {

    @property()
    protected currentPage?: DesktopPage;

    static styles = [globalStyle];

    constructor() {
        super();
        this.currentPage = DesktopPage.PAGE_HOME;
    }


    /* --------------------------- */

    // When user selects different page from the sidebar
    protected onMenuItemClick(id: string) {
        switch (id) {
            case "dashboards": this.currentPage = DesktopPage.PAGE_DASHBOARDS; break;
            case "widgets": this.currentPage = DesktopPage.PAGE_WIDGETS; break;
            case "settings": this.currentPage = DesktopPage.PAGE_SETTINGS; break;
            default: break;
        }
    }

    // HTML UI rendering function
    protected render() {
        const menuItems: TbMenuItem[] = [
            { id: "dashboards", type: TbMenuItemType.ICON_BUTTON, icon: 'columns-gap', label: "My Dashboards", tooltip: "My Dashboards", tooltipPos: 'right' },
            { id: "widgets", type: TbMenuItemType.ICON_BUTTON, icon: 'clipboard-data', label: "My Widgets", tooltip: "My Widgets", tooltipPos: 'right' },
            { id: "wip", type: TbMenuItemType.ICON_BUTTON, icon: 'pencil', label: "WIP", tooltip: "WIP", tooltipPos: 'right' },
            { id: "settings", type: TbMenuItemType.ICON_BUTTON, alignEnd: true, icon: 'gear', label: "Settings", tooltip: "Settings", tooltipPos: 'right' },
        ]
        return html`
            <div style="display: flex; height: 100%;">
                <div>
                    <tb-menu .vertical="${true}" .items="${menuItems}" .itemSize="${'lg'}" @select="${(ev: CustomEvent) => this.onMenuItemClick(ev.detail.value)}"></tb-menu>
                </div>
                <div style="flex: 1;">
                    ${choose(this.currentPage, [
                        [DesktopPage.PAGE_HOME, () => html`<pages-desktop-home></pages-desktop-home>`]
                    ], () => html`
                        <span>ERROR: Could not find any selected page.</span>
                    `)}
                </div>
            </div>
        `
    }
}