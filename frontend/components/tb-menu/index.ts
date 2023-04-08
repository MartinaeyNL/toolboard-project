import {css, html, LitElement, TemplateResult} from "lit";
import {customElement, query, property} from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {map} from 'lit/directives/map.js';
import {globalStyle} from "@toolboard/tb-utils";

// Shoelace UI imports
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

// @ts-ignore
import shoelaceLightStyle from "@shoelace-style/shoelace/dist/themes/light.styles.js"
// @ts-ignore
import shoelaceDarkStyle from "@shoelace-style/shoelace/dist/themes/dark.styles.js";

const styling = css`
    .wrapper {
      background: var(--tb-color-background-700);
    }
    .wrapper_transparent {
      background: transparent;
    }
    .wrapper_vertical {
      width: fit-content;
      height: 100%;
    }
    .wrapper_horizontal {
      height: fit-content;
    }
    .fit_content {
      width: fit-content;
      height: fit-content;
    }
    .container {
      display: flex;
      padding: 18px;
      gap: 18px;
    }
    .menu_vertical {
      flex-direction: column;
      justify-content: center;
      height: calc(100% - 36px);
    }
    .menu_horizontal {
      flex-direction: row;
      align-items: center;
    }
  
    sl-icon-button {
      font-size: 18px;
    }
`;

export enum TbMenuItemType {
    ICON_BUTTON,
    TEXT_BUTTON,
    ICON_WITH_TEXT_BUTTON
}

export interface TbMenuItem {
    type: TbMenuItemType
    id: string,
    label?: string,
    icon?: string,
    alignEnd?: boolean,
    tooltip?: string,
    tooltipPos?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'
}

@customElement("tb-menu")
export class TbMenu extends LitElement {

    @property()
    protected items: TbMenuItem[] = [];

    @property()
    protected vertical: boolean = false;

    @property()
    protected transparent: boolean = false;

    @property()
    protected itemSize: 'xl' | 'lg' | 'md' | 'sm' = 'lg'


    /* ---------- */

    static styles = [globalStyle, shoelaceLightStyle, shoelaceDarkStyle, styling]

    protected render(): TemplateResult {
        const wrapperClasses = {
            wrapper: !this.transparent,
            wrapper_transparent: this.transparent,
            wrapper_vertical: this.vertical,
            wrapper_horizontal: !this.vertical,
            fit_content: !(this.items.find((item) => item.alignEnd != undefined))
        }
        const containerClasses = {
            menu_vertical: this.vertical,
            menu_horizontal: !this.vertical
        }
        return html`
            <div class="${classMap(wrapperClasses)}">
                <div class="container ${classMap(containerClasses)}">
                    ${map(this.items, (item) => {
                        const alignStyles = {
                            "margin-left": item.alignEnd && !this.vertical ? 'auto' : 'unset',
                            "margin-top": item.alignEnd && this.vertical ? 'auto': 'unset'
                        };
                        return html`
                            <div style="${styleMap(alignStyles)}">
                                ${this.getItemTemplate(item)}
                            </div>
                        `;
                    })}
                </div>
            </div>
        `
    }

    protected onItemClick(id: string) {
        this.dispatchEvent(new CustomEvent("select", { detail: id }))
    }

    protected getItemTemplate(menuItem: TbMenuItem): TemplateResult {
        switch (menuItem.type) {
            case TbMenuItemType.ICON_BUTTON:
                if(menuItem.tooltip) {
                    return html`
                        <sl-tooltip content="${menuItem.tooltip}" placement="${menuItem.tooltipPos}">
                            <sl-icon-button id="${menuItem.id}" name="${menuItem.icon}" label="${menuItem.label}" style="font-size: var(--tb-icon-size-${this.itemSize})"
                                            @click="${() => this.onItemClick(menuItem.id)}"
                            ></sl-icon-button>
                        </sl-tooltip>
                    `
                } else {
                    return html`<sl-icon-button id="${menuItem.id}" name="${menuItem.icon}" label="${menuItem.label}" @click="${() => this.onItemClick(menuItem.id)}"></sl-icon-button>`
                }
            case TbMenuItemType.TEXT_BUTTON:
                return html`
                    <span id="${menuItem.id}">${menuItem.label}</span>
                `;
            case TbMenuItemType.ICON_WITH_TEXT_BUTTON:
                return html`
                    <span id="${menuItem.id}">WIP</span>
                `
            default:
                return html`<span>Error</span>`
        }
    }
}