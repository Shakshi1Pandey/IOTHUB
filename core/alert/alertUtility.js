import EMAIL from './email';
import SMS from './sms';
import NOTIFICATION from './notification';

export class AlertUtility {
  static tempAlert({ data, tlv }) {
    let altval;
    let altopt = { email: false, sms: false, notification: true };
    if (data.temp > tlv.max) {
      altval = { position: data.max, value: data.temp };
      this.al({altval, altopt});
    } else if (data.temp < tlv.min) {
      altval = { position: data.avg, value: data.temp };
      this.al({altval, altopt});
    } else {
      altval = { position: data.min, value: data.temp };
      this.al({altval, altopt});
    }
  }

  static al({ data, altopt }) {
    let udid = '123445123445';
    var testdata = {udid:udid, data:'sample'}
    if (
      altopt.email === true &&
      altopt.sms === true &&
      altopt.notification === true
    ) {
      EMAIL.send(data);
      NOTIFICATION;
      SMS.send(data);
    } else if (
      altopt.email === true &&
      altopt.sms === true &&
      altopt.notification === false
    ) {
      EMAIL.send(data);
      SMS.send(data);
    } else if (
      altopt.email === true &&
      altopt.sms === false &&
      altopt.notification === false
    ) {
      EMAIL.send(data);
    } else if (
      altopt.email === false &&
      altopt.sms === true &&
      altopt.notification === true
    ) {
      NOTIFICATION(null,testdata);
      SMS.send(data);
    } else if (
      altopt.email === false &&
      altopt.sms === false &&
      altopt.notification === true
    ) {
      NOTIFICATION(null, testdata);
    } else if (
      altopt.email === true &&
      altopt.sms === false &&
      altopt.notification === true
    ) {
      EMAIL.send(data);
      NOTIFICATION;
    } else if (
      altopt.email === false &&
      altopt.sms === true &&
      altopt.notification === false
    ) {
      SMS.send(data);
    }
  }
}
