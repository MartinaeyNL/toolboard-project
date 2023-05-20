import {html, LitElement, TemplateResult} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import {choose} from "lit/directives/choose.js";


// Shoelace UI imports
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';

// @ts-ignore
import shoelaceLightStyle from "@shoelace-style/shoelace/dist/themes/light.styles.js"
// @ts-ignore
import shoelaceDarkStyle from "@shoelace-style/shoelace/dist/themes/dark.styles.js";
import {globalStyle} from "../../utils/tb-utils";

export enum InputType {
    TEXT, TEXTAREA
}

@customElement("tb-input")
export class TbInput extends LitElement {

    @property()
    protected type: InputType = InputType.TEXT;

    @property()
    protected label?: string;

    @property()
    protected placeholder?: string;

    @property()
    protected required: boolean = false;

    @property()
    protected value?: any;

    @property()
    protected autocomplete: boolean = false;

    @query('sl-input, sl-textarea')
    protected inputElem?: HTMLInputElement;


    static styles = [globalStyle, shoelaceLightStyle, shoelaceDarkStyle]


    protected render(): TemplateResult {
        return html`
            ${choose(this.type, [
                
                // Regular text field
                [InputType.TEXT, () => html`
                    <sl-input type="text" label="${this.label}" placeholder="${this.placeholder}" autocomplete="${this.autocomplete ? undefined : 'off'}"
                              value="${this.value}" required="${this.required}" @sl-change="${() => this.onInputChange()}"
                    ></sl-input>
                `],
                    
                // Larger text area
                [InputType.TEXTAREA, () => html`
                    <sl-textarea label="${this.label}" placeholder="${this.placeholder}" autocomplete="${this.autocomplete ? undefined : 'off'}"
                                 value="${this.value}" @sl-change="${() => this.onInputChange()}"
                    ></sl-textarea>
                `]
            ], () => html`
                <sl-input type="text" label="${this.label}" placeholder="${this.placeholder}" autocomplete="${this.autocomplete ? undefined : 'off'}"
                          value="${this.value}" required="${this.required}" @sl-change="${() => this.onInputChange()}"
                ></sl-input>
            `)}
        `
    }

    protected onInputChange() {
        const value = (this.inputElem as any).value;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: value }}))
    }

    public focus(options: FocusOptions) {
        console.log("focus()");
        this.inputElem?.focus(options);
    }
    public blur() {
        console.log("blur()");
        this.inputElem?.blur();
    }
    public select() {
        console.log("select()");
        this.inputElem?.select();
    }
    public checkValidity(): any {
        console.log("checkValidity() [" + this.label + "]");
        return this.inputElem?.checkValidity();
    }
    public reportValidity(): any {
        console.log("reportValidity() [" + this.label + "]");
        return this.inputElem?.reportValidity();
    }
}