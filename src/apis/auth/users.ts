import { LOGIN, USERS } from "@apis/api-routes";
import { authService } from "@apis/authService";


function createUser(userData: any) {
    return authService.post(`${USERS}`, userData)
}
function login(credentials: any) {
    console.log(credentials)
    return authService.post(`${LOGIN}`, credentials)
}
function currentUser(token: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Assuming token is a JWT
            'Content-Type': 'application/json',
        },
    }
    return authService.get(`${USERS}`, config)
}
function logOut() {
    return new Promise<void>((resolve, reject) => {
        try {
            localStorage.removeItem('token');
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
export const userService = {
    createUser,
    login,
    currentUser,
    logOut
}