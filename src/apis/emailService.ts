import { httpCommon } from "@apis/http-common";

const url = import.meta.env.VITE_EMAIL_ACCOUNT;
// const url = "http://localhost:5026"

export const emailService = httpCommon(url);
