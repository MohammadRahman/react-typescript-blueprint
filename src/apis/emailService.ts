import { httpCommon } from '@apis/http-common';


// const url = import.meta.env.VITE_EMAIL_ACCOUNT;
const url = "https://localhost:7289" 

console.log("baseUrlFromEnv",url);

export const emailService = httpCommon(url);
