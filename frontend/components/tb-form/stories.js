import { html } from 'lit';
import "./index";

export default {
    title: 'Components/tb-form',
    component: 'tb-form',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: (args) => {
        return html`
            <tb-form></tb-form>
        `
    }
};