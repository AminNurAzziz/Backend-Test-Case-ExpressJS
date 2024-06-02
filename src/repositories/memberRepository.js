const Member = require('../models/Member');

class MemberRepository {
    static async save(member) {
        return member.save();
    }

    static async findAll() {
        return Member.find();
    }

    static async findByCode(code) {
        return Member.findOne({ code });
    }

    static async update(member) {
        return Member.findByIdAndUpdate(member._id, member, { new: true });
    }

    static async delete(id) {
        return Member.findByIdAndDelete(id);
    }
}

module.exports = MemberRepository;
