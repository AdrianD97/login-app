import axios from "axios";
import { BACKEND_URL } from "../constants";

class AuthService {
    async login(username: string, password: string) {
        const url: string = `${BACKEND_URL}/auth/login`;
        const response = await axios.post(url, { username, password });

        if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
        }

        return response.data;
    }

    logout() {
        localStorage.removeItem("accessToken");
    }

    authHeader () {
        const accessToken = localStorage.getItem("accessToken");
    
        if (accessToken) {
            return { Authorization: 'Bearer ' + accessToken };
        }
        
        return { Authorization: '' };
    };

    isLoggedIn() {
        return localStorage.getItem("accessToken") !== null;
    }
};

const authService: AuthService = new AuthService();
export default authService;
