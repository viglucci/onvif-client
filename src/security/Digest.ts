export interface SecurityDigest {
    username: string;
    passwordDigest: string;
    nonce: string;
    timestamp: string;
}

export function generateSecurityDigest(
    username: string,
    password: string
): SecurityDigest {
    return {
        username: 'a',
        passwordDigest: 'b',
        nonce: 'c',
        timestamp: 'd'
    };
};
