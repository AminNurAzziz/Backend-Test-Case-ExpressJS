class LoginDTO {
    constructor({ username, password }) {
        if (!username || typeof username !== 'string') {
            throw new Error('Username is required and must be a string');
        }
        if (!password || typeof password !== 'string') {
            throw new Error('Password is required and must be a string');
        }

        this.username = username;
        this.password = password;
    }
}

module.exports = LoginDTO;
