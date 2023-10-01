export default interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    location: {
        latitude: number;
        longitude: number;
    }
};
