import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, NavigationStart, Params, Router } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';
import { BleService } from '../services/ble.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GlobalDataService } from '../services/global-data.service';

// Bluetooth UUIDs
const NORDIC_UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dc4179';
const NORDIC_UART_TX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dc4179';
const NORDIC_UART_RX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dc4179';

const readaddressString = "68AAAAAAAAAAAA681300DF16";
const rootstring = "6800000000000068";
const date_string = "110434343337";
const curve_string = "110A3234443945 33 3C 35 3C 57";
const time_string = "110404000102"


@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
})
export class SensorPage implements OnInit, OnDestroy {
  private routerSubscription: Subscription;

  interval: any;
  time = new Date(null);
  device: any;
  peripheral: any = {};
  resultStringArray: any[] = [];
  i = 0;
  actionflag = 0;

  updatedRootaddress: string;
  macAddress: string;
  meterAddress: string;
  addressflag = false;

  datedata: string;
  cs4datedata: string;
  ywd: string;

  timedata: string;
  cs4timedata: string;

  costrate: string;
  cs4costrate: string;

  need: string;
  cs4need: string;

  load: string;
  cs4load: string;

  subload: string;
  cs4subload: string;

  qarenerge: string;
  cs4qarenerge: string;

  eventrecord: string;
  cs4eventrecord: string;

  loadcurve: string;
  cs4loadcurve: string;

  requestMTUflag = false;

  statusMessage: string;

  deviceAddress: any[] = [];
  constructor(public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    private bleService: BleService,
    private globalData: GlobalDataService,
    private router: Router,
    private ble: BLE,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ngZone: NgZone) {

    const device = this.router.getCurrentNavigation().extras.state.device;
    this.device = device;

    this.ble.connect(device.id).subscribe(
      () => this.onConnected(),
      () => this.onDeviceDisconnected()
    );
    // document.addEventListener('deviceready', this.onDeviceReady, false);

  }
  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    // Subscribe to navigation events
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate' && event.url === '/home') {
        this.ble.disconnect(this.device.id).then(
          () => console.log('Disconnected '),
          () => console.log('ERROR disconnecting ')
        );
      }
    });
  }
  onConnected() {

    this.setStatus('');

    this.ble.startNotification(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_TX_CHARACTERISTIC_UUID).subscribe(
      (data: ArrayBuffer) => this.onTemperatureChange(data),
      () => this.presentreadAlert());


  }
  onTemperatureChange(buffer: ArrayBuffer) {
    switch (this.actionflag) {
      case 1:
        // Temperature is a 4 byte floating point value
        const data = new Uint8Array(buffer[0]);
        console.log('data:' + data);

        for (let i = 6; i > 0; i--) {
          this.deviceAddress.push((this.uint8ArrayToHexArray(data))[i]);
        }

        this.ngZone.run(() => {
          this.meterAddress = this.deviceAddress.join('').toString();
        });

        this.updatedRootaddress = this.injectDeviceAddress(rootstring, this.deviceAddress.reverse());
        this.globalData.setData('DeviceID', this.updatedRootaddress);
        console.log("updatedRootaddress:" + this.updatedRootaddress)

        this.calculateCS();

        this.resultStringArray = [];

        break;
      case 2:
        console.log('Handling Command 2');
        const data2 = new Uint8Array(buffer[0]);

        this.resultStringArray = this.uint8ArrayToHexArray(data2);

        console.log('resultStringArray:' + this.resultStringArray);
        this.ngZone.run(() => {
          this.ywd = this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 3], '33') +
            '-' + this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33') +
            '-' + this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 5], '33');
        });

        console.log('ywd:' + this.ywd);
        this.resultStringArray = [];

        // Additional logic for Command2
        break;
      case 3:
        console.log('Handling Command 3');
        const data3 = new Uint8Array(buffer[0]);
        console.log('data3:' + data3);
        this.resultStringArray = this.uint8ArrayToHexArray(data3);

        console.log('resultStringArray:' + this.resultStringArray);

        this.resultStringArray = [];
        // Additional logic for Command3
        break;
      case 4:
        console.log('Handling Command 3');
        // Additional logic for Command3
        break;
      case 5:
        console.log('Handling Command 3');
        // Additional logic for Command3
        break;
      case 6:
        console.log('Handling Command 3');
        // Additional logic for Command3
        break;
      case 7:
        console.log('Handling Command 3');
        // Additional logic for Command3
        break;
      case 8:
        console.log('Handling Command 3');
        // Additional logic for Command3
        break;
      case 9:
        console.log('Handling Command 3');
        // Additional logic for Command3
        break;
      default:
        console.log('Unknown command');
      // Handle unknown command
    }
  }
  calculateCS() {
    this.cs4datedata = this.sumHexValuesAndKeep8Bits((this.updatedRootaddress + date_string)).toUpperCase();
    this.datedata = this.updatedRootaddress + date_string + this.cs4datedata + '16';
  }
  subtractHexValue(hexValue1: string, hexValue2: string): string {

    const decimalValue1 = parseInt(hexValue1, 16);
    const decimalValue2 = parseInt(hexValue2, 16);

    return (decimalValue1 - decimalValue2).toString(16).toUpperCase();
  }
  async onDeviceDisconnected() {
    const toast = this.toastCtrl.create({
      message: '设备已断开',
      duration: 5000,
      position: 'middle'
    });
    (await toast).present();
  }
  writeCommand(command: string) {
    switch (command) {
      case '1':
        if (this.addressflag) {
          return;
        }
        console.log('Handling Command 1');
        this.ble.requestMtu(this.device.id, 247).then(() => {
          console.log('MTU Size Accepted');
          const readaddressBytes = this.hexStringToUint8Array(readaddressString);
          this.actionflag = 1;
          this.ble.writeWithoutResponse(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_RX_CHARACTERISTIC_UUID, readaddressBytes.buffer);
          this.addressflag = true;
        }, () => {
          console.log('MTU Size Failed');
          this.addressflag = false;
        });
        break;
      case '2':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 2');
        const navigationExtras2: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['energy'], navigationExtras2);

        // Additional logic for Command2
        break;
      case '3':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 3');
        const navigationExtras3: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['load'], navigationExtras3);
        // Additional logic for Command3
        break;
      case '4':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 4');
        const navigationExtras4: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['power'], navigationExtras4);
        // Additional logic for Command3
        break;
      case '5':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 5');
        const navigationExtras5: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['value'], navigationExtras5);
        // Additional logic for Command3
        break;
      case '6':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 6');
        const navigationExtras6: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['current'], navigationExtras6);
        // Additional logic for Command3
        break;
      case '7':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 7');
        const navigationExtras7: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['quadrants'], navigationExtras7);
        // Additional logic for Command3
        break;
      case '8':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 8');
        const navigationExtras8: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['needs'], navigationExtras8);
        // Additional logic for Command3
        break;
      case '9':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 9');
        const navigationExtras9: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['feerate'], navigationExtras9);
        // Additional logic for Command3
        break;
      case '10':
        if (!this.addressflag) {
          this.readaddressAlert();
          return;
        }
        console.log('Handling Command 10');
        const navigationExtras10: NavigationExtras = {
          state: {
            device: this.device
          }
        };
        this.router.navigate(['event'], navigationExtras10);
        break;
      default:
        console.log('Unknown command');
      // Handle unknown command
    }
  }
  uint8ArrayToHexArray(uint8Array) {
    const hexArray = [];
    for (let i = 0; i < uint8Array.length; i++) {
      hexArray.push(uint8Array[i].toString(16).padStart(2, '0'));
    }
    return hexArray;
  }

  hexStringToUint8Array(hexString) {
    // Make sure the input string is properly formatted for this process
    if (hexString.length % 2 !== 0) {
      throw new Error("Hexadecimal string must have an even length");
    }

    const byteArray = [];

    // Process each pair of characters
    for (let i = 0; i < hexString.length; i += 2) {
      const byteHex = hexString.substring(i, i + 2);
      const byteNumber = parseInt(byteHex, 16);
      if (isNaN(byteNumber)) {
        throw new Error(`Invalid hexadecimal number at position ${i}: ${byteHex}`);
      }
      byteArray.push(byteNumber);
    }

    // Convert the byte array to a Uint8Array
    return new Uint8Array(byteArray);
  }
  convertDecimalArrayToHexString(decimalArray: string[]): string {
    // Step 1: Concatenate the array elements to form a single string
    const concatenatedString = this.reverseString(decimalArray.join(''));
    // Step 2: Convert the concatenated string to a decimal integer
    const decimalNumber = parseInt(concatenatedString, 10);  // Parse as base 10

    // Step 3: Convert the decimal number to a hexadecimal string
    const hexString = decimalNumber.toString(16).toUpperCase();  // Convert to hex and uppercase

    return hexString;
  }
  stringToAsciiUint8Array(input: string): Uint8Array {
    // Create a Uint8Array with the same length as the input string
    const asciiArray = new Uint8Array(input.length);

    // Iterate over each character in the string
    for (let i = 0; i < input.length; i++) {
      // Convert each character to its ASCII value
      asciiArray[i] = input.charCodeAt(i);
    }

    // Return the populated Uint8Array
    return asciiArray;
  }
  convertUint8ArrayToString(data: Uint8Array): string {
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data[i]);
    }
    return result;
  }
  extractAndReverseBetween68s(inputString: string) {
    const regex = /68(.*?)68/;
    const match = inputString.match(regex);

    if (match && match[1]) {
      // If the content includes the starting '68', add '68' to the extracted string
      return this.reverseString(match[1]);
    }
    return null;  // Return null if no match is found
  }
  getDeviceAddress(inputString: string) {
    const regex = /68(.*?)68/;
    const match = inputString.match(regex);

    if (match && match[1]) {
      return match[1];
    }
    return null;  // Return null if no match is found
  }
  reverseString(inputString: string) {
    let result = '';
    // Handle odd length by checking if there's a single character at the end
    if (inputString.length % 2 !== 0) {
      result += inputString.charAt(inputString.length - 1); // Add the last character to result first
    }
    // Reverse in two-character chunks
    for (let i = 0; i < inputString.length - 1; i += 2) {
      result = inputString.substring(i, i + 2) + result;
    }
    return result;
  }
  convertStringToHexArray(inputString: string): string[] {
    if (inputString.length % 2 !== 0) {
      throw new Error('Input string must have an even number of characters');
    }

    const hexArray: string[] = [];
    for (let i = 0; i < inputString.length; i += 2) {
      const hexValue = inputString.substring(i, i + 2);
      // Check if the substring is a valid hexadecimal number
      if (!/^[0-9A-Fa-f]{2}$/.test(hexValue)) {
        throw new Error('Input string contains invalid hexadecimal numbers');
      }
      hexArray.push(hexValue.toUpperCase()); // Add the hex value to the array
    }

    return hexArray;
  }
  sumHexValuesAndKeep8Bits(hexString: string): string {
    // Split the hexString into an array of hex values
    const hexValues = hexString.match(/.{1,2}/g); // Regex to split string every two characters
    if (!hexValues) {
      throw new Error('Invalid hex string');
    }

    // Initialize sum
    let sum = 0;

    // Iterate over each hex value, convert it to an integer, and add to sum
    hexValues.forEach(hexValue => {
      const intValue = parseInt(hexValue, 16);
      if (isNaN(intValue)) {
        throw new Error(`Invalid hex value encountered: ${hexValue}`);
      }
      sum += intValue;
    });

    // Use bitwise AND to keep only the lower 8 bits of the sum
    const result = sum & 0xFF; // 0xFF is the hexadecimal mask for 255 (11111111 in binary)

    // Convert the result to a hexadecimal string and pad with leading zeros if necessary
    return result.toString(16).padStart(2, '0');
  }
  injectDeviceAddress(baseString: string, deviceAddress: string[]): string {
    // Directly replace "00" in the baseString with values from deviceAddress
    let currentIndex = 0;
    let updatedString = baseString.replace(/00/g, () => {
      const replacement = deviceAddress[currentIndex] ?? "00";
      currentIndex++;
      return replacement;
    });

    return updatedString;
  }
  // Disconnect peripheral when leaving the page

  ionViewWillLeave() {
    this.ble.stopNotification(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_RX_CHARACTERISTIC_UUID);
  }

  ionViewWillEnter() {

  }
  async readaddressAlert() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '温馨提示',
      subHeader: '',
      message: '请先读表号',
      buttons: ['OK']
    });

    await alert.present();

  }
  async presentreadAlert() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '温馨提示',
      subHeader: '',
      message: '数据传输错误',
      buttons: ['OK']
    });

    await alert.present();

  }

  setStatus(message: string) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  onDeviceReady() {
    console.log((navigator as any).notification);
  }

  alertDismissed() {
    console.log('it is OK');
  }
  dec(fl: number, d: number) {
    const p = Math.pow(10, d);
    return Math.round(fl * p) / p;
  }

  timeout(ms: number) { // pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  delay() {
    console.log('delay');
  }

}


