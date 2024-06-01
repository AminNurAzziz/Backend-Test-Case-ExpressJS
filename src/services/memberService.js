const memberRepository = require('../repositories/memberRepository');
const borrowingRepository = require('../repositories/borrowingRepository');

class MemberService {
    async createMember(memberData) {
        const member = new Member(memberData);
        return memberRepository.save(member);
    }

    async getAllMembers() {
        const members = await memberRepository.findAll();
        const membersWithActiveBorrowings = await Promise.all(members.map(async member => {
            const activeBorrowings = await borrowingRepository.findActiveByMemberId(member._id);
            return { ...member.toObject(), activeBorrowings };
        }));

        return membersWithActiveBorrowings;
    }

    async getMember(code) {
        const member = await memberRepository.findByCode(code);
        if (!member) {
            throw new Error('Member not found');
        }
        return member;
    }

    async updateMember(code, memberData) {
        const member = await memberRepository.findByCode(code);
        if (!member) {
            throw new Error('Member not found');
        }
        Object.assign(member, memberData);
        return memberRepository.update(member);
    }

    async deleteMember(code) {
        const member = await memberRepository.findByCode(code);
        if (!member) {
            throw new Error('Member not found');
        }
        return memberRepository.delete(member._id);
    }
}

module.exports = new MemberService();
