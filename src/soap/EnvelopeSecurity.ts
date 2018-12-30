import { xml, format } from '../xml';
import { SecurityDigest } from '../security/Digest';

export default class EnevelopeSecurity {

    private digest: SecurityDigest;

    constructor(digest: SecurityDigest) {
        this.digest = digest;
    }

    serialize(): string {
        return xml`
            <Security s:mustUnderstand="1" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
                <UsernameToken>
                    <Username>${this.digest.username}</Username>
                    <Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">${this.digest.passwordDigest}</Password>
                    <Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">${this.digest.nonce}</Nonce>
                    <Created xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">${this.digest.timestamp}</Created>
                </UsernameToken>
            </Security>
        `;
    }
}