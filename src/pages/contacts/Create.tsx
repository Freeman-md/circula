import { ActionFunctionArgs, Form, json, redirect, useNavigation } from "react-router-dom"
import { CountryCode } from 'libphonenumber-js/types';

import useInput from "../../hooks/useInput"
import {  IContact } from "../../types"
import { showSnackbar } from "../../store/ui/uiActions"
import { SnackbarTypes } from "../../store/ui/uiSlice"
import { store } from "../../store"
import PlacesAutoComplete from '../../components/PlacesAutoComplete'
import PhoneNumberInput from "../../components/PhoneNumberInput"
import ContactsService from "../../lib/contacts-service";
import ToggleButton from "../../components/ToggleButton";

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

            <div className="form-control">
                <label htmlFor="first_name">First name <span className="text-red-500">*</span></label>
                <input type="hidden" name="first_name_visibility" value={firstName.visibility.toString()} />
                <input type="text" name="first_name" id="first_name" value={firstName.value} onChange={firstNameOnChangeHandler} />
                {!firstName.isValid && firstName.error && <small className="text-red-500">{firstName.error}</small>}

                <div className="mt-2">
                    <ToggleButton initialVisibility={firstName.visibility} onToggle={(value) => toggleFirstNameVisibility(value)} />
                </div>
            </div>

            <div className="form-control">
                <label htmlFor="last_name">Last name <span className="text-red-500">*</span></label>
                <input type="hidden" name="last_name_visibility" value={lastName.visibility.toString()} />
                <input type="text" name="last_name" id="last_name" value={lastName.value} onChange={lastNameOnChangeHandler} />
                {!lastName.isValid && lastName.error && <small className="text-red-500">{lastName.error}</small>}

                <div className="mt-2">
                    <ToggleButton initialVisibility={lastName.visibility} onToggle={(value) => toggleLastNameVisibility(value)} />
                </div>
            </div>

            <div className="form-control">
                <label htmlFor="email">Email address <span className="text-red-500">*</span></label>
                <input type="hidden" name="email_visibility" value={email.visibility.toString()} />
                <input type="email" name="email" id="email" value={email.value} onChange={emailOnChangeHandler} />
                {!email.isValid && email.error && <small className="text-red-500">{email.error}</small>}

                <div className="mt-2">
                    <ToggleButton initialVisibility={email.visibility} onToggle={(value) => toggleEmailVisibility(value)} />
                </div>
            </div>

            <div className="form-control">
                <label htmlFor="phone">Phone number <span className="text-red-500">*</span></label>
                <input type="hidden" name="phone_visibility" value={phone.visibility.toString()} />
                <PhoneNumberInput countryCode='GB' value={phone.value} onChange={phoneOnChangeHandler} />
                {!phone.isValid && phone.error && <small className="text-red-500">{phone.error}</small>}

                <div className="mt-2">
                    <ToggleButton initialVisibility={phone.visibility} onToggle={(value) => togglePhoneVisibility(value)} />
                </div>
            </div>

            <div className="form-control col-span-2">
                <label htmlFor="company">Company / Organization</label>
                <input type="hidden" name="company_visibility" value={company.visibility.toString()} />
                <PlacesAutoComplete name="company" value={company.value} onChange={companyOnChangeHandler} types={['establishment']} />
                {
                    !company.isValid && company.error
                        ? <small className="text-red-500">{company.error}</small>
                        : <small>Powered by Google</small>
                }

                <div className="mt-2">
                    <ToggleButton initialVisibility={company.visibility} onToggle={(value) => toggleCompanyVisibility(value)} />
                </div>
            </div>

            <div className="form-control col-span-2">
                <label htmlFor="address">Address</label>
                <input type="hidden" name="address_visibility" value={address.visibility.toString()} />
                <PlacesAutoComplete name="address" value={address.value} onChange={addressOnChangeHandler} />
                {
                    !address.isValid && address.error
                        ? <small className="text-red-500">{address.error}</small>
                        : <small>Powered by Google</small>
                }

                <div className="mt-2">
                    <ToggleButton initialVisibility={address.visibility} onToggle={(value) => toggleAddressVisibility(value)} />
                </div>
            </div>

            <div className="form-control col-span-2">
                <label htmlFor="notes">Notes</label>
                <input type="hidden" name="notes_visibility" value={notes.visibility.toString()} />
                <textarea rows={3} id="notes" name="notes" value={notes.value} onChange={notesOnChangeHandler} />
                {!notes.isValid && notes.error && <small className="text-red-500">{notes.error}</small>}

                <div className="mt-2">
                    <ToggleButton initialVisibility={notes.visibility} onToggle={(value) => toggleNotesVisibility(value)} />
                </div>
            </div>

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