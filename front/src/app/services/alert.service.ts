import { Injectable } from "@angular/core";
import { AlertType } from '../models/alert-type.model';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    public alerts = [];

    constructor() { }

    set(type: AlertType, message: string, persistent: boolean = false) {
        this.clear();
        return this.add(type, message, persistent);
    }

    add(type: AlertType, message: string, persistent: boolean = false) {
        this.alerts.push({
            type: type,
            message: message,
            persistent: persistent,
            close: () => {
                return this.close(this)
            }
        });
    }

    close(alert: object) {
        return this.closeIdx(this.alerts.indexOf(alert));
    }

    closeIdx(index: number) {
        return this.alerts.splice(index, 1);
    }

    clear() {
        this.alerts = [];
    }

    clearTemp() {
        this.alerts = this.alerts.filter(obj => obj.persistent);
        this.alerts = this.alerts.map(function(obj) { obj.persistent = false; return obj; });
    }
}