"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8430],{8430:(O,y,d)=>{d.r(y),d.d(y,{QuadrantsPageModule:()=>Z});var x=d(9808),C=d(4182),u=d(5056),p=d(2292),A=d(655),e=d(2096),U=d(1414),D=d(3293),w=d(4811),R=d(7011);const h="6e400001-b5a3-f393-e0a9-e50e24dc4179",b="6e400003-b5a3-f393-e0a9-e50e24dc4179",c="6e400002-b5a3-f393-e0a9-e50e24dc4179",v="110433333833",S="110433333933",m="110433333A33",f="110433333B33",T=[{path:"",component:(()=>{class a{constructor(t,s,r,i,n,o,l,B,V,P){this.navCtrl=t,this.activatedRoute=s,this.bleService=r,this.chartService=i,this.globalData=n,this.router=o,this.ble=l,this.alertCtrl=B,this.toastCtrl=V,this.ngZone=P,this.lablesList=["","","","","","","",""],this.listdata_A=[],this.listdata_B=[],this.listdata_C=[],this.chartName="\u7535\u538b\u66f2\u7ebf",this.datasets=[{key:"A",data:this.listdata_A,backgroundColor:"rgba(255, 255, 0, 0.2)",borderColor:"rgba(255, 255, 0, 1)"},{key:"B",data:this.listdata_B,backgroundColor:"rgba(0, 255, 0, 0.2)",borderColor:"rgba(0, 255, 0, 1)"},{key:"C",data:this.listdata_C,backgroundColor:"rgba(255, 0, 0, 0.2)",borderColor:"rgba(255, 0, 0, 1)"}],this.time=new Date(null),this.peripheral={},this.resultStringArray=[],this.i=0,this.actionflag=0,this.addressflag=!1,this.requestMTUflag=!1,this.deviceAddress=[];const I=this.router.getCurrentNavigation().extras.state.device;this.device=I,this.bleService.setNotificationCallback(N=>{this.onTemperatureChange(N)}),this.bleService.startNotification(this.device.id,h,b)}ngOnDestroy(){console.log("Method not implemented.")}ngOnInit(){this.updatedRootaddress=this.globalData.getData("DeviceID"),console.log(this.updatedRootaddress),this.calculateCS()}onTemperatureChange(t){console.log("Handle received data: ");const s=new Uint8Array(t[0]);this.resultStringArray=this.uint8ArrayToHexArray(s),console.log("resultStringArray:"+this.resultStringArray),"33"==this.resultStringArray[10]&&"33"==this.resultStringArray[11]&&"38"==this.resultStringArray[12]&&"33"==this.resultStringArray[13]&&"91"==this.resultStringArray[8]?(this.ngZone.run(()=>{this.quard0_value=this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-3],"33")+this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-4],"33")+ +this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-5],"33")+"."+this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-6],"33")}),console.log("ywd:"+this.quard0_value)):"33"==this.resultStringArray[10]&&"33"==this.resultStringArray[11]&&"39"==this.resultStringArray[12]&&"33"==this.resultStringArray[13]&&"91"==this.resultStringArray[8]?(this.ngZone.run(()=>{this.quard1_value=this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-3],"33")+this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-4],"33")+ +this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-5],"33")+"."+this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-6],"33")}),console.log("ywd:"+this.quard1_value)):"33"==this.resultStringArray[10]&&"33"==this.resultStringArray[11]&&"3a"==this.resultStringArray[12]&&"33"==this.resultStringArray[13]&&"91"==this.resultStringArray[8]?(this.ngZone.run(()=>{this.quard2_value=this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-3],"33")+this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-4],"33")+ +this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-5],"33")+"."+this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-6],"33")}),console.log("ywd:"+this.quard2_value)):"33"==this.resultStringArray[10]&&"33"==this.resultStringArray[11]&&"3b"==this.resultStringArray[12]&&"33"==this.resultStringArray[13]&&"91"==this.resultStringArray[8]&&(this.ngZone.run(()=>{this.quard3_value=this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-3],"33")+this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-4],"33")+ +this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-5],"33")+"."+this.subtractHexValue(this.resultStringArray[this.resultStringArray.length-6],"33")}),console.log("ywd:"+this.quard3_value)),this.resultStringArray=[]}calculateCS(){this.cs4va=this.sumHexValuesAndKeep8Bits(this.updatedRootaddress+v).toUpperCase(),this.cs4vb=this.sumHexValuesAndKeep8Bits(this.updatedRootaddress+S).toUpperCase(),this.cs4vc=this.sumHexValuesAndKeep8Bits(this.updatedRootaddress+m).toUpperCase(),this.cs4vd=this.sumHexValuesAndKeep8Bits(this.updatedRootaddress+f).toUpperCase(),this.readva=this.updatedRootaddress+v+this.cs4va+"16",this.readvb=this.updatedRootaddress+S+this.cs4vb+"16",this.readvc=this.updatedRootaddress+m+this.cs4vc+"16",this.readvd=this.updatedRootaddress+f+this.cs4vd+"16";const t=this.hexStringToUint8Array(this.readva),s=this.hexStringToUint8Array(this.readvb),r=this.hexStringToUint8Array(this.readvc),i=this.hexStringToUint8Array(this.readvd);this.ble.writeWithoutResponse(this.device.id,h,c,t.buffer),this.ble.writeWithoutResponse(this.device.id,h,c,s.buffer),this.ble.writeWithoutResponse(this.device.id,h,c,r.buffer),this.ble.writeWithoutResponse(this.device.id,h,c,i.buffer)}subtractHexValue(t,s){const r=parseInt(t,16),i=parseInt(s,16);return r-i<0?(r-r).toString(16).toUpperCase():(r-i).toString(16).toUpperCase()}addStringNumber(t,s){return(parseInt(t,16)+parseInt(s,16)).toString(16).toUpperCase()}onDeviceDisconnected(t){return(0,A.mG)(this,void 0,void 0,function*(){(yield this.toastCtrl.create({message:"\u8bbe\u5907\u5df2\u65ad\u5f00",duration:5e3,position:"middle"})).present()})}uint8ArrayToHexArray(t){const s=[];for(let r=0;r<t.length;r++)s.push(t[r].toString(16).padStart(2,"0"));return s}hexStringToUint8Array(t){if(t.length%2!=0)throw new Error("Hexadecimal string must have an even length");const s=[];for(let r=0;r<t.length;r+=2){const i=t.substring(r,r+2),n=parseInt(i,16);if(isNaN(n))throw new Error(`Invalid hexadecimal number at position ${r}: ${i}`);s.push(n)}return new Uint8Array(s)}convertDecimalArrayToHexString(t){const s=this.reverseString(t.join(""));return parseInt(s,10).toString(16).toUpperCase()}stringToAsciiUint8Array(t){const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s}convertUint8ArrayToString(t){let s="";for(let r=0;r<t.length;r++)s+=String.fromCharCode(t[r]);return s}extractAndReverseBetween68s(t){const r=t.match(/68(.*?)68/);return r&&r[1]?this.reverseString(r[1]):null}reverseString(t){let s="";t.length%2!=0&&(s+=t.charAt(t.length-1));for(let r=0;r<t.length-1;r+=2)s=t.substring(r,r+2)+s;return s}convertStringToHexArray(t){if(t.length%2!=0)throw new Error("Input string must have an even number of characters");const s=[];for(let r=0;r<t.length;r+=2){const i=t.substring(r,r+2);if(!/^[0-9A-Fa-f]{2}$/.test(i))throw new Error("Input string contains invalid hexadecimal numbers");s.push(i.toUpperCase())}return s}sumHexValuesAndKeep8Bits(t){const s=t.match(/.{1,2}/g);if(!s)throw new Error("Invalid hex string");let r=0;return s.forEach(n=>{const o=parseInt(n,16);if(isNaN(o))throw new Error(`Invalid hex value encountered: ${n}`);r+=o}),(255&r).toString(16).padStart(2,"0")}startdate(){const t=document.getElementById("datetimea");if(t){const s=t.value;if("string"==typeof s){const r=s.split("T")[0],[i,n,o]=r.split("-");this.lablesList[0]=n+"/"+o;const l=i.slice(-2);this.startDate=this.addStringNumber(o,"33")+this.addStringNumber(n,"33")+this.addStringNumber(l,"33")}else{const r=(new Date).toISOString().split("T")[0],[i,n,o]=r.split("-");this.lablesList[0]=n+"/"+o;const l=i.slice(-2);this.startDate=this.addStringNumber(o,"33")+this.addStringNumber(n,"33")+this.addStringNumber(l,"33")}console.log("startdate:",this.startDate)}}enddate(){const t=document.getElementById("datetimeb");if(t){const s=t.value;if("string"==typeof s){const r=s.split("T")[0],[i,n,o]=r.split("-");this.lablesList[this.lablesList.length-1]=n+"/"+o;const l=i.slice(-2);this.endDate=this.addStringNumber(o,"33")+this.addStringNumber(n,"33")+this.addStringNumber(l,"33")}else{const r=(new Date).toISOString().split("T")[0];this.lablesList[this.lablesList.length-1]=r;const[i,n,o]=r.split("-");this.lablesList[this.lablesList.length-1]=n+"/"+o;const l=i.slice(-2);this.endDate=this.addStringNumber(o,"33")+this.addStringNumber(n,"33")+this.addStringNumber(l,"33")}console.log("enddate:",this.endDate)}}showcurve(){if(this.startdate(),this.enddate(),this.startDate==this.endDate)for(let t=0;t<8;t++)this.cs4curve=this.sumHexValuesAndKeep8Bits(this.updatedRootaddress+"110A333234353433"+(33+3*t).toString()+this.startDate).toUpperCase(),console.log(this.updatedRootaddress+"110A333234353433"+(33+3*t).toString()+this.startDate+this.cs4curve+"16"),this.ble.writeWithoutResponse(this.device.id,h,c,this.hexStringToUint8Array(this.updatedRootaddress+"110A333234353433"+(33+3*t).toString()+this.startDate+this.cs4curve+"16").buffer),this.timeout(50);else{for(let t=0;t<4;t++)this.cs4curve=this.sumHexValuesAndKeep8Bits(this.updatedRootaddress+"110A333234353433"+(33+6*t).toString()+this.startDate).toUpperCase(),console.log(this.updatedRootaddress+"110A333234353433"+(33+6*t).toString()+this.startDate+this.cs4curve+"16"),this.ble.writeWithoutResponse(this.device.id,h,c,this.hexStringToUint8Array(this.updatedRootaddress+"110A333234353433"+(33+6*t).toString()+this.startDate+this.cs4curve+"16").buffer),this.timeout(20);for(let t=0;t<4;t++)this.cs4curve=this.sumHexValuesAndKeep8Bits(this.updatedRootaddress+"110A333234353433"+(33+6*t).toString()+this.endDate).toUpperCase(),console.log(this.updatedRootaddress+"110A333234353433"+(33+6*t).toString()+this.endDate+this.cs4curve+"16"),this.ble.writeWithoutResponse(this.device.id,h,c,this.hexStringToUint8Array(this.updatedRootaddress+"110A333234353433"+(33+6*t).toString()+this.endDate+this.cs4curve+"16").buffer),this.timeout(20)}}resetdate(){this.listdata_A=[],this.listdata_B=[],this.listdata_C=[],this.chartService.destroy()}ionViewWillLeave(){this.bleService.stopNotification(this.peripheral.id,h,b)}ionViewWillEnter(){this.dataSubscription&&this.dataSubscription.unsubscribe()}readaddressAlert(){return(0,A.mG)(this,void 0,void 0,function*(){yield(yield this.alertCtrl.create({cssClass:"my-custom-class",header:"\u6e29\u99a8\u63d0\u793a",subHeader:"",message:"\u8bf7\u5148\u8bfb\u8868\u53f7",buttons:["OK"]})).present()})}presentreadAlert(){return(0,A.mG)(this,void 0,void 0,function*(){yield(yield this.alertCtrl.create({cssClass:"my-custom-class",header:"\u6e29\u99a8\u63d0\u793a",subHeader:"",message:"\u6570\u636e\u4f20\u8f93\u9519\u8bef",buttons:["OK"]})).present()})}setStatus(t){console.log(t),this.ngZone.run(()=>{this.statusMessage=t})}onDeviceReady(){console.log(navigator.notification)}alertDismissed(){console.log("it is OK")}dec(t,s){const r=Math.pow(10,s);return Math.round(t*r)/r}timeout(t){return new Promise(s=>setTimeout(s,t))}delay(){console.log("delay")}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(u.SH),e.Y36(p.gz),e.Y36(U.x),e.Y36(D.C),e.Y36(w.v),e.Y36(p.F0),e.Y36(R.I),e.Y36(u.Br),e.Y36(u.yF),e.Y36(e.R0b))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-quadrants"]],decls:35,vars:4,consts:[[1,"fixed-content"],[1,"coverhead"],[1,"tophead"],[1,"headtxt"],[1,"cardcontent"],[1,"card1"],[1,"card2"],[1,"card3"],[1,"card4"]],template:function(t,s){1&t&&(e.TgZ(0,"ion-content")(1,"div",0),e._UZ(2,"div",1)(3,"div",2),e.TgZ(4,"div",3),e._uU(5,"\u84dd\u7259\u7535\u8868"),e.qZA(),e.TgZ(6,"div",4)(7,"ion-card",5)(8,"ion-card-header"),e._UZ(9,"ion-card-title"),e.TgZ(10,"ion-card-subtitle"),e._uU(11,"\u7b2c\u4e00\u8c61\u9650\u65e0\u529f\u603b\u7535\u80fd"),e.qZA()(),e.TgZ(12,"ion-card-content"),e._uU(13),e.qZA()(),e.TgZ(14,"ion-card",6)(15,"ion-card-header"),e._UZ(16,"ion-card-title"),e.TgZ(17,"ion-card-subtitle"),e._uU(18,"\u7b2c\u4e8c\u8c61\u9650\u65e0\u529f\u603b\u7535\u80fd"),e.qZA()(),e.TgZ(19,"ion-card-content"),e._uU(20),e.qZA()(),e.TgZ(21,"ion-card",7)(22,"ion-card-header"),e._UZ(23,"ion-card-title"),e.TgZ(24,"ion-card-subtitle"),e._uU(25,"\u7b2c\u4e09\u8c61\u9650\u65e0\u529f\u603b\u7535\u80fd"),e.qZA()(),e.TgZ(26,"ion-card-content"),e._uU(27),e.qZA()(),e.TgZ(28,"ion-card",8)(29,"ion-card-header"),e._UZ(30,"ion-card-title"),e.TgZ(31,"ion-card-subtitle"),e._uU(32,"\u7b2c\u56db\u8c61\u9650\u65e0\u529f\u603b\u7535\u80fd"),e.qZA()(),e.TgZ(33,"ion-card-content"),e._uU(34),e.qZA()()()()()),2&t&&(e.xp6(13),e.Oqu(s.quard0_value),e.xp6(7),e.Oqu(s.quard1_value),e.xp6(7),e.Oqu(s.quard2_value),e.xp6(7),e.Oqu(s.quard3_value))},dependencies:[u.PM,u.FN,u.Zi,u.tO,u.Dq,u.W2],styles:[".fixed-content[_ngcontent-%COMP%]{position:fixed;top:0;width:100%}ion-content[_ngcontent-%COMP%]{opacity:1;--overflow: hidden;--background: rgba(244, 248, 251, 1)}.headtxt[_ngcontent-%COMP%]{display:flex;position:absolute;z-index:3;top:30px;justify-content:center;width:100%;font-size:20px;font-weight:500;letter-spacing:0px;line-height:23.44px;color:#06211a}.tophead[_ngcontent-%COMP%]{left:0;top:0;width:100%;height:476px;position:absolute;z-index:2;opacity:.6;background:linear-gradient(166.95deg,rgb(148,191,255) 0%,rgb(227,230,250) 46.69%,rgb(244,248,251) 100%)}.coverhead[_ngcontent-%COMP%]{display:flex;position:relative;z-index:1;left:0;right:0;top:0;width:100%;height:467px;opacity:1;background:url(/assets/img/bg.png) no-repeat center center;background-size:cover}.cardcontent[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;overflow-y:auto;display:flex;justify-content:center;align-items:center;z-index:4}.card1[_ngcontent-%COMP%]{background:url(/assets/img/quard.png) no-repeat center center;background-size:cover;box-shadow:none;position:absolute;z-index:4;top:108px;width:335px;height:99px;opacity:1;border-radius:10px}.card2[_ngcontent-%COMP%]{background:url(/assets/img/quard.png) no-repeat center center;background-size:cover;box-shadow:none;position:absolute;z-index:4;top:223px;width:335px;height:99px;opacity:1;border-radius:10px}.card3[_ngcontent-%COMP%]{background:url(/assets/img/quard.png) no-repeat center center;background-size:cover;box-shadow:none;position:absolute;z-index:4;top:338px;width:335px;height:99px;opacity:1;border-radius:10px}.card4[_ngcontent-%COMP%]{background:url(/assets/img/quard.png) no-repeat center center;background-size:cover;box-shadow:none;position:absolute;z-index:4;top:453px;width:335px;height:99px;opacity:1;border-radius:10px}ion-card-subtitle[_ngcontent-%COMP%]{font-weight:500}ion-card-content[_ngcontent-%COMP%]{padding-left:72px;font-size:25px;font-weight:500}"]}),a})()}];let H=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[p.Bz.forChild(T),p.Bz]}),a})(),Z=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[x.ez,C.u5,u.Pc,H]}),a})()}}]);