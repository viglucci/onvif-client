import { xml, format } from '../xml';
import EnevelopeSecurity from './EnvelopeSecurity';

export default class Envelope {

    private security: EnevelopeSecurity | null;

    constructor() {
        this.security = null;
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
            </s:Envelope>
        `);
    }
}
