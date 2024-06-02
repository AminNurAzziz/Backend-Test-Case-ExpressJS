const MemberService = require('../src/services/memberService');
const memberRepository = require('../src/repositories/memberRepository');
const borrowingRepository = require('../src/repositories/borrowingRepository');
const Model = require('../src/models/Member');

jest.mock('../src/repositories/memberRepository', () => ({
    save: jest.fn(),
    findAll: jest.fn(),
    findByCode: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
}));

jest.mock('../src/repositories/borrowingRepository', () => ({
    findActiveByMemberId: jest.fn(),
}));

describe('MemberService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createMember', () => {
        test('should save a member', async () => {
            const memberData = { code: 'sampleCode', name: 'John Doe', penaltyEndDate: null };
            const savedMember = { _id: '665b98bc346f078bd1f0962d', code: 'sampleCode', name: 'John Doe', penaltyEndDate: null };
            memberRepository.save.mockResolvedValueOnce(savedMember);

            const result = await MemberService.createMember(memberData);

            expect(memberRepository.save).toHaveBeenCalledWith(expect.objectContaining(memberData));
            expect(result).toEqual(savedMember);
        });
    });

    describe('getAllMembers', () => {
        test('should return all members with active borrowings', async () => {
            // Mock member objects that mimic Mongoose model instances
            const members = [
                new Model({ _id: 'sampleId1', name: 'Ferry' }),
                new Model({ _id: 'sampleId2', name: 'Putri' })
            ];

            // Mock the response of memberRepository.findAll()
            memberRepository.findAll.mockResolvedValueOnce(members);

            // Mock the response of borrowingRepository.findActiveByMemberId()
            borrowingRepository.findActiveByMemberId.mockResolvedValue([]);

            // Call the method being tested
            const result = await MemberService.getAllMembers();

            // Verify that memberRepository.findAll() is called
            expect(memberRepository.findAll).toHaveBeenCalled();

            // Verify the returned result
            expect(result).toEqual([
                { ...members[0].toObject(), activeBorrowings: [] },
                { ...members[1].toObject(), activeBorrowings: [] }
            ]);
        });
    });


    describe('getMember', () => {
        test('should return a member by code', async () => {
            const memberCode = 'sampleCode';
            const memberData = { _id: 'sampleId', name: 'John Doe', email: 'john@example.com' };
            memberRepository.findByCode.mockResolvedValueOnce(memberData);

            const result = await MemberService.getMember(memberCode);

            expect(memberRepository.findByCode).toHaveBeenCalledWith(memberCode);
            expect(result).toEqual(memberData);
        });

        test('should throw an error if member not found', async () => {
            const memberCode = 'nonExistentCode';
            memberRepository.findByCode.mockResolvedValueOnce(null);

            await expect(MemberService.getMember(memberCode)).rejects.toThrowError('Member not found');

            expect(memberRepository.findByCode).toHaveBeenCalledWith(memberCode);
        });
    });

    describe('updateMember', () => {
        test('should update a member by code', async () => {
            const memberCode = 'sampleCode';
            const memberDataToUpdate = { name: 'Updated Name' };
            const existingMemberData = { _id: 'sampleId', name: 'John Doe', email: 'john@example.com' };
            const updatedMemberData = { ...existingMemberData, ...memberDataToUpdate };
            memberRepository.findByCode.mockResolvedValueOnce(existingMemberData);
            memberRepository.update.mockResolvedValueOnce(updatedMemberData);

            const result = await MemberService.updateMember(memberCode, memberDataToUpdate);

            expect(memberRepository.findByCode).toHaveBeenCalledWith(memberCode);
            expect(memberRepository.update).toHaveBeenCalledWith(existingMemberData);
            expect(result).toEqual(updatedMemberData);
        });

        test('should throw an error if member not found', async () => {
            const memberCode = 'nonExistentCode';
            const memberDataToUpdate = { name: 'Updated Name' };
            memberRepository.findByCode.mockResolvedValueOnce(null);

            await expect(MemberService.updateMember(memberCode, memberDataToUpdate)).rejects.toThrowError('Member not found');

            expect(memberRepository.findByCode).toHaveBeenCalledWith(memberCode);
        });
    });

    describe('deleteMember', () => {
        test('should delete a member by code', async () => {
            const memberCode = 'sampleCode';
            const memberData = { _id: 'sampleId', name: 'John Doe', email: 'john@example.com' };
            memberRepository.findByCode.mockResolvedValueOnce(memberData);
            memberRepository.delete.mockResolvedValueOnce(true);

            const result = await MemberService.deleteMember(memberCode);

            expect(memberRepository.findByCode).toHaveBeenCalledWith(memberCode);
            expect(memberRepository.delete).toHaveBeenCalledWith(memberData._id);
            expect(result).toBe(true);
        });

        test('should throw an error if member not found', async () => {
            const memberCode = 'nonExistentCode';
            memberRepository.findByCode.mockResolvedValueOnce(null);

            await expect(MemberService.deleteMember(memberCode)).rejects.toThrowError('Member not found');

            expect(memberRepository.findByCode).toHaveBeenCalledWith(memberCode);
        });
    });
});
