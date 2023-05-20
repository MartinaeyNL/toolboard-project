import {html, LitElement} from "lit";
import {customElement, property} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';
import {globalStyle} from "@toolboard/tb-utils";
import {TbMenuItem, TbMenuItemType} from "@toolboard/tb-menu";
import {GetCurrentPageObserver, SetCurrentPage, ShowNotification} from "@toolboard/tb-state";
import "@toolboard/tb-notification";

import "pages-desktop-home";
import "pages-desktop-dashboard-editor";
import "pages-desktop-dashboard-settings";

export enum DesktopPage {
    PAGE_HOME = "home",
    PAGE_WIDGETS = "widgets",
    PAGE_SETTINGS = "settings",
    PAGE_DASHBOARD_SETTINGS = "dashboard-settings",
    PAGE_DASHBOARD_EDITOR = "dashboard-editor"
}

@customElement("pages-desktop-main")
export class DesktopMain extends LitElement {

    @property()
    protected currentPage?: DesktopPage;

    static styles = [globalStyle];

    constructor() {
        super();
        GetCurrentPageObserver().subscribe((pageStr) => {
            const value = Object.entries(DesktopPage).find((e) => {
                return e[1] == pageStr;
            });
            if(value == undefined) {
                this.currentPage = DesktopPage.PAGE_HOME;
                ShowNotification("page_not_exist", {
                    variant: "danger",
                    text: "Error! This page does not exist!"
                })
            } else {
                this.currentPage = value[1];
            }
        })
    }


    /* --------------------------- */

    // When user selects different page from the sidebar
    protected onMenuItemClick(id: string) {
        SetCurrentPage(id);
    }

    // HTML UI rendering function
    protected render() {
        const menuItems: TbMenuItem[] = [
            { id: "home", type: TbMenuItemType.ICON_BUTTON, icon: 'columns-gap', label: "My Dashboards", tooltip: "My Dashboards", tooltipPos: 'right' },
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
                        [DesktopPage.PAGE_HOME, () => html`<pages-desktop-home></pages-desktop-home>`],
                        [DesktopPage.PAGE_DASHBOARD_SETTINGS, () => html`<pages-desktop-dashboard-settings></pages-desktop-dashboard-settings>`],
                        [DesktopPage.PAGE_DASHBOARD_EDITOR, () => html`<pages-desktop-dashboard-editor></pages-desktop-dashboard-editor>`]
                    ], () => html`
                        <span>ERROR: Could not find any selected page.</span>
                    `)}
                </div>
            </div>
            <tb-notification style="position: absolute; bottom: 0; right: 0; margin: 24px;"></tb-notification>
        `
    }
}