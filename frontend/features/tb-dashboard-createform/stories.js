import { html } from 'lit';
import "./index";

export default {
    title: 'Features/tb-dashboard-createform',
    component: 'tb-dashboard-createform',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-dashboard-createform></tb-dashboard-createform>
        `
    }
};