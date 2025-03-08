# did:stellar

[![npm version](https://badge.fury.io/js/%40sondreb%2Fdid-stellar.svg)](https://www.npmjs.com/package/@sondreb/did-stellar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A JavaScript library implementing the "did:stellar" Decentralized Identifier (DID) method, which uses Stellar cryptography for DID creation and resolution.

## Installation

```bash
npm install @sondreb/did-stellar
```

## Overview

This library enables creation and resolution of DIDs using the Stellar blockchain's cryptographic functions. The `did:stellar` method uses Stellar public keys as identifiers, allowing for seamless integration with the Stellar ecosystem.

## Features

- Create DIDs from Stellar public or private keys
- Resolve DIDs to standard DID Documents
- Convert Stellar keys to multibase format for DID Documents
- Ed25519 key verification and handling

## Usage

### Importing the Library

```javascript
import { DidStellar, StrKey } from '@sondreb/did-stellar';
```

### Creating a DID from a Public Key

```javascript
const publicKeyText = 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
const didDocument = DidStellar.fromPublicKey(publicKeyText);
console.log(didDocument.id); // 'did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB'
```

### Creating a DID from a Private Key

```javascript
const privateKeyText = 'SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7';
const didDocument = DidStellar.fromPrivateKey(privateKeyText);
console.log(didDocument.id); // Will output the DID derived from the public key
```

### Resolving a DID

```javascript
const did = 'did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
const resolution = DidStellar.resolve(did);
console.log(resolution.didDocument); // Full DID Document
```

### Getting a DID Document

```javascript
const did = 'did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';
const document = DidStellar.getDocument(did);
console.log(document); // DID Document
```

### Getting a Public Key from a Private Key

```javascript
const privateKeyText = 'SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7';
const publicKeyText = DidStellar.getPublicKey(privateKeyText);
console.log(publicKeyText); // Stellar public key
```

### Working with Stellar Keys

The package includes the `StrKey` utility for handling Stellar key formats:

```javascript
import { StrKey } from '@sondreb/did-stellar';

// Encode raw bytes to a Stellar public key
const encodedKey = StrKey.encodeEd25519PublicKey(publicKeyBytes);

// Decode a Stellar public key to raw bytes
const decodedBytes = StrKey.decodeEd25519PublicKey(publicKeyText);

// Validate a Stellar public key
const isValid = StrKey.isValidEd25519PublicKey(publicKeyText);
```

## API Reference

### DidStellar

#### `static resolve(did: string)`

Resolves a DID to a compliant DID Resolution Result.

#### `static fromPublicKey(publicKeyText: string)`

Creates a DID Document from a Stellar public key.

#### `static fromPrivateKey(privateKeyText: string)`

Creates a DID Document from a Stellar private key.

#### `static getPublicKey(privateKeyText: string)`

Derives a Stellar public key from a Stellar private key.

#### `static getDocument(did: string)`

Generates a standard DID Document from a did:stellar identifier.

#### `static publicKeyToMultibase(publicKeyBytes: Uint8Array)`

Converts a public key to multibase format for use in DID Documents.

### StrKey

Utility class for handling Stellar key formats. See full documentation in the [code](./lib/StrKey.js).

## DID Document Example

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB",
  "verificationMethod": [
    {
      "id": "did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB#0",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB",
      "publicKeyMultibase": "z1APN5d6ZRjZQXsVegnYhKBcyifsU96gpVM5FrD3fdJLVd"
    }
  ],
  "authentication": [
    "did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB#0"
  ],
  "assertionMethod": [
    "did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB#0"
  ],
  "capabilityDelegation": [
    "did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB#0"
  ],
  "capabilityInvocation": [
    "did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB#0"
  ],
  "keyAgreement": [
    "did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB#0"
  ]
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.