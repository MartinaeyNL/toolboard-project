import { html } from 'lit';
import "./index";

export default {
    title: 'Components/tb-button',
    component: 'tb-button',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-button></tb-button>
        `
    }
};