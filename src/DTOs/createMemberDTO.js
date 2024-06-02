class CreateMemberDTO {
    constructor({ code, name }) {
        if (!code || typeof code !== 'string') {
            throw new Error('Member code is required and must be a string');
        }
        if (!name || typeof name !== 'string') {
            throw new Error('Member name is required and must be a string');
        }

        this.code = code;
        this.name = name;
    }
}

module.exports = CreateMemberDTO;
