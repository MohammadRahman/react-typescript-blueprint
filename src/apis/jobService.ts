import { httpCommon } from "./http-common";

const baseUrl = import.meta.env.VITE_EMAIL_ACCOUNT;

export const jobService = httpCommon(baseUrl);
