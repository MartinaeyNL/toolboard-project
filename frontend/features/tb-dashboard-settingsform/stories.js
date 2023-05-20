import { html } from 'lit';
import "./index";

export default {
    title: 'Features/tb-dashboard-settingsform',
    component: 'tb-dashboard-settingsform',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-dashboard-settingsform></tb-dashboard-settingsform>
        `
    }
};