import { xml } from '../xml';

export default class GetDeviceInformationBody {
    serialize(): string {
        return xml`<GetDeviceInformation xmlns="http://www.onvif.org/ver10/device/wsdl"/>`;
    }
}
