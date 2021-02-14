import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    constructor(
        public alerts: AlertService
    ) {

    }
}