import { Camera } from '../src/camera/Camera';

describe('Camera', () => {
    it('can be intialized', () => {
        const options = {
            hostname: '192.168.0.17'
        };
        const camera = new Camera(options);
    });

    describe('getSystemDateAndTime', () => {
        it('x', async () => {
            const camera = new Camera({
                hostname: '192.168.0.17',
                securityCredentials: {
                   username: 'admin',
                   password: '123456'
                }
            });
            await camera.getSystemDateAndTime();
        });
    });
});