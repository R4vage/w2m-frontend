import { Injectable, NgZone } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

type notificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  duration = 4000;
  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  emitNotification (message:string, type:notificationType) {
    this.zone.run(() => {
      this.snackBar.open( message, 'Close', {
        duration: this.duration,
        panelClass: [`${type}-notification`],
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    })
  }
}
