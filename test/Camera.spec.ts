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

describe.skip('Camera', () => {
    describe('getDeviceInformation', () => {
        it('x', async () => {
            const camera = new Camera({
                hostname: CAMERA_HOSTNAME,
                securityCredentials: {
                   username: CAMERA_USERNAME,
                   password: CAMERA_PASSWORD
                }
            });
            const information = await camera.getDeviceInformation();
        });
    });
});
