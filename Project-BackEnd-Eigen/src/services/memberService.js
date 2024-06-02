const memberRepository = require('../repositories/memberRepository');
const borrowingRepository = require('../repositories/borrowingRepository');
const Member = require('../models/Member');

class MemberService {
    static async createMember(memberData) {
        try {
            const member = new Member(memberData);
            return await memberRepository.save(member);
        } catch (error) {
            throw new Error(`Failed to create member: ${error.message}`);
        }
    }

    static async getAllMembers() {
        try {
            const members = await memberRepository.findAll();
            const membersWithActiveBorrowings = await Promise.all(members.map(async member => {
                const activeBorrowings = await borrowingRepository.findActiveByMemberId(member._id);
                return { ...member.toObject(), activeBorrowings };
            }));
            return membersWithActiveBorrowings;
        } catch (error) {
            throw new Error(`Failed to retrieve members: ${error.message}`);
        }
    }

    static async getMember(code) {
        try {
            const member = await memberRepository.findByCode(code);
            if (!member) {
                throw new Error('Member not found');
            }
            return member;
        } catch (error) {
            throw new Error(`Failed to retrieve member: ${error.message}`);
        }
    }

    static async updateMember(code, memberData) {
        try {
            const member = await memberRepository.findByCode(code);
            if (!member) {
                throw new Error('Member not found');
            }
            Object.assign(member, memberData);
            return await memberRepository.update(member);
        } catch (error) {
            throw new Error(`Failed to update member: ${error.message}`);
        }
    }

    static async deleteMember(code) {
        try {
            const member = await memberRepository.findByCode(code);
            if (!member) {
                throw new Error('Member not found');
            }
            return await memberRepository.delete(member._id);
        } catch (error) {
            throw new Error(`Failed to delete member: ${error.message}`);
        }
    }
}

module.exports = MemberService;
