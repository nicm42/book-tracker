import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// runs a cleanup after each test case (e.g. clearing jsdom)
// Also reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
