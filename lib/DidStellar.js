import { StrKey } from './StrKey.js';
import * as multibase from 'multibase';
import * as ed25519 from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';

ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m));

export class DidStellar {
    static publicKeyToMultibase(publicKeyBytes) {
      // Prefix with 0x00 to indicate ed25519 public key
      const prefixedKey = new Uint8Array([0x00, ...publicKeyBytes]);
      
      // Encode using base58btc multibase encoding
      const multibaseBytes = multibase.encode('base58btc', prefixedKey);
      
      // Use browser-compatible method to convert Uint8Array to string
      return new TextDecoder().decode(multibaseBytes);
    }

    static resolve(did) {
      const didDocument = DidStellar.getDocument(did);

      return {
        didResolutionMetadata: { 
          contentType: 'application/did+ld+json',
          retrieved: new Date().toISOString(),
         },
        didDocument: didDocument,
        didDocumentMetadata: {  }
      }
    }

    static fromPublicKey(publicKeyText) {
      const identifier = `did:stellar:${publicKeyText}`;
      return DidStellar.getDocument(identifier);
    }

    static fromPrivateKey(privateKeyText) {
        const publicKey = DidStellar.getPublicKey(privateKeyText);
        const identifier = `did:stellar:${publicKey}`;
        return DidStellar.getDocument(identifier);
    }

    static getPublicKey(privateKeyText) {
        const privateKeyData = StrKey.decodeEd25519SecretSeed(privateKeyText);
        // const privateKeyHex = bytesToHex(privateKeyData);
        const publicKeyData = ed25519.getPublicKey(privateKeyData);
        // const publicKeyData = ed25519.getPublicKey(privateKeyHex);
        const publicKeyString = StrKey.encodeEd25519PublicKey(publicKeyData);
        return publicKeyString;
    }

    static getDocument(did) {
        const keyUri = `${did}#0`;
        const publicKeyText = did.split(':')[2];
        const publicKeyData = StrKey.decodeEd25519PublicKey(publicKeyText);
        const multibaseKey = DidStellar.publicKeyToMultibase(publicKeyData);

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
                "publicKeyMultibase": "${multibaseKey}"
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
            ]
          }`;

          return JSON.parse(document);
    }
}