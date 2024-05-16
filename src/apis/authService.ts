import { createBaseUrl, httpCommon } from '@apis/http-common';
import { USERS } from './api-routes';
const url = 'http://localhost:3003';

export const authService = httpCommon(url);
