import { BehaviorSubject, Observable } from "rxjs";

export interface Notification {
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger'
    icon?: string
    duration?: number
    text: string
}

const currentNotificationSubject = new BehaviorSubject<Map<string, Notification>>(new Map());

export function GetNotificationObserver(): Observable<Map<string, Notification>> {
    return currentNotificationSubject.asObservable();
}
export function ShowNotification(id: string, value: Notification, autocomplete: boolean = true) {
    let notifications = currentNotificationSubject.getValue();
    if(!notifications.has(id)) {
        if(value.icon == undefined) {
            value.icon = getIconByVariant(value.variant);
        }
        if(value.duration == undefined) {
            value.duration = 5000;
        }
        notifications.set(id, value);
        currentNotificationSubject.next(notifications);
        if(autocomplete) {
            new Promise(r => setTimeout(r, value.duration)).then(() => {
                CompleteNotification(id);
            })
        }
    }
}
export function CompleteNotification(id: string) {
    let notifications = currentNotificationSubject.getValue();
    notifications.delete(id);
    currentNotificationSubject.next(notifications);
}

function getIconByVariant(variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger'): string {
    switch (variant) {
        case "primary": return "info-circle"
        case "success": return "check2-circle"
        case "neutral": return "gear"
        case "warning": return "exclamation-triangle"
        case "danger": return "exclamation-octagon"
    }
}