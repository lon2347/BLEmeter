// ble.service.ts
import { Injectable } from '@angular/core';

import { BLE } from '@ionic-native/ble/ngx';

const NORDIC_UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dc4179';
const NORDIC_UART_TX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dc4179';
const NORDIC_UART_RX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dc4179';

@Injectable({
  providedIn: 'root'
})
export class BleService {
  private onNotificationCallback: (buffer: ArrayBuffer) => void;

  constructor(private ble: BLE) { }

  public setNotificationCallback(callback: (buffer: ArrayBuffer) => void) {
    this.onNotificationCallback = callback;
  }
  public startNotification(deviceId: string, serviceUUID: string, characteristicUUID: string) {
    this.ble.startNotification(deviceId, serviceUUID, characteristicUUID).subscribe(
      (data: ArrayBuffer) => {
        if (this.onNotificationCallback) {
          this.onNotificationCallback(data);
        }
      },
      error => console.error('Error starting notification:', error)
    );
  }
  public stopNotification(deviceId: string, serviceUUID: string, characteristicUUID: string) {
    console.log('Stopping notification');
    this.ble.stopNotification(deviceId, serviceUUID, characteristicUUID)
  }
}

