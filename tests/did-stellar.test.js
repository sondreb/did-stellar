import { TestRunner } from './test-utils.js';
import { DidStellar, StrKey } from '../lib/index.js';
import * as ed25519 from '@noble/ed25519';

// Helper for DidStellar tests
function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

// Mock ed25519 for testing
// const ed25519 = {
//   getPublicKey: (privateKey) => {
//     // Just a mock implementation for testing
//     return new Uint8Array(32).fill(3);
//   }
// };

// Add these to global scope for DidStellar to use
globalThis.bytesToHex = bytesToHex;
// globalThis.ed25519 = ed25519;

export function runDidStellarTests() {
  const runner = new TestRunner();
  console.log('\n🧪 Running DidStellar Tests...');

  runner.test('DidStellar.fromPublicKey', () => {
    const publicKeyText = 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
    const did = `did:stellar:${publicKeyText}`;
    const document = DidStellar.fromPublicKey(publicKeyText);

    runner.assertEquals(document.id, did, 'DID document should contain the DID');
  });

  runner.test('DidStellar.fromPrivateKey', () => {
    const did = `did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB`;
    const privateKeyText = 'SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7';
    const document = DidStellar.fromPrivateKey(privateKeyText);

    runner.assertEquals(document.verificationMethod[0].publicKeyMultibase, 'z1APN5d6ZRjZQXsVegnYhKBcyifsU96gpVM5FrD3fdJLVd', 'Verification method should contain public key');
    runner.assertEquals(document.id, did, 'DID document should contain the DID');
});

  runner.test('DidStellar.resolve should return a DID document', () => {
    const did = 'did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
    const document = DidStellar.resolve(did);

    runner.assertEquals(document.didDocument.id, did, 'DID document should contain the DID');
  });

  runner.test('DidStellar.fromPublicKey should create a valid DID document', () => {
    const did = 'did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
    const publicKey = 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
    const document = DidStellar.fromPublicKey(publicKey);

    runner.assertEquals(document.id, did, 'DID document should contain the DID');
  });

  runner.test('DidStellar.getDocument should create a valid DID document with proper format', () => {
    const did = 'did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
    const document = DidStellar.getDocument(did);

    runner.assertEquals(document.id, did, 'DID document should contain the DID');
  });

  return runner.summarize();
}
