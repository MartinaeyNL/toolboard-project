import { html } from 'lit';
import "./index";

export default {
    title: 'Components/tb-split-panel',
    component: 'tb-split-panel',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-split-panel></tb-split-panel>
        `
    }
};