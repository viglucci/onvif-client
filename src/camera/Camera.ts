import * as request from 'request-promise';
import * as SOAP from '../soap';
import { composeSecurityDigest } from '../security/Digest';

interface SecurityCredentials {
    username: string;
    password: string;
}

namespace Camera {

    export interface ConstructorOptions {
        hostname: string;
        port?: Number;
        path?: string;
        securityCredentials?: SecurityCredentials
    }
}

export class Camera {

    hostname: string;

    port: Number;

    path: string;

    securityCredentials: SecurityCredentials | null;

    constructor(options: Camera.ConstructorOptions) {
        this.hostname = options.hostname;
        this.port = options.port || 80;
        this.path = options.path || '/onvif/device_service';
        this.securityCredentials = options.securityCredentials || null;
    }

    async getDeviceInformation(): Promise<any> {
        const envelope = new SOAP.Envelope();
        if (this.securityCredentials) {
            this.decorateEnvelopeWithSecurity(this.securityCredentials, envelope);
        }
        envelope.setBody(new SOAP.GetDeviceInformationBody());
        const body = envelope.serialize();
        const response = await request(this.composeRequestOptions(body));
        console.log(response);
    }

    async getSystemDateAndTime(): Promise<any> {

    }

    async setSystemDateAndTime(): Promise<any> {

    }

    async setSystemFactoryDefault(): Promise<any> {

    }

    decorateEnvelopeWithSecurity(
        credentials: SecurityCredentials,
        envelope: SOAP.Envelope) {
        const securityDigest = composeSecurityDigest(
            credentials.username,
            credentials.password
        );
        const evelopeSecutiry = new SOAP.EnvelopeSecurity(securityDigest);
        envelope.setSecurityCredentials(evelopeSecutiry);
    }

    composeRequestOptions(body: string): any {
        return {
            uri: `http://${this.hostname}/${this.path}`,
            port: this.port,
            method: 'POST',
            headers: {
                'Content-Type': 'application/soap+xml',
                'Content-Length': Buffer.byteLength(body, 'utf8'),
                charset: 'utf-8'
            },
            body
        };
    }
}