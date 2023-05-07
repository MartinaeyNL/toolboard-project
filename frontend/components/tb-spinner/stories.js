import { html } from 'lit';
import "./index";

export default {
    title: 'Components/tb-spinner',
    component: 'tb-spinner',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-spinner></tb-spinner>
        `
    }
};