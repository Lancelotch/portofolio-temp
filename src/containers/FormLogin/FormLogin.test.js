import React from 'react';
import { mount } from 'enzyme';
import FormLogin from './index';
import {useRootContext} from '../../hoc/RootContext';

describe("containers form login", () => {
    describe("given empty email", () => {
        it("should show error email required", () => {
            const RootContext = useRootContext();
            const dispatch = () => {return null};
            const wrapper = mount(
                <RootContext>
                    <FormLogin />
                </RootContext>
            )

            const email = wrapper.find('FormLogin');
            expect(email.length).toBe(1);
        })
    })
    //TODO:RISET UNIT TEST

})