import { supportSchema } from '../_utils/validationSchemas';

describe('supportSchema', () => {
    it('should validate a correct form', () => {
        const data = {
            fullName: 'Samit Bains',
            email: 'samitpalbains@gmail.com',
            issueType: 'Bug Report',
            tags: ['UI'],
            steps: [{ value: 'Step 1' }]
        };

        const result = supportSchema.safeParse(data);
        expect(result.success).toBe(true);
    });

    it('should fail if full name is missing last name', () => {
        const data = {
            fullName: 'Samit',
            email: 'samitpalbains@gmail.com',
            issueType: 'Bug Report',
            steps: [{ value: 'Step 1' }]
        };

        const result = supportSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe('Please enter both first and last name');
    });

    it('should fail if email is invalid', () => {
        const data = {
            fullName: 'Samit Bains',
            email: 'wrong email',
            issueType: 'Bug Report',
            steps: [{ value: 'Step 1' }]
        };

        const result = supportSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe('Enter a valid email');
    });
});
