class UpdateMemberDTO {
    constructor({ name }) {
        if (!name || typeof name !== 'string') {
            throw new Error('Member name is required and must be a string');
        }

        this.name = name;
    }
}

module.exports = UpdateMemberDTO;