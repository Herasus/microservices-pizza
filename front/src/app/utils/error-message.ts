export type ApiErrorMessageMap = { [apiError: string]: string };

const errors: { [apiError: string]: string } = {
  Unauthorized: 'Vous n\'avez pas accès à cette page.',
  'Request failed with status code 500': 'Une erreur interne est survenue.',
  'Network Error': 'Impossible de se connecter au serveur, veuillez réessayer.'
};

export const getApiErrorMessage = (error: any, defaultError?: string | ApiErrorMessageMap) => {
  let message: any = error.response?.data?.message
    ?? error.error?.error?.message
    ?? error.response?.data?.error?.message
    ?? error.response?.data?.error
    ?? error.message
    ?? (typeof error === 'string' && error)
    ?? (typeof defaultError === 'string' && defaultError)
    ?? 'An error has occurred.';
  if (Array.isArray(message)) {
    message = message.join(', ');
  }
  const allErrors = {
    ...errors,
    ...(typeof defaultError === 'object' ? defaultError : {})
  };
  if (message && allErrors[message]) {
    return allErrors[message];
  }
  return message;
};
