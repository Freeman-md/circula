import { ActionFunctionArgs, Form, json, redirect, useNavigation } from "react-router-dom"
import { CountryCode } from 'libphonenumber-js/types';

import useInput from "../../hooks/useInput"
import { IContact } from "../../types"
import { showSnackbar } from "../../store/ui/uiActions"
import { SnackbarTypes } from "../../store/ui/uiSlice"
import { store } from "../../store"
import ContactsService from "../../lib/contacts-service";
import FormInput from "../../components/FormInput";
import FormPhoneNumberInput from "../../components/FormPhoneNumberInput";
import FormPlacesAutoComplete from "../../components/FormPlacesAutoComplete";
import FormTextAreaInput from "../../components/FormTextAreaInput";

const Create = () => {
    //eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //eslint-disable-next-line
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    const navigation = useNavigation()

    const isFormSubmitting = navigation.state === 'submitting'

    const { state: firstName, eventOnChangeHandler: firstNameOnChangeHandler, toggleFieldVisibilityHandler: toggleFirstNameVisibility } = useInput('', true, (value: string) => value.length !== 0, 'Please enter a first name', true)
    const { state: lastName, eventOnChangeHandler: lastNameOnChangeHandler, toggleFieldVisibilityHandler: toggleLastNameVisibility } = useInput('', true, (value: string) => value.length !== 0, 'Please enter a last name', true)
    const { state: email, eventOnChangeHandler: emailOnChangeHandler, toggleFieldVisibilityHandler: toggleEmailVisibility } = useInput('', true, (value: string) => emailRegex.test(value), 'Please enter a valid email address', true)
    const { state: phone, valueOnChangeHandler: phoneOnChangeHandler, toggleFieldVisibilityHandler: togglePhoneVisibility } = useInput('', true, (value: string) => phoneRegex.test(value), 'Please enter a valid phone number', true)
    const { state: company, valueOnChangeHandler: companyOnChangeHandler, toggleFieldVisibilityHandler: toggleCompanyVisibility } = useInput('', true)
    const { state: address, valueOnChangeHandler: addressOnChangeHandler, toggleFieldVisibilityHandler: toggleAddressVisibility } = useInput('', true)
    const { state: notes, eventOnChangeHandler: notesOnChangeHandler, toggleFieldVisibilityHandler: toggleNotesVisibility } = useInput('', true)

    const formIsValid: boolean = firstName.isValid && lastName.isValid && email.isValid && phone.isValid && company.isValid && address.isValid && notes.isValid


    return <div className="py-10 container space-y-6">
        <h1 className="text-3xl font-semibold text-secondary">Create contact</h1>

        <Form method="post" className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:w-3/4">

            <FormInput
                label="First name"
                name="first_name"
                type="text"
                value={firstName.value}
                onChange={firstNameOnChangeHandler}
                isValid={firstName.isValid}
                error={firstName.error}
                toggleVisibility={toggleFirstNameVisibility}
                visibility={firstName.visibility}
            />

            <FormInput
                label="Last name"
                name="last_name"
                type="text"
                value={lastName.value}
                onChange={lastNameOnChangeHandler}
                isValid={lastName.isValid}
                error={lastName.error}
                toggleVisibility={toggleLastNameVisibility}
                visibility={lastName.visibility}
            />

            <FormInput
                label="Email address"
                name="email"
                type="email"
                value={email.value}
                onChange={emailOnChangeHandler}
                isValid={email.isValid}
                error={email.error}
                toggleVisibility={toggleEmailVisibility}
                visibility={email.visibility}
            />

            <FormPhoneNumberInput
                label="Phone number"
                name="phone"
                value={phone.value}
                onChange={phoneOnChangeHandler}
                isValid={phone.isValid}
                error={phone.error}
                toggleVisibility={togglePhoneVisibility}
                visibility={phone.visibility}
            />

            <FormPlacesAutoComplete
                label="Company / Organization"
                name="company"
                value={company.value}
                onChange={companyOnChangeHandler}
                isValid={company.isValid}
                error={company.error}
                toggleVisibility={toggleCompanyVisibility}
                visibility={company.visibility}
                required={false}
            />

            <FormPlacesAutoComplete
                label="Address"
                name="address"
                value={address.value}
                onChange={addressOnChangeHandler}
                isValid={address.isValid}
                error={address.error}
                toggleVisibility={toggleAddressVisibility}
                visibility={address.visibility}
                required={false}
            />

            <FormTextAreaInput 
                label="Notes"
                name="notes"
                value={notes.value}
                onChange={notesOnChangeHandler}
                isValid={notes.isValid}
                error={notes.error}
                toggleVisibility={toggleNotesVisibility}
                visibility={notes.visibility}
                required={false}
            />

            <div className="col-span-2 pt-4">
                <button disabled={!formIsValid || isFormSubmitting} className="btn">
                    {!isFormSubmitting ? 'Create' : 'Submitting...'}
                </button>
            </div>

        </Form>
    </div>
}

export default Create

export async function action({ request }: ActionFunctionArgs) {
    const data: FormData = await request.formData()

    const contactData: IContact = {
        firstName: {
            value: data.get('first_name')?.toString() ?? '',
            visibility: data.get('first_name_visibility') === 'true'
        },
        lastName: {
            value: data.get('last_name')?.toString() ?? '',
            visibility: data.get('last_name_visibility') === 'true'
        },
        email: {
            value: data.get('email')?.toString() ?? '',
            visibility: data.get('email_visibility') === 'true'
        },
        countryCode: {
            value: (data.get('country-code')?.toString() ?? '') as CountryCode,
            visibility: data.get('phone_visibility') === 'true'
        },
        phone: {
            value: data.get('phone')?.toString() ?? '',
            visibility: data.get('phone_visibility') === 'true'
        },
        company: {
            value: data.get('company')?.toString() ?? '',
            visibility: data.get('company_visibility') === 'true'
        },
        address: {
            value: data.get('address')?.toString() ?? '',
            visibility: data.get('address_visibility') === 'true'
        },
        notes: {
            value: data.get('notes')?.toString() ?? '',
            visibility: data.get('notes_visibility') === 'true'
        },
    }

    try {
        const contact = await ContactsService.createContact(contactData)

        store.dispatch(showSnackbar({
            type: SnackbarTypes.Success,
            content: 'Contact created successfully!'
        }))

        return redirect(`/${contact?.id}`)
    } catch (error: any) {
        store.dispatch(showSnackbar({
            type: SnackbarTypes.Error,
            content: 'An error has occurred'
        }))

        throw json({ message: error.message })
    }
}