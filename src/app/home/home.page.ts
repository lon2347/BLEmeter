import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';
import { NavigationExtras } from '@angular/router';


const METER_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dc4179';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  devices: any[] = [];
  statusMessage: string;
  device: any;
  state: any;
  selectedRange: number;
  isScanning = false;

  constructor(public navCtrl: NavController,
    public popover: PopoverController,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone) {

  }
  ngOnInit(): void {

  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }
  ionViewWillLeave() {

  }

  scan() {

    if (this.isScanning) {
      console.log('Scan already in progress.');
      return;
    }
    this.isScanning = true;
    // this.devices = [];  // clear list
    this.ble.startScan([METER_SERVICE]).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );
    setTimeout(() => {
      this.ble.stopScan().then(() => {
        console.log('Scan stopped');
        this.isScanning = false;
      }).catch(err => {
        console.error('Error stopping scan', err);
        this.isScanning = false;
      });
    }, 4000); // Adjust the timeout as necessary
  }

  onDeviceDiscovered(device: any) {
    // console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }
  clear() {
    this.devices = [];  // clear list
  }
  matchesPattern(name: string): boolean {
    return /^HT-MA.*$/.test(name);  // Matches any string that starts with "HT-MA"
  }
  // If location permission is denied, you'll end up here
  async scanError(error: string) {

    this.setStatus('Error ' + error);
    const toast = await this.toastCtrl.create({
      message: '请开启蓝牙',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  setStatus(message: string) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device: any) {
    console.log(JSON.stringify(device) + ' selected');

    this.device = device; // it's very important to declare variable here
    const navigationExtras: NavigationExtras = {
      state: {
        device: this.device
      }
    };
    this.router.navigate(['sensor'], navigationExtras);
  }

  timeout(ms: number) { // pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}



