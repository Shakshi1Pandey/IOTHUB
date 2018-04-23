import { Email } from './email';
import { Sms } from './sms';
import NOTIFICATION from './notification';

export class AlertUtility {
  static tempAlert({ data, tlv }) {
    let altval;
    let altopt = { email: false, sms: false, notification: true };
    if (data.temp > tlv.max) {
      altval = { position: tlv.max, value: data.temp, type:'max' };
      console.log(altval,'altval');
      this.al({ altval, altopt });
    } else if (data.temp < tlv.min) {
      altval = { position: tlv.min, value: data.temp, type:'min' };
      this.al({ altval, altopt });
    } else {
      altval = { position: tlv.avg, value: data.temp, type:'avg' };
      this.al({ altval, altopt });
    }
  }

  static al({ altval, altopt }) {
    console.log(altval,'finaldata');
    let udid = '123445123445';
    //let i = 0;
    var testdata = { udid: udid, data: altval.value++ };
    var emailData = {
      to:'karthikeyan.a@live.com',
      subject: 'original string',
      text: JSON.stringify(altval)
    }
    var smsData = {
      recipient : '919551544692',
      text : JSON.stringify(altval)
    }
    if (
      altopt.email === true &&
      altopt.sms === true &&
      altopt.notification === true
    ) {
      Email.send(emailData);
      NOTIFICATION;
      Sms.send(smsData);
    } else if (
      altopt.email === true &&
      altopt.sms === true &&
      altopt.notification === false
    ) {
      Email.send(emailData);
      Sms.send(smsData);
    } else if (
      altopt.email === true &&
      altopt.sms === false &&
      altopt.notification === false
    ) {
      Email.send(emailData);
    } else if (
      altopt.email === false &&
      altopt.sms === true &&
      altopt.notification === true
    ) {
      NOTIFICATION(null, testdata);
      Sms.send(data);
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
      Email.send(data);
      NOTIFICATION;
    } else if (
      altopt.email === false &&
      altopt.sms === true &&
      altopt.notification === false
    ) {
      Sms.send(data);
    }
  }
}
