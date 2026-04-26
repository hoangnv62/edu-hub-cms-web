const TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

const setUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};

export {
    setToken,
    getToken,
    removeToken,
    setUser,
    getUser,
    removeUser
}