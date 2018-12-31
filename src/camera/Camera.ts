import * as request from 'request-promise';
import * as SOAP from '../soap';
import ISecurityCredentials from '../security/ICredentials';
import { IConstructorOptions } from './IConstructorOptions';
import SOAPClient from '../http/SOAPClient';

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