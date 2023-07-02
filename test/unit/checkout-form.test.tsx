import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Form } from '../../src/client/components/Form';

describe('checkout form', () => {
    it('Все инпуты рендерятся', async () => {
        let success = false;
        const onSubmit = () => success = true;
        const app = <Form onSubmit={onSubmit}/>;
        render(app);

        const nameInput = await screen.findByLabelText('Name');
        const phoneInput = await screen.findByLabelText('Phone');
        const addressInput = await screen.findByLabelText('Address');

        expect(nameInput).toBeInTheDocument()
        expect(phoneInput).toBeInTheDocument()
        expect(addressInput).toBeInTheDocument()
    });

    it('Форму можно заполнить и отправить', async () => {
        const onSubmit = jest.fn();
        const app = <Form onSubmit={onSubmit}/>;
        render(app);

        const nameInput = await screen.findByLabelText('Name');
        await fireEvent.change(nameInput, {target:{value: 'test'}});

        const phoneInput = await screen.findByLabelText('Phone');
        await fireEvent.change(phoneInput, {target:{value: '9998887766'}});
        
        const addressInput = await screen.findByLabelText('Address');
        await fireEvent.change(addressInput, {target:{value: 'test'}});

        await fireEvent.click(screen.getByRole('button',{name: 'Checkout'}))

        expect(onSubmit).toHaveBeenCalled();
    });
});
