import * as request from 'request-promise';
import { composeSecurityDigest } from '../security/Digest';
import ISecurityCredentials from '../security/ICredentials';
import * as SOAP from '../soap';

export interface IConstructorOptions {
    hostname: string;
    port?: Number;
    path?: string;
    securityCredentials?: ISecurityCredentials
}

class SOAPClient {

    hostname: string;
    port: Number;
    path: string;
    securityCredentials?: ISecurityCredentials;

    constructor(options: IConstructorOptions) {
        this.hostname = options.hostname;
        this.port = options.port || 80;
        this.path = options.path || '/onvif/device_service';
        this.securityCredentials = options.securityCredentials;
    }

    decorateEnvelopeWithSecurity(
        envelope: SOAP.Envelope) {
        if (this.securityCredentials != undefined) {
            const securityDigest = composeSecurityDigest(
                this.securityCredentials.username,
                this.securityCredentials.password
            );
            const envelopeSecurity = new SOAP.EnvelopeSecurity(securityDigest);
            envelope.setSecurityCredentials(envelopeSecurity);
        }
    }

    composeRequestOptions(requestBody: string): any {
      const uri = `http://${this.hostname}/${this.path}`.replace(/([^:])(\/\/+)/g, '$1/');
      return {
          uri,
          port: this.port,
          method: 'POST',
          headers: {
              'Content-Type': 'application/soap+xml',
              'Content-Length': Buffer.byteLength(requestBody, 'utf8'),
              charset: 'utf-8'
          },
          body: requestBody
      };
    }

    async request(envelope: SOAP.Envelope): Promise<any> {
        this.decorateEnvelopeWithSecurity(envelope);
        const requestBody = envelope.serialize();
        const requestOptions = this.composeRequestOptions(requestBody);
        return request(requestOptions);
    }
}

export default SOAPClient;
