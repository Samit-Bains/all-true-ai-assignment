import { z } from 'zod';

export const ISSUE_TYPES = ['Bug Report', 'Feature Request', 'General Inquiry'];
export const TAGS = ['UI', 'Backend', 'Performance'];

const stepSchema = z.object({
    value: z.string().min(1, 'Step cannot be empty'),
});

export const supportSchema = z.object({
    fullName: z.string()
        .min(1, 'Full name is required')
        .refine((val) => val.trim().split(' ').length >= 2, {
            message: 'Please enter both first and last name',
        }),
    email: z.email('Enter a valid email'),
    issueType: z.string()
        .min(1, 'Select an issue type')
        .refine(val => ISSUE_TYPES.includes(val), {
            message: 'Select an issue type',
        }),
    tags: z.array(z.enum(TAGS))
        .optional()
        .default([]),
    steps: z.array(stepSchema)
        .min(1, 'At least one step is required'),
});