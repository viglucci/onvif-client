import 'mocha';
import { Camera } from '../src/camera/Camera';
import * as dotenv from 'dotenv';
import * as path from 'path';

let CAMERA_HOSTNAME: any;
let CAMERA_USERNAME: any;
let CAMERA_PASSWORD: any;

before(() => {
    dotenv.config({
        path: path.resolve(__dirname, '../.env')
    });
    CAMERA_HOSTNAME = process.env.CAMERA_HOSTNAME;
    CAMERA_USERNAME = process.env.CAMERA_USERNAME;
    CAMERA_PASSWORD = process.env.CAMERA_PASSWORD;
});

describe.only('Camera', () => {
    describe('getDeviceInformation', () => {
        it('returns a POJO from the parsed response', async () => {
          //TODO: Setup NOCK here to mock http calls and assert on responses
          const camera = new Camera({
              hostname: CAMERA_HOSTNAME,
              securityCredentials: {
                  username: CAMERA_USERNAME,
                  password: CAMERA_PASSWORD
              }
          });
          const data = await camera.getDeviceInformation();
          console.log(data);
        });
    });
});
