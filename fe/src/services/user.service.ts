import axios from "axios";
import authService from "./auth.service";
import { BACKEND_URL } from "../constants";

class UserService {
    async getUserData() {
        const url: string = `${BACKEND_URL}/users/user/`;
        const response = await axios.get(url, {
            headers: authService.authHeader()

        });

        if (!response.data.userData) {
            throw new Error("Failed to get user data");
        }

        return response.data.userData;
    }
};

const userService: UserService = new UserService();
export default userService;
