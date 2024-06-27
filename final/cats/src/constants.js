export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    AUTH_DENIED: 'auth-denied',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_NAME: 'required-name',
    PERMISSION_INSUFFICIENT: 'permission-insufficient',
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records. Please try again.',
    [SERVER.AUTH_DENIED]: 'Your username is a banning user. Please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (only letters and numbers) username',
    [SERVER.REQUIRED_NAME]: 'Please enter a valid (only letters) cat\'s name',
    default: 'Something went wrong.  Please try again',
};