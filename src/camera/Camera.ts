import SOAPClient from '../http/SOAPClient';
import * as SOAP from '../soap';
import ResponseParser from '../soap/ResponseParser';
import { IConstructorOptions } from './IConstructorOptions';

export class Camera {

  client: SOAPClient;

  constructor(options: IConstructorOptions) {
    this.client = new SOAPClient(options);
  }

  async getDeviceInformation(): Promise<any> {
    const envelope = new SOAP.Envelope();
    envelope.setBody(new SOAP.GetDeviceInformationBody());
    const response = await this.client.request(envelope);
    const data = await ResponseParser.parse(response);
    return data.getDeviceInformationResponse;
  }

  async getSystemDateAndTime(): Promise<any> {
    const envelope = new SOAP.Envelope();
    envelope.setBody(new SOAP.GetSystemDateAndTimeBody());
    const response = await this.client.request(envelope);
    const data = await ResponseParser.parse(response);
    return data.getSystemDateAndTimeResponse;
  }
}
