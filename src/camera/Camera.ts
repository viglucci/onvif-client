namespace Camera {

    export interface ConstructorOptions {
        hostname: string;
        port?: Number;
        path?: string;
        security?: Security.Credentials
    }
}

export class Camera {

    hostname: string;

    port: Number;

    path: string;

    constructor(options: Camera.ConstructorOptions) {
        this.hostname = options.hostname;
        this.port = options.port || 80;
        this.path = options.path || '/onvif/device_service';
    }

    async getSystemDateAndTime(): Promise<any> {

    }
}