import {html, LitElement, PropertyValues} from "lit";
import {customElement, property, queryAssignedElements} from "lit/decorators.js";
import {TemplateResult} from "lit/development";
import {TbInput} from "@toolboard/tb-input";
import { globalStyle } from "@toolboard/tb-utils";

@customElement("tb-form")
export class TbForm extends LitElement {

    @property()
    protected readonly loading: boolean = false;

    @property()
    protected readonly autoValidate: boolean = false;

    @queryAssignedElements({selector: 'tb-input'})
    protected inputElems?: Array<TbInput>;

    static styles = [globalStyle]

    protected render(): TemplateResult {
        return html`
            <div>
                <slot></slot>
                <div>
                    <tb-button text="Save" variant="primary" .loading="${this.loading}" style="display: flex; justify-content: end; margin-top: 24px;" @click="${() => this.submit()}"></tb-button>
                </div>
            </div>
        `
    }
    protected firstUpdated(_changedProperties: PropertyValues) {
        this.inputElems?.forEach((e) => {
            e.addEventListener('change', () => {
                this.validate(false);
            })
        })
    }

    public validate(report: boolean = false): boolean {
        const invalidElem = this.inputElems?.find((e) => {
            return !(report ? e.reportValidity() : e.checkValidity());
        })
        return invalidElem == undefined;
    }
    public submit() {
        const valid = this.validate(true);
        if(valid) {
            this.dispatchEvent(new CustomEvent("submit"))
        }
    }
}