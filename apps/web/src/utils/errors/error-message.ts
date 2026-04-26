export function getErrorMessage(
  error: Error | null | undefined,
  fallbackMessage: string,
) {
  if (error && error.message.trim() !== "") {
    return error.message;
  }

  return fallbackMessage;
}
