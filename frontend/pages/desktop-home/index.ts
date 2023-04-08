import {html, LitElement, TemplateResult} from "lit";
import {customElement} from 'lit/decorators.js';
import "@toolboard/tb-split-panel";
import {globalStyle} from "@toolboard/tb-utils";

@customElement("pages-desktop-home")
export class DesktopHome extends LitElement {

    static styles = [globalStyle];

    protected render() {
        return html`
            <div style="height: calc(100% - 36px); padding: 18px;">
                <div style="display: flex; flex-direction: column; height: 100%; gap: 18px;">
                    <div style="padding: 9px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h1>Browse Dashboards</h1>
                            </div>
                            <div>
                                <span>Button 1</span>
                                <span>Button 2</span>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1;">
                       <tb-split-panel .start="${this.getLeftPanelTemplate()}" .end="${this.getRightPanelTemplate()}"></tb-split-panel>
                    </div>
                </div>
            </div>
        `
    }

    protected getLeftPanelTemplate(): TemplateResult {
        return html`
            <div style="padding-right: 18px;">
                <span>This is a custom left panel!</span>
            </div>
        `
    }

    protected getRightPanelTemplate(): TemplateResult {
        return html`
            <div style="padding-left: 18px;">
                <span>This is a custom right panel!</span>
            </div>
        `
    }
}