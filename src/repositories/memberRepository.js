const Member = require('../models/Member');

class MemberRepository {
    async findAll() {
        return Member.find({});
    }

    async findByCode(code) {
        return Member.findOne({ code });
    }

    async save(member) {
        return member.save();
    }

    async update(member) {
        return Member.findOneAndUpdate({ code: member.code }, member, { new: true });
    }
}

module.exports = new MemberRepository();
