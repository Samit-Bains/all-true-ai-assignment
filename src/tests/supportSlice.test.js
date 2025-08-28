import reducer, { saveForm, clearForm } from '../_slices/supportSlice';

describe('supportSlice', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual({ supportForm: null });
    });

    it('should handle submitForm', () => {
        const formData = { fullName: 'Samit Bains', email: 'samitpalbains@gmail.com' };
        const result = reducer(undefined, saveForm(formData));
        expect(result.supportForm).toEqual(formData);
    });

    it('should handle clearForm', () => {
        const state = { supportForm: { fullName: 'Samit Bains' } };
        const result = reducer(state, clearForm());
        expect(result.supportForm).toBe(null);
    });
});
