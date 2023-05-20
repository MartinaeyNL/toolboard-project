import {html, LitElement, PropertyValues, TemplateResult} from "lit";
import {customElement, state} from "lit/decorators.js";
import {GetNotificationObserver, Notification} from "@toolboard/tb-state";
import { globalStyle } from "@toolboard/tb-utils";
import {map} from "lit/directives/map.js";

import '@shoelace-style/shoelace/dist/components/alert/alert.js';

// @ts-ignore
import shoelaceLightStyle from "@shoelace-style/shoelace/dist/themes/light.styles.js"
// @ts-ignore
import shoelaceDarkStyle from "@shoelace-style/shoelace/dist/themes/dark.styles.js";


@customElement("tb-notification")
export class TbNotification extends LitElement {

    @state()
    protected notificationSub: any

    @state()
    protected activeNotifications: [string, Notification][] = [];

    static styles = [globalStyle, shoelaceLightStyle, shoelaceDarkStyle]

    protected willUpdate(_changedProperties: PropertyValues) {
        if(!this.notificationSub) {
            this.notificationSub = GetNotificationObserver().subscribe((notifications) => {
                const toNotify: [string, Notification][] = [];
                notifications.forEach((n, id) => {
                    if(!this.activeNotifications.find((an) => an[0] == id)) {
                        toNotify.push([id, n]);
                    }
                })
                // Clear activeNotifications and fill the array with the new ones.
                this.activeNotifications = [];
                notifications.forEach((n, id) => {
                    this.activeNotifications.push([id, n]);
                })
                // Do notifications
                this.updateComplete.then(() => {
                    toNotify.forEach((x) => this.notify(x[0], x[1]))
                })
            })
        }
    }

    protected notify(id: string, notification?: Notification) {
        if(notification != undefined) {
            const elem = this.shadowRoot?.querySelector('#' + id);
            if(elem) {
                (elem as any).show();
            } else {
                console.error("Notification HTMLElement could not be queried!")
            }
        } else {
            console.error("Internal error! Notification was invalid!")
        }
    }

    protected render(): TemplateResult {
        return html`
            ${map(this.activeNotifications, (n) => {
                return html`
                    <sl-alert id="${n[0]}" variant="${n[1].variant}" duration="${n[1].duration}" closable>
                        <sl-icon slot="icon" name="${n[1].icon}"></sl-icon>
                        <span>
                            ${n[1].text}
                        </span>
                    </sl-alert>
                `
            })}
        `;
    }
}