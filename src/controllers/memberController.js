const memberService = require('../services/memberService');

class MemberController {
    async createMember(req, res) {
        try {
            const member = await memberService.createMember(req.body);
            res.status(201).json(member);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllMembers(req, res) {
        try {
            const members = await memberService.getAllMembers();

            const formattedMembers = members.map(member => {
                return {
                    code: member.code,
                    name: member.name,
                    borrwoingQuantity: member.activeBorrowings.length
                };
            });

            res.status(200).json(formattedMembers);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getMember(req, res) {
        try {
            const member = await memberService.getMember(req.params.code);
            res.status(200).json(member);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateMember(req, res) {
        try {
            const member = await memberService.updateMember(req.params.code, req.body);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteMember(req, res) {
        try {
            await memberService.deleteMember(req.params.code);
            res.status(204).end();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new MemberController();
