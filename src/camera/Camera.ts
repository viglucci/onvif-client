import * as SOAP from '../soap';
import { generateSecurityDigest } from '../security/Digest';

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

    }

    async getSystemDateAndTime(): Promise<any> {
        const envelope = new SOAP.Envelope();
        if (this.securityCredentials) {
            const securityDigest = generateSecurityDigest(
                this.securityCredentials.username,
                this.securityCredentials.password
            );
            const evelopeSecutiry = new SOAP.EnvelopeSecurity(securityDigest);
            envelope.setSecurityCredentials(evelopeSecutiry);
        }
        console.log(envelope.serialize());
    }

    async setSystemDateAndTime(): Promise<any> {

    }

    async setSystemFactoryDefault(): Promise<any> {

    }
}