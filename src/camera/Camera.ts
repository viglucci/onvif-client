import SOAPClient from '../http/SOAPClient';
import * as SOAP from '../soap';
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
        console.log(response);
    }

    async getSystemDateAndTime(): Promise<any> {

    }

    async setSystemDateAndTime(): Promise<any> {

    }

    async setSystemFactoryDefault(): Promise<any> {

    }
}