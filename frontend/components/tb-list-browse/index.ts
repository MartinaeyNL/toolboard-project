import {css, html, LitElement, TemplateResult} from "lit";
import {GetCurrentDashboardObserver} from "@toolboard/tb-state";
import {customElement, property, state} from "lit/decorators.js";
import {styleMap} from "lit/directives/style-map.js";
import {globalStyle} from "@toolboard/tb-utils";
import {when} from "lit/directives/when.js";

export interface TbListItem {
    id: string,
    title?: string | TemplateResult
    description?: string | TemplateResult
    prefixIcon?: string
    prefixTemplate?: TemplateResult
    suffixIcon?: string
    suffixTemplate?: TemplateResult
    backgroundColor?: string
    backgroundAccentColor?: string
    hoverColor?: string,
    hoverAccentColor?: string
    selectedColor?: string
    selectedAccentColor?: string
    clickable?: boolean
}
export type ListItem = string | TemplateResult | TbListItem

// Utility functions
export function isListItemTemplateResult(item: any): item is TemplateResult {
    return 'strings' in item;
}
export function isListItemAListItem(item: any): item is TbListItem {
    return 'id' in item;
}

const styling = css`
  
  #item-wrapper:hover {
    background: var(--tb-list-browse-hover-color) !important;
    border-left: 4px solid var(--tb-list-browse-hover-accentcolor) !important;
  }
`

@customElement("tb-list-browse")
export class TbListBrowse extends LitElement {

    @property()
    protected items: ListItem[] = [];
    @property()
    protected selected?: string; // id of the item. Not applicable if item is of type TemplateResult.

    @property()
    protected compact: boolean = false;

    @property()
    protected fillWidth: boolean = true;

    @property()
    protected transparent: boolean = false;

    @property()
    protected prefixIconSize: 'xl' | 'lg' | 'md' | 'sm' = 'xl'

    @property()
    protected suffixIconSize: 'xl' | 'lg' | 'md' | 'sm' = 'lg'

    // Local vars
    protected dashboardSub: any;

    /* ---------------------------------- */

    // Import css
    static styles = [globalStyle, styling];

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dashboardSub.unsubscribe()
    }

    protected getBaseItemStyleMap(item: ListItem): {} {
        return {
            background: (this.transparent ? 'none' : '#707070'), // TODO: fix this
            padding: (this.compact ? '8px 12px' : '16px 24px')
        }
    }
    protected getListItemStyleMap(item: TbListItem, isSelected: boolean = false) {
        const bgColor = isSelected ? item.selectedColor : item.backgroundColor;
        const accentColor = isSelected ? item.selectedAccentColor : item.backgroundAccentColor;
        return {
            transition: 'border 0.2s, background 0.3s',
            background: (bgColor ? bgColor : 'transparent'),
            borderLeft: (accentColor ? ("4px solid " + accentColor) : '4px solid transparent'),
            '--tb-list-browse-hover-color': (item.hoverColor ? item.hoverColor : undefined),
            '--tb-list-browse-hover-accentcolor': (item.hoverAccentColor ? item.hoverAccentColor : undefined)
        }
    }

    // UI rendering
    protected render(): TemplateResult {
        const containerStyleMap = {
            display: 'flex',
            flexDirection: 'column',
            gap: (this.compact ? '8px' : '16px'),
            width: (this.fillWidth ? 'auto' : 'fit-content'),
        }
        return html`
            <div>
                <div style="${styleMap(containerStyleMap)}">
                    ${this.items.map((item: ListItem) => {
                        const itemWrapperStyleMap = this.getBaseItemStyleMap(item);
                        if(typeof item == 'string') {
                            const isSelected = (item == this.selected);
                            return html`
                                <div style="${styleMap(itemWrapperStyleMap)}" @click="${() => this.onListItemClick(item)}">
                                    <h2>${item}</h2>
                                </div>
                            `;
                        } else if(isListItemTemplateResult(item)) {
                            return html`
                                <div style="${styleMap(itemWrapperStyleMap)}" @click="${() => this.onListItemClick(item)}">
                                    ${item}
                                </div>
                            `;
                        } else if(isListItemAListItem(item)) {
                            const isSelected = (item.id == this.selected);
                            const listItemStyleMap = this.getListItemStyleMap(item, isSelected);
                            return html`
                                <div id="item-wrapper" style="${styleMap({...itemWrapperStyleMap, ...listItemStyleMap})}" @click="${() => this.onListItemClick(item)}">
                                    <div id="item-container" style="display: flex; gap: 20px; align-items: center;">
                                        ${when(item.prefixIcon != undefined || item.prefixTemplate != undefined, () => html`
                                            ${item.prefixTemplate ? html`
                                                ${item.prefixTemplate}
                                            ` : html`
                                                <div id="item-prefixIcon-container">
                                                    <sl-icon name="${item.prefixIcon}" style="font-size: var(--tb-icon-size-${this.prefixIconSize})"></sl-icon>
                                                </div>
                                            `}
                                        `)}
                                        <div id="item-content" style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                                            <h2>${item.title ? item.title : item.id}</h2>
                                            <span>${item.description}</span>
                                        </div>
                                        ${when(item.suffixIcon != undefined || item.suffixTemplate != undefined, () => html`
                                            ${item.suffixTemplate != undefined ? html`
                                                ${item.suffixTemplate}
                                            ` : html`
                                                <div id="item-suffixIcon-container" style="margin-left: 48px;">
                                                    <sl-icon name="${item.suffixIcon}" style="font-size: var(--tb-icon-size-${this.suffixIconSize})"></sl-icon>
                                                </div>
                                            `}
                                        `)}
                                    </div>
                                </div>
                            `;
                        }
                    })}
                </div>
            </div>
        `
    }

    protected onListItemClick(item: ListItem) {
        this.dispatchEvent(new CustomEvent("select", { detail: { value: item }}))
    }
}