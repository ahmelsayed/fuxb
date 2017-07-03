declare module 'passport-azure-ad' {
    export default class {
        constructor(options: StrategyOptions);
        authenticate(req: any, options: any): void;
    }
}

interface StrategyOptions {
    identityMetadata: string;
    clientID: string;
    responseType: 'code' | 'code id_token' | 'id_token code' | 'id_token';
    responseMode: 'query' | 'form_post';
    redirectUrl: string;
    allowHttpForRedirectUrl?: boolean;
    clientSecret: string;
    thumbprint?: string;
    privatePEMKey?: string;
    isB2C?: string;
    validateIssuer: boolean;
    issuer?: string;
    scope: string;
    passReqToCallback?: string;
    loggingLevel?: string;
    nonceLifetime?: string;
    useCookieInsteadOfSession: boolean;
    cookieEncryptionKeys: Array<{ key: string, iv: string }>;
}