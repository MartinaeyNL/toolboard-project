import { html } from 'lit';
import "./index.ts";

export default {
    title: 'Pages/desktop-main',
    component: 'pages-desktop-main',
    parameters: {
        layout: 'fullscreen'
    },
};

export const Primary = {
    render: () => html`<pages-desktop-main></pages-desktop-main>`,
};