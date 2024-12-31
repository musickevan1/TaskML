export const MODEL_VERSION = '1.0';

export const TECHNICAL_TERMS = [
  'api', 'database', 'integration', 'deployment', 'optimization',
  'refactor', 'migration', 'security', 'authentication', 'testing'
] as const;

export const WEIGHTS = {
  complexity: {
    description: 0.4,
    priority: 0.3,
    duration: 0.3
  },
  similarity: {
    complexity: 0.4,
    urgency: 0.3,
    duration: 0.3
  },
  urgency: {
    timeUntilDue: 0.5,
    priority: 0.3,
    dependencies: 0.2
  }
} as const;