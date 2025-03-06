import { StrKey } from './StrKey.js';

export class DidStellar {
    constructor() {
      this.method = 'stellar';
    }

    static resolve(did) {
        return this.getDocument(did);
    }

    static fromPublicKey(publicKeyText) {
        const identifier = `did:${this.method}:${publicKeyText}`;
        return this.getDocument(identifier);
    }

    static fromPrivateKey(privateKeyText) {
        const publicKey = this.getPublicKey(privateKeyText);
        const identifier = `did:${this.method}:${publicKey}`;
        return this.getDocument(identifier);
    }

    static getPublicKey(privateKeyText) {
        const privateKeyData = StrKey.decodeEd25519SecretSeed(privateKeyText);
        const privateKeyHex = bytesToHex(privateKeyData);
        const publicKeyData = ed25519.getPublicKey(privateKeyHex);
        const publicKeyString = StrKey.encodeEd25519PublicKey(publicKeyData);
        return publicKeyString;
    }

    static getDocument(did) {
        const keyUri = `${did}#0`;

        let  document = `{
            "@context": [
              "https://www.w3.org/ns/did/v1",
              "https://w3id.org/security/suites/ed25519-2020/v1"
            ],
            "id": "${did}",
            "verificationMethod": [
              {
                "id": "${keyUri}",
                "type": "Ed25519VerificationKey2020",
                "controller": "${did}",
                "publicKeyMultibase": "TODO"
              }
            ],
            "authentication": [
              "${keyUri}"
            ],
            "assertionMethod": [
              "${keyUri}"
            ],
            "capabilityDelegation": [
              "${keyUri}"
            ],
            "capabilityInvocation": [
              "${keyUri}"
            ],
            "keyAgreement": [
              "${keyUri}"
            ]
          }`;

          return document;
    }
}