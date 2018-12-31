import ISecurityCredentials from '../security/ICredentials';

export interface IConstructorOptions {
    hostname: string;
    port?: Number;
    path?: string;
    securityCredentials?: ISecurityCredentials
}