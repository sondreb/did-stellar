import { runStrKeyTests } from './strkey.test.js';
import { runDidStellarTests } from './did-stellar.test.js';

console.log('📋 Running did-stellar tests...');

// Run all test suites
const strKeyResult = runStrKeyTests();
const didStellarResult = runDidStellarTests();

// Determine overall exit code
const exitCode = strKeyResult || didStellarResult;

// Print final results
console.log('\n===== Test Run Complete =====');
if (exitCode === 0) {
  console.log('✅ All tests passed!');
} else {
  console.error('❌ Some tests failed!');
}

// Exit with appropriate code
process.exit(exitCode);
