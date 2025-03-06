import { TestRunner } from './test-utils.js';
import { DidStellar, StrKey } from '../lib/index.js';

// Helper for DidStellar tests
function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

// Mock ed25519 for testing
const ed25519 = {
  getPublicKey: (privateKey) => {
    // Just a mock implementation for testing
    return new Uint8Array(32).fill(3);
  }
};

// Add these to global scope for DidStellar to use
globalThis.bytesToHex = bytesToHex;
globalThis.ed25519 = ed25519;

export function runDidStellarTests() {
  const runner = new TestRunner();
  console.log('\n🧪 Running DidStellar Tests...');

  runner.test('DidStellar should have correct method', () => {
    const didStellar = new DidStellar();
    runner.assertEquals(didStellar.method, 'stellar', 'Method should be "stellar"');
  });

  runner.test('DidStellar.resolve should return a DID document', () => {
    const did = 'did:stellar:GACXQXHJR6CYMTCZDMZRGXCTWJZ5JQ33F4IERHCR6C3E7SGKCKXQAUJE';
    const document = DidStellar.resolve(did);
    runner.assertTrue(document.includes(did), 'DID document should contain the DID');
    runner.assertTrue(document.includes('@context'), 'DID document should contain @context');
    runner.assertTrue(document.includes('verificationMethod'), 'DID document should contain verificationMethod');
  });

  runner.test('DidStellar.fromPublicKey should create a valid DID document', () => {
    const publicKey = 'GACXQXHJR6CYMTCZDMZRGXCTWJZ5JQ33F4IERHCR6C3E7SGKCKXQAUJE';
    const document = DidStellar.fromPublicKey(publicKey);
    runner.assertTrue(document.includes(`did:stellar:${publicKey}`), 'DID document should contain the correct DID');
  });

  runner.test('DidStellar.getDocument should create a valid DID document with proper format', () => {
    const did = 'did:stellar:GACXQXHJR6CYMTCZDMZRGXCTWJZ5JQ33F4IERHCR6C3E7SGKCKXQAUJE';
    const document = DidStellar.getDocument(did);
    
    // Parse the document to verify it's valid JSON
    try {
      const parsedDoc = JSON.parse(document);
      runner.assertEquals(parsedDoc.id, did, 'DID document id should match the input DID');
      runner.assertTrue(Array.isArray(parsedDoc.verificationMethod), 'verificationMethod should be an array');
      runner.assertTrue(Array.isArray(parsedDoc.authentication), 'authentication should be an array');
    } catch (e) {
      throw new Error(`Failed to parse document as JSON: ${e.message}`);
    }
  });

  return runner.summarize();
}
