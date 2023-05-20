import { html } from 'lit';
import "./index";

export default {
    title: 'Features/tb-dashboard-card',
    component: 'tb-dashboard-card',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-dashboard-card></tb-dashboard-card>
        `
    }
};