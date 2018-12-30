import * as crypto from 'crypto';

export interface SecurityDigest {
    username: string;
    passwordDigest: string;
    nonce: string;
    timestamp: string;
}

export function composeSecurityDigest(
    username: string,
    password: string
): SecurityDigest {
    const date = new Date(Date.now());
    const timestamp = date.toISOString();

    const nonce = Buffer.allocUnsafe(16);
    nonce.writeUIntLE(Math.ceil(Math.random() * 0x100000000), 0, 4);
    nonce.writeUIntLE(Math.ceil(Math.random() * 0x100000000), 4, 4);
    nonce.writeUIntLE(Math.ceil(Math.random() * 0x100000000), 8, 4);
    nonce.writeUIntLE(Math.ceil(Math.random() * 0x100000000), 12, 4);

    const cryptoDigest = crypto.createHash('sha1');
	cryptoDigest.update(
        Buffer.concat([
            nonce,
            Buffer.from(timestamp, 'ascii'),
            Buffer.from(password, 'ascii')
        ])
    );

    const passwordDigest = cryptoDigest.digest('base64');

    return {
        username,
        passwordDigest,
        timestamp,
        nonce: nonce.toString('base64')
	};
};
