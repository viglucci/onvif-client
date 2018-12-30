import { xml, format } from '../xml';
import EnevelopeSecurity from './EnvelopeSecurity';
import { IEnvelopeBody } from './IEnvelopeBody';

export default class Envelope {

    private security: EnevelopeSecurity | null;
    private body: IEnvelopeBody | null;

    constructor() {
        this.security = null;
        this.body = null;
    }

    setSecurityCredentials(security: EnevelopeSecurity) {
        this.security = security;
    }

    serialize(): string {
        return format(xml`
            <s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing">
                <s:Header>
                    ${this.security ? this.security.serialize() : null}
                </s:Header>
                <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
                    ${this.body ? this.body.serialize() : null}
                </s:Body>
            </s:Envelope>
        `);
    }

    setBody(envelopeBody: IEnvelopeBody) {
        this.body = envelopeBody;
    }
}
