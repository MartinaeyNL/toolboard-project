import {html} from 'lit';
import "./index";

export default {
    title: 'Components/tb-list-browse',
    component: 'tb-list-browse',
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        prefixIconSize: {
            options: ['xl', 'lg', 'md', 'sm'],
            control: { type: 'inline-radio' },
        },
        suffixIconSize: {
            options: ['xl', 'lg', 'md', 'sm'],
            control: { type: 'inline-radio' },
        },
    },
};


const defaultItems = [
    "Item 1",
    {
        id: 'test-item',
        title: 'The TbListItem one',
        description: 'A very special object if you ask me',
        prefixIcon: 'gear',
        suffixIcon: 'chevron-right'
    },
    html`<span style="color: green;">HTML 3</span>`
]
export const Primary = {
    render: (args) => {
        return html`
            <tb-list-browse .items="${args.items}" .compact="${args.compact}" .fillWidth="${args.fillWidth}"
                            .transparent="${args.transparent}" .prefixIconSize="${args.prefixIconSize}"
                            .suffixIconSize="${args.suffixIconSize}"
            ></tb-list-browse>
        `
    },
    args: {
        items: defaultItems,
        compact: false,
        fillWidth: true,
        transparent: false,
        prefixIconSize: 'xl',
        suffixIconSize: 'lg'
    },
};