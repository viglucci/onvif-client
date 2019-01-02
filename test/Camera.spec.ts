import { expect } from 'chai';
import { slow, suite, test, timeout } from "mocha-typescript";
import * as nock from 'nock';
import { Camera } from '../src/camera/Camera';
import XMLMockReader from './util/XMLMockReader';

const getDeviceInformationResponseSuccess = XMLMockReader.readFile('./test/mocks/GetDeviceInformationResponseSuccess.xml');

const ONVIF_SERVICE_PATH : string = '/onvif/device_service';
const TEST_SERVER_HOSTNAME: string = 'http://127.0.0.1:80';
const CAMERA_HOSTNAME: string = '127.0.0.1:80';
const CAMERA_USERNAME: string = 'admin';
const CAMERA_PASSWORD: string = '123456';

@suite(
  timeout(3000),
  slow(1000)
)
class CameraTestSuite {

  static before(): void {
    nock.disableNetConnect();
  }

  static after(): void {
    nock.cleanAll();
    nock.enableNetConnect();
  }

  @test('returns a POJO from the parsed response')
  async test(): Promise<void> {

    nock(TEST_SERVER_HOSTNAME)
      .post(ONVIF_SERVICE_PATH, /GetDeviceInformation/gi)
      .reply(200, getDeviceInformationResponseSuccess, {
          'Content-Type': 'application/xml'
        }
      );

    const camera = new Camera({
        hostname: CAMERA_HOSTNAME,
        securityCredentials: {
            username: CAMERA_USERNAME,
            password: CAMERA_PASSWORD
        }
    });

    const data = await camera.getDeviceInformation();

    expect(data).to.have.property('manufacturer');
    expect(data).to.have.property('model');
    expect(data).to.have.property('firmwareVersion');
    expect(data).to.have.property('serialNumber');
    expect(data).to.have.property('hardwareId');
  }
}
