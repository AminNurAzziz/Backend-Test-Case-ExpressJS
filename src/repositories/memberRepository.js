const Member = require('../models/Member');

class MemberRepository {
    async save(member) {
        return member.save();
    }

    async findAll() {
        return Member.find();
    }

    async findByCode(code) {
        return Member.findOne({ code });
    }

    async update(member) {
        return Member.findByIdAndUpdate(member._id, member, { new: true });
    }

    async delete(id) {
        return Member.findByIdAndDelete(id);
    }
}

module.exports = new MemberRepository();
