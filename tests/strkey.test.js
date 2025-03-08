import { TestRunner } from './test-utils.js';
import { StrKey } from '../lib/StrKey.js';

export function runStrKeyTests() {
  const runner = new TestRunner();
  console.log('\n🧪 Running StrKey Tests...');

  const publicKeyText = 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
  const privateKeyText = 'SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7';

  const publicKeyRaw = StrKey.decodeEd25519PublicKey(publicKeyText);
  const secretSeedRaw = StrKey.decodeEd25519SecretSeed(privateKeyText);

  runner.test('StrKey.encodeEd25519PublicKey should encode correctly', () => {
    const encoded = StrKey.encodeEd25519PublicKey(publicKeyRaw);
    runner.assertEquals(encoded.charAt(0), 'G', 'Public key should start with G');
    runner.assertEquals(encoded.length, 56, 'Encoded public key should be 56 characters');
  });

  runner.test('StrKey.decodeEd25519PublicKey should decode correctly', () => {
    const encoded = StrKey.encodeEd25519PublicKey(publicKeyRaw);
    const decoded = StrKey.decodeEd25519PublicKey(encoded);
    // Check decoded data matches original
    runner.assertEquals(decoded.length, publicKeyRaw.length, 'Decoded data length should match original');
    let allMatch = true;
    for (let i = 0; i < decoded.length; i++) {
      if (decoded[i] !== publicKeyRaw[i]) {
        allMatch = false;
        break;
      }
    }
    runner.assertTrue(allMatch, 'Decoded data should match original');
  });

  runner.test('StrKey.isValidEd25519PublicKey should validate correctly', () => {
    const encoded = StrKey.encodeEd25519PublicKey(publicKeyRaw);
    runner.assertTrue(StrKey.isValidEd25519PublicKey(encoded), 'Should validate valid key');
    runner.assertFalse(StrKey.isValidEd25519PublicKey('invalid'), 'Should reject invalid key');
  });

  runner.test('StrKey.encodeEd25519SecretSeed should encode correctly', () => {
    const encoded = StrKey.encodeEd25519SecretSeed(secretSeedRaw);
    runner.assertEquals(encoded.charAt(0), 'S', 'Secret seed should start with S');
    runner.assertEquals(encoded.length, 56, 'Encoded secret seed should be 56 characters');
  });

  runner.test('StrKey should handle basic encode/decode roundtrips', () => {
    // Test for public key
    const publicKeyEncoded = StrKey.encodeEd25519PublicKey(publicKeyRaw);
    const publicKeyDecoded = StrKey.decodeEd25519PublicKey(publicKeyEncoded);
    runner.assertEquals(publicKeyDecoded.length, publicKeyRaw.length, 'Roundtrip public key length should match');
    
    // Test for secret seed
    const secretSeedEncoded = StrKey.encodeEd25519SecretSeed(secretSeedRaw);
    const secretSeedDecoded = StrKey.decodeEd25519SecretSeed(secretSeedEncoded);
    runner.assertEquals(secretSeedDecoded.length, secretSeedRaw.length, 'Roundtrip secret seed length should match');
  });

  return runner.summarize();
}
