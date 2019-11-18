export const isAuthenticated = function() {
    const token = sessionStorage.getItem('app-token');
    return token;
};