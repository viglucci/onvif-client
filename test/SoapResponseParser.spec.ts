import 'mocha';
import ResponseParser from '../src/soap/ResponseParser';
import XMLMockReader from './util/XMLMockReader';

const getDeviceInformationResponseSuccess = XMLMockReader.readFile('./test/mocks/GetDeviceInformationResponseSuccess.xml');

describe.only('ResponseParser', () => {
    describe('parse', () => {
        it('maps tags to ', async () => {
          const parsed = ResponseParser.parse(getDeviceInformationResponseSuccess);
          console.log(parsed);
        });
    });
});
