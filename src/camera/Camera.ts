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
        return await this.client.request(envelope);
    }

    async getSystemDateAndTime(): Promise<any> {
        const envelope = new SOAP.Envelope();
        envelope.setBody(new SOAP.GetSystemDateAndTimeBody());
        return await this.client.request(envelope);
    }

    async setSystemDateAndTime(): Promise<any> {

    }

    async setSystemFactoryDefault(): Promise<any> {

    }
}