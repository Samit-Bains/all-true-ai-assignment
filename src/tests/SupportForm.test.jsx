// src/tests/SupportForm.test.jsx
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import supportReducer from '../_slices/supportSlice';
import SupportForm from '../pages/Support/SupportForm';

// Helper to wrap component with Redux store and Router
const renderWithProviders = (
    ui,
    { preloadedState, store = configureStore({ reducer: { support: supportReducer }, preloadedState }) } = {}
    ) => {
        return {
            store,
            ...render(
            <Provider store={store}>
                <MemoryRouter>{ui}</MemoryRouter>
            </Provider>
            ),
        };
};

describe('SupportForm', () => {
    it('renders the form fields', () => {
        renderWithProviders(<SupportForm />);

        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Issue Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Step 1/i)).toBeInTheDocument();
    });

    it('shows validation error if email is invalid', async () => {
        renderWithProviders(<SupportForm />);

        // Fill form
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });

        fireEvent.mouseDown(screen.getByLabelText(/Issue Type/i));
        const listbox = await screen.findByRole('listbox');
        fireEvent.click(within(listbox).getByText('Bug Report'));

        fireEvent.change(screen.getByLabelText(/Step 1/i), { target: { value: 'Click button' } });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText(/Enter a valid email/i)).toBeInTheDocument();
    });

    it('submits the form with valid data', async () => {
        const { store } = renderWithProviders(<SupportForm />);

        // Fill form
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Samit Bains' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'samitpalbains@gmail.com' } });

        fireEvent.mouseDown(screen.getByLabelText(/Issue Type/i));
        const listbox = await screen.findByRole('listbox');
        fireEvent.click(within(listbox).getByText('Bug Report'));

        fireEvent.change(screen.getByLabelText(/Step 1/i), { target: { value: 'Open app' } });

        // Submit
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        // Wait for Redux state to update asynchronously
        await waitFor(() => {
            const state = store.getState();
            expect(state.support.supportForm).toMatchObject({
                fullName: 'Samit Bains',
                email: 'samitpalbains@gmail.com',
                issueType: 'Bug Report',
            });
        });
    });
});
