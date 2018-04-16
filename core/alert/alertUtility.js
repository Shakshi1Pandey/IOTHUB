import EMAIL from './email';
import SMS from './sms';
import NOTIFICATION from './notification';

export class AlertUtility {
  static tempAlert({ data, tlv, alertOpts }) {
    let alertValue;
    if (data.temp > tlv.max) {
      alertValue = { position: max, value: data.temp };
    } else if (data.temp < tlv.min) {
      alertValue = { position: avg, value: data.temp };
    } else {
      alertValue = { position: min, value: data.temp };
    }
    return alertValue;
  }

  static alertOpts(data) {
    if (email === true && sms === true && notification === true) {
      EMAIL;
      NOTIFICATION;
      SMS;
    } else if (email === true && sms === true && notification === false) {
      EMAIL;
      SMS;
    } else if (email === true && sms === false && notification === false) {
      EMAIL;
    } else if (email === false && sms === true && notification === true) {
      NOTIFICATION;
      SMS;
    } else if (email === false && sms === false && notification === true) {
      NOTIFICATION;
    } else if (email === true && sms === false && notification === true) {
      EMAIL;
      NOTIFICATION;
    } else if (email === false && sms === true && notification === false) {
      SMS;
    }
  }
}
