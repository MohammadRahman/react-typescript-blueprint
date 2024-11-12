import { httpCommon } from '@apis/http-common';


const url = import.meta.env.VITE_EMAIL_ACCOUNT;

console.log("baseUrlFromEnv",url);

export const emailService = httpCommon(`${url}`);
