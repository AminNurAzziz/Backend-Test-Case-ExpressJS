const memberService = require('../services/memberService');
const CreateMemberDTO = require('../DTOs/createMemberDTO');
const UpdateMemberDTO = require('../DTOs/updateMemberDTO');

class MemberController {
    static async createMember(req, res) {
        try {
            const createMemberDTO = new CreateMemberDTO(req.body);
            const member = await memberService.createMember(createMemberDTO);
            console.log(`[INFO] MemberController.createMember - Member created:`, member);
            res.status(201).json({
                success: true,
                message: 'Member created successfully'
            });
        } catch (error) {
            console.error(`[ERROR] MemberController.createMember - Error creating member:`, error);
            res.status(400).json({
                success: false,
                error: `Failed to create member: ${error.message}`
            });
        }
    }

    static async getAllMembers(req, res) {
        try {
            const members = await memberService.getAllMembers();

            const formattedMembers = members.map(member => {
                return {
                    code: member.code,
                    name: member.name,
                    borrowingQuantity: member.activeBorrowings.length
                };
            });

            console.log(`[INFO] MemberController.getAllMembers - All members retrieved`);
            res.status(200).json({
                success: true,
                message: 'All members retrieved successfully',
                data: formattedMembers
            });

        } catch (error) {
            console.error(`[ERROR] MemberController.getAllMembers - Error getting all members:`, error);
            res.status(500).json({
                success: false,
                error: `Failed to retrieve members: ${error.message}`
            });
        }
    }

    static async getMember(req, res) {
        try {
            const member = await memberService.getMember(req.params.code);
            const formattedMember = {
                code: member.code,
                name: member.name,
                penaltyEndDateTime: member.penaltyEndDate
            };
            console.log(`[INFO] MemberController.getMember - Member retrieved`);
            res.status(200).json({
                success: true,
                message: 'Member retrieved successfully',
                data: formattedMember
            });
        } catch (error) {
            console.error(`[ERROR] MemberController.getMember - Error getting member:`, error);
            res.status(404).json({
                success: false,
                error: `Member not found: ${error.message}`
            });
        }
    }

    static async updateMember(req, res) {
        try {
            const updateMemberDTO = new UpdateMemberDTO(req.body);
            const member = await memberService.updateMember(req.params.code, updateMemberDTO);
            console.log(`[INFO] MemberController.updateMember - Member updated`);
            res.status(200).json({
                success: true,
                message: 'Member updated successfully'
            });
        } catch (error) {
            console.error(`[ERROR] MemberController.updateMember - Error updating member:`, error);
            res.status(400).json({
                success: false,
                error: `Failed to update member: ${error.message}`
            });
        }
    }

    static async deleteMember(req, res) {
        try {
            await memberService.deleteMember(req.params.code);
            console.log(`[INFO] MemberController.deleteMember - Member deleted for code:`, req.params.code);
            res.status(200).json({
                success: true,
                message: 'Member deleted successfully'
            });
        } catch (error) {
            console.error(`[ERROR] MemberController.deleteMember - Error deleting member:`, error);
            res.status(404).json({
                success: false,
                error: `Failed to delete member: ${error.message}`
            });
        }
    }
}

module.exports = MemberController;
