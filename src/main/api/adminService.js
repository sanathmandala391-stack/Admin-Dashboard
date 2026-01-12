
import adminApi from "./adminAPi";

/**
 * Fetches all registered users from the backend
 * @returns {Promise} Axios promise with user data
 */
export const getAllUsers = () => adminApi.get("/admin/users");