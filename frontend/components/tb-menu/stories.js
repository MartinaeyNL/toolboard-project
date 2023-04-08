import { html } from 'lit';
import "./index";
import {TbMenuItemType} from "./index";

export default {
    title: 'Components/tb-menu',
    component: 'tb-menu',
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        itemSize: {
            options: ['xl', 'lg', 'md', 'sm'],
            control: { type: 'inline-radio' },
        },
    },
};

const defaultItems = [
    {
        type: TbMenuItemType.ICON_BUTTON,
        id: 'test',
        label: 'Item',
        icon: 'gear',
        tooltip: 'Click here!',
        tooltipPos: 'top'
    },
    {
        type: TbMenuItemType.ICON_BUTTON,
        id: 'test1',
        label: 'Item 2',
        icon: 'gear',
        tooltip: 'Click here!',
        tooltipPos: 'top'
    },
    {
        type: TbMenuItemType.ICON_BUTTON,
        id: 'test2',
        label: 'Item 3',
        icon: 'gear',
        tooltip: 'Click here!',
        tooltipPos: 'top'
    },
    {
        type: TbMenuItemType.ICON_BUTTON,
        id: 'test3',
        label: 'Item 4',
        icon: 'gear',
        alignEnd: true,
        tooltip: 'Click here!',
        tooltipPos: 'top'
    }
]

export const Primary = {
    render: (args) => {
        return html`
            <tb-menu .vertical="${args.vertical}" .transparent="${args.transparent}"
                     .items="${args.items}" .itemSize="${args.itemSize}"
            ></tb-menu>
        `
    },
    args: {
        items: defaultItems,
        vertical: false,
        transparent: false,
        itemSize: 'lg'
    },
};