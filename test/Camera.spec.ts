import { Camera } from '../src/camera/Camera';

describe('Camera', () => {

    it('can be intialized', () => {
        const options = {
            hostname: '192.168.0.17'
        };
        new Camera(options);
    });

    describe('getDeviceInformation', () => {

        it('x', async () => {
            const camera = new Camera({
                hostname: '192.168.0.17',
                securityCredentials: {
                   username: 'admin',
                   password: '123456'
                }
            });
            const information = await camera.getDeviceInformation();
        });
    });
});