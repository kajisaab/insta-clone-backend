import * as forge from 'node-forge';
import { getAppConfig } from '@config/app';
import AppLogger from '@core/logger';

const privateKeyPEM = getAppConfig().rsaPrivateKey;

const logger = new AppLogger();

function decryptPassword(encryptedPassword: string) {
    if (!privateKeyPEM) throw new Error('Private key not found');

    try {
        // Decode Base64 to raw binary
        const encryptedBytes = forge.util.decode64(encryptedPassword);

        // Load private key
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPEM);

        // Decrypt using RSA-OAEP with SHA-256
        return privateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
        });
    } catch (error) {
        logger.error(`Decryption error: ${error}`);
        throw new Error('Failed to decrypt password');
    }
}

export default decryptPassword;
