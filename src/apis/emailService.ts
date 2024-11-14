import { httpCommon } from '@apis/http-common';


const url = import.meta.env.VITE_EMAIL_ACCOUNT;
// const url = "http://localhost:5026" 

console.log("baseUrlFromEnv",url);

export const emailService = httpCommon(url);
