import { html } from 'lit';
import "./index";

export default {
    title: 'Components/tb-notification',
    component: 'tb-notification',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-notification></tb-notification>
        `
    }
};