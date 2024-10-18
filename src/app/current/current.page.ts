import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';
import { BleService } from '../services/ble.service';
import { Subscription } from 'rxjs';
import { GlobalDataService } from '../services/global-data.service';
import { ChartService } from '../services/chart.service';
// import { read } from 'fs';

// Bluetooth UUIDs
const NORDIC_UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dc4179';
const NORDIC_UART_TX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dc4179';
const NORDIC_UART_RX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dc4179';

const currentA_string = "110433343535"

const currentB_string = "110433353535"

const currentC_string = "110433363535"

@Component({
  selector: 'app-current',
  templateUrl: './current.page.html',
  styleUrls: ['./current.page.scss'],
})
export class CurrentPage implements OnInit, OnDestroy {
  private dataSubscription: Subscription;
  data: any;

  lablesList: string[] = ['', '', '', '', '', '', '', ''];
  listdata_A: any[] = [];
  listdata_B: any[] = [];
  listdata_C: any[] = [];
  chartName: string = '电流曲线';
  // Define datasets for three lines
  datasets = [
    { key: 'A', data: this.listdata_A, backgroundColor: 'rgba(255, 255, 0, 0.2)', borderColor: 'rgba(255, 255, 0, 1)' },
    { key: 'B', data: this.listdata_B, backgroundColor: 'rgba(0, 255, 0, 0.2)', borderColor: 'rgba(0, 255, 0, 1)' },
    { key: 'C', data: this.listdata_C, backgroundColor: 'rgba(255, 0, 0, 0.2)', borderColor: 'rgba(255, 0, 0, 1)' }
  ];

  interval: any;
  time = new Date(null);
  device: any;
  peripheral: any = {};
  resultStringArray: any[] = [];
  i = 0;
  actionflag = 0;

  startDate: string;
  endDate: string;
  currentDate: string;


  updatedRootaddress: string;
  macAddress: string;
  meterAddress: string;
  addressflag = false;

  current_A: string;
  current_B: string;
  current_C: string;

  cs4ca: string;
  cs4cb: string;
  cs4cc: string;
  cs4curve: string;
  readca: string;
  readcb: string;
  readcc: string;
  tempcurve: string;

  requestMTUflag = false;

  statusMessage: string;

  deviceAddress: any[] = [];
  constructor(public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    private bleService: BleService,
    private chartService: ChartService,
    private globalData: GlobalDataService,
    private router: Router,
    private ble: BLE,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ngZone: NgZone) {

    const device = this.router.getCurrentNavigation().extras.state.device;
    this.device = device;

    this.bleService.setNotificationCallback((data: ArrayBuffer) => {
      this.onTemperatureChange(data);
    });
    this.bleService.startNotification(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_TX_CHARACTERISTIC_UUID);
  }
  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }
  ngOnInit(): void {

    this.updatedRootaddress = this.globalData.getData('DeviceID')
    console.log(this.updatedRootaddress);

    this.calculateCS();
    // this.chartService.single(this.chartName, this.lablesList, this.listdata, 'line-chart', 'line')

  }
  onTemperatureChange(buffer: ArrayBuffer) {

    console.log('Handle received data: ');
    const data = new Uint8Array(buffer[0]);

    this.resultStringArray = this.uint8ArrayToHexArray(data);

    console.log('resultStringArray:' + this.resultStringArray);
    if (this.resultStringArray[this.resultStringArray.length - 8] == '34' && this.resultStringArray[this.resultStringArray.length - 11] == '91') {
      if (this.resultStringArray[this.resultStringArray.length - 3] == '33' && this.resultStringArray[this.resultStringArray.length - 4] == '33' && this.resultStringArray[this.resultStringArray.length - 5] == '33') {
        this.ngZone.run(() => {
          this.current_A = '0.000';
        })
      }
      else {
        this.ngZone.run(() => {
          this.current_A = this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 3], '33') +
            this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33')[0] +
            '.' + this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33')[1] +
            this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 5], '33');
        });
      }
      console.log('ywd:' + this.current_A);
    }
    else if (this.resultStringArray[this.resultStringArray.length - 8] == '35' && this.resultStringArray[this.resultStringArray.length - 11] == '91') {
      if (this.resultStringArray[this.resultStringArray.length - 3] == '33' && this.resultStringArray[this.resultStringArray.length - 4] == '33' && this.resultStringArray[this.resultStringArray.length - 5] == '33') {
        this.ngZone.run(() => {
          this.current_B = '0.000';
        })
      }
      else {
        this.ngZone.run(() => {
          this.current_B = this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 3], '33') +
            this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33')[0] +
            '.' + this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33')[1] +
            this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 5], '33');
        });
      }
      console.log('ywd:' + this.current_B);
    }
    else if (this.resultStringArray[this.resultStringArray.length - 8] == '36' && this.resultStringArray[this.resultStringArray.length - 11] == '91') {
      if (this.resultStringArray[this.resultStringArray.length - 3] == '33' && this.resultStringArray[this.resultStringArray.length - 4] == '33' && this.resultStringArray[this.resultStringArray.length - 5] == '33') {
        this.ngZone.run(() => {
          this.current_C = '0.000';
        })
      }
      else {
        this.ngZone.run(() => {
          this.current_C = this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 3], '33') +
            this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33')[0] +
            '.' + this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33')[1] +
            this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 5], '33');
        });
      }
      console.log('ywd:' + this.current_C);
    }
    else if (this.resultStringArray[this.resultStringArray.length - 14] == '32' && this.resultStringArray[this.resultStringArray.length - 17] == '91') {

      const tempreading_A = this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 9], '33') +
        (this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 10], '33'))[0] +
        '.' + this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 10], '33')[1] +
        this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 11], '33');

      const decimalreading_A = parseFloat(tempreading_A);
      this.listdata_A.push(decimalreading_A);

      if (this.resultStringArray[this.resultStringArray.length - 8] != '32') {
        const tempreading_B = this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 6], '33') +
          (this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 7], '33'))[0] +
          '.' + this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 7], '33')[1] +
          this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 8], '33');

        const tempreading_C = this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 3], '33') +
          (this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33'))[0] +
          '.' + this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 4], '33')[1] +
          this.subtractHexValue(this.resultStringArray[this.resultStringArray.length - 5], '33');

        const decimalreading_B = parseFloat(tempreading_B);
        this.listdata_B.push(decimalreading_B);
        const decimalreading_C = parseFloat(tempreading_C);
        this.listdata_C.push(decimalreading_C);

        if (this.listdata_A.length == 8 && this.listdata_B.length == 8 && this.listdata_C.length == 8) {
          for (let i = 0; i < 3; i++) {
            console.log(this.datasets[i].data);
          }
          this.chartService.single(this.datasets, this.lablesList, 'line-chart', 'line');
          this.listdata_A = [];
          this.listdata_B = [];
          this.listdata_C = [];
        }
      }
      else if (this.listdata_A.length == 8) {

        this.chartService.single(this.datasets, this.lablesList, 'line-chart', 'line');
        this.listdata_A = [];
      }
    }

    this.resultStringArray = [];

  }
  calculateCS() {
    this.cs4ca = this.sumHexValuesAndKeep8Bits((this.updatedRootaddress + currentA_string)).toUpperCase();
    this.cs4cb = this.sumHexValuesAndKeep8Bits((this.updatedRootaddress + currentB_string)).toUpperCase();
    this.cs4cc = this.sumHexValuesAndKeep8Bits((this.updatedRootaddress + currentC_string)).toUpperCase();

    this.readca = this.updatedRootaddress + currentA_string + this.cs4ca + '16';
    this.readcb = this.updatedRootaddress + currentB_string + this.cs4cb + '16';
    this.readcc = this.updatedRootaddress + currentC_string + this.cs4cc + '16';

    const readcaBytes = this.hexStringToUint8Array(this.readca);
    const readcbBytes = this.hexStringToUint8Array(this.readcb);
    const readccBytes = this.hexStringToUint8Array(this.readcc);

    this.ble.writeWithoutResponse(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_RX_CHARACTERISTIC_UUID, readcaBytes.buffer);
    this.ble.writeWithoutResponse(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_RX_CHARACTERISTIC_UUID, readcbBytes.buffer);
    this.ble.writeWithoutResponse(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_RX_CHARACTERISTIC_UUID, readccBytes.buffer);
  }
  subtractHexValue(hexValue1: string, hexValue2: string): string {

    const decimalValue1 = parseInt(hexValue1, 16);
    const decimalValue2 = parseInt(hexValue2, 16);

    if ((decimalValue1 - decimalValue2) < 0) {

      return (decimalValue1 - decimalValue1).toString(16).toUpperCase();
    }

    return (decimalValue1 - decimalValue2).toString(16).toUpperCase();
  }
  addStringNumber(hexValue1: string, hexValue2: string): string {

    const decimalValue1 = parseInt(hexValue1, 16);
    const decimalValue2 = parseInt(hexValue2, 16);

    return (decimalValue1 + decimalValue2).toString(16).toUpperCase();
  }
  async onDeviceDisconnected(peripheral: any) {
    const toast = this.toastCtrl.create({
      message: '设备已断开',
      duration: 5000,
      position: 'middle'
    });
    (await toast).present();
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
  startdate() {
    const datetimeElement = document.getElementById('datetimea') as HTMLIonDatetimeElement;

    if (datetimeElement) {
      const fullDate = datetimeElement.value; // e.g., "2024-09-16T10:24:00+08:00"
      // Check if fullDate is a string
      if (typeof fullDate === 'string') {
        const datePart = fullDate.split('T')[0]; // Get "2024-09-16"

        const [year, month, day] = datePart.split('-'); // Split into ['2024', '09', '16']
        this.lablesList[0] = month + '/' + day;
        const shortYear = year.slice(-2); // Get last two digits of the year

        this.startDate = this.addStringNumber(day, '33') + this.addStringNumber(month, '33') + this.addStringNumber(shortYear, '33');
      } else {
        const datePart = new Date().toISOString().split('T')[0]; // Get only the date part (YYYY-MM-DD)

        const [year, month, day] = datePart.split('-'); // Split into ['2024', '09', '16']
        this.lablesList[0] = month + '/' + day;
        const shortYear = year.slice(-2); // Get last two digits of the year


        this.startDate = this.addStringNumber(day, '33') + this.addStringNumber(month, '33') + this.addStringNumber(shortYear, '33');
      }

      console.log("startdate:", this.startDate);
    }
  }
  enddate() {
    const datetimeElement = document.getElementById('datetimeb') as HTMLIonDatetimeElement;

    if (datetimeElement) {
      const fullDate = datetimeElement.value; // e.g., "2024-09-16T10:24:00+08:00"
      // Check if fullDate is a string
      if (typeof fullDate === 'string') {
        const datePart = fullDate.split('T')[0]; // Get "2024-09-16"

        const [year, month, day] = datePart.split('-'); // Split into ['2024', '09', '16']
        this.lablesList[this.lablesList.length - 1] = month + '/' + day;
        const shortYear = year.slice(-2); // Get last two digits of the year

        this.endDate = this.addStringNumber(day, '33') + this.addStringNumber(month, '33') + this.addStringNumber(shortYear, '33');
      } else {
        const datePart = new Date().toISOString().split('T')[0]; // Get only the date part (YYYY-MM-DD)

        const [year, month, day] = datePart.split('-'); // Split into ['2024', '09', '16']
        this.lablesList[this.lablesList.length - 1] = month + '/' + day;
        const shortYear = year.slice(-2); // Get last two digits of the year


        this.endDate = this.addStringNumber(day, '33') + this.addStringNumber(month, '33') + this.addStringNumber(shortYear, '33');
      }

      console.log("enddate:", this.endDate);
    }
  }
  showcurve() {
    this.startdate();
    this.enddate();

    if (this.startDate == this.endDate) {

      for (let i = 0; i < 8; i++) {

        this.cs4curve = this.sumHexValuesAndKeep8Bits((this.updatedRootaddress + '110A333235353433' + (33 + i * 3).toString() + this.startDate)).toUpperCase();
        console.log(this.updatedRootaddress + '110A333235353433' + (33 + i * 3).toString() + this.startDate + this.cs4curve + '16')
        this.ble.writeWithoutResponse(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_RX_CHARACTERISTIC_UUID, this.hexStringToUint8Array(this.updatedRootaddress + '110A333235353433' + (33 + i * 3).toString() + this.startDate + this.cs4curve + '16').buffer);
        this.timeout(50);
      }
    }
    else {
      for (let i = 0; i < 4; i++) {

        this.cs4curve = this.sumHexValuesAndKeep8Bits((this.updatedRootaddress + '110A333235353433' + (33 + i * 6).toString() + this.startDate)).toUpperCase();
        console.log(this.updatedRootaddress + '110A333235353433' + (33 + i * 6).toString() + this.startDate + this.cs4curve + '16')
        this.ble.writeWithoutResponse(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_RX_CHARACTERISTIC_UUID, this.hexStringToUint8Array(this.updatedRootaddress + '110A333235353433' + (33 + i * 6).toString() + this.startDate + this.cs4curve + '16').buffer);
        this.timeout(20);
      }
      for (let i = 0; i < 4; i++) {

        this.cs4curve = this.sumHexValuesAndKeep8Bits((this.updatedRootaddress + '110A333235353433' + (33 + i * 6).toString() + this.endDate)).toUpperCase();
        console.log(this.updatedRootaddress + '110A333235353433' + (33 + i * 6).toString() + this.endDate + this.cs4curve + '16')
        this.ble.writeWithoutResponse(this.device.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_RX_CHARACTERISTIC_UUID, this.hexStringToUint8Array(this.updatedRootaddress + '110A333235353433' + (33 + i * 6).toString() + this.endDate + this.cs4curve + '16').buffer);
        this.timeout(20);
      }

    }
  }
  resetdate() {
    this.listdata_A = [];
    this.listdata_B = [];
    this.listdata_C = [];
    this.chartService.destroy();
  }
  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    this.bleService.stopNotification(this.peripheral.id, NORDIC_UART_SERVICE_UUID, NORDIC_UART_TX_CHARACTERISTIC_UUID);
  }
  ionViewWillEnter() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
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

