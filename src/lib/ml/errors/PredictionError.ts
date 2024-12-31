export class PredictionError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'PredictionError';
  }

  static insufficientData(): PredictionError {
    return new PredictionError(
      'Insufficient historical data for prediction',
      'INSUFFICIENT_DATA'
    );
  }

  static invalidInput(details: unknown): PredictionError {
    return new PredictionError(
      'Invalid input data for prediction',
      'INVALID_INPUT',
      details
    );
  }

  static modelError(details: unknown): PredictionError {
    return new PredictionError(
      'Error during prediction calculation',
      'MODEL_ERROR',
      details
    );
  }
}