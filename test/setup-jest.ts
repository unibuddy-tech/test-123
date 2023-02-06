// Mock unibuddy-logger
jest.mock('unibuddy-logger', () => ({
  UbLoggerFactory: {
    getLogger: () => ({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      http: jest.fn(),
      verbose: jest.fn(),
    }),
  },
}));
