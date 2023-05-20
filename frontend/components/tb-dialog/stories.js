import { html } from 'lit';
import "./index";

export default {
    title: 'Components/tb-dialog',
    component: 'tb-dialog',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-dialog></tb-dialog>
        `
    }
};