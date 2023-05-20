import { html } from 'lit';
import "./index";

export default {
    title: 'Components/tb-input',
    component: 'tb-input',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-input></tb-input>
        `
    }
};