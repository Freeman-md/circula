import { FormEvent } from "react"
import useInput from "../../hooks/useInput"
import { useAppDispatch } from "../../hooks/useReduxHooks"
import { createContact } from "../../store/contacts/contactsActions"
import { Contact } from "../../types"

const Create = () => {
    const dispatch = useAppDispatch()

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    const { state: firstName, valueOnChangeHandler: firstNameOnChangeHandler, clearInput: clearFirstNameInput } = useInput((value: string) => value.length !== 0, 'Please enter a first name', true)
    const { state: lastName, valueOnChangeHandler: lastNameOnChangeHandler, clearInput: clearLastNameInput } = useInput((value: string) => value.length !== 0, 'Please enter a last name', true)
    const { state: email, valueOnChangeHandler: emailOnChangeHandler, clearInput: clearEmailInput } = useInput((value: string) => emailRegex.test(value), 'Please enter a valid email address', true)
    const { state: phone, valueOnChangeHandler: phoneOnChangeHandler, clearInput: clearPhoneInput } = useInput((value: string) => phoneRegex.test(value), 'Please enter a valid phone number', true)
    const { state: company, valueOnChangeHandler: companyOnChangeHandler, clearInput: clearCompanyInput } = useInput()
    const { state: address, valueOnChangeHandler: addressOnChangeHandler, clearInput: clearAddressInput } = useInput()
    const { state: notes, valueOnChangeHandler: notesOnChangeHandler, clearInput: clearNotesInput } = useInput()

    const formIsValid: boolean = firstName.isValid && lastName.isValid && email.isValid && phone.isValid && company.isValid && address.isValid && notes.isValid

    const clearInputs = () => {
        clearFirstNameInput()
        clearLastNameInput()
        clearEmailInput()
        clearPhoneInput()
        clearCompanyInput()
        clearAddressInput()
        clearNotesInput()
    }

    const createContactHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const contact: Contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            company: company.value,
            address: address.value,
            notes: notes.value
        }

        await dispatch(createContact(contact))

        clearInputs()
    }


    return <div className="py-10 container space-y-6">
        <h1 className="text-5xl font-semibold text-secondary">Create contact</h1>

        <form onSubmit={createContactHandler} className="grid grid-cols-2 gap-6 w-3/4">

            <div className="form-control">
                <label htmlFor="first_name">First name <span className="text-red-500">*</span></label>
                <input type="text" name="first_name" id="first_name" value={firstName.value} onChange={firstNameOnChangeHandler} />
                {!firstName.isValid && firstName.error && <small className="text-red-500">{firstName.error}</small>}
            </div>

            <div className="form-control">
                <label htmlFor="last_name">Last name <span className="text-red-500">*</span></label>
                <input type="text" name="last_name" id="last_name" value={lastName.value} onChange={lastNameOnChangeHandler} />
                {!lastName.isValid && lastName.error && <small className="text-red-500">{lastName.error}</small>}
            </div>

            <div className="form-control">
                <label htmlFor="email">Email address <span className="text-red-500">*</span></label>
                <input type="email" name="email" id="email" value={email.value} onChange={emailOnChangeHandler} />
                {!email.isValid && email.error && <small className="text-red-500">{email.error}</small>}
            </div>

            <div className="form-control">
                <label htmlFor="phone">Phone number <span className="text-red-500">*</span></label>
                <input type="text" name="phone" id="phone" value={phone.value} onChange={phoneOnChangeHandler} />
                {!phone.isValid && phone.error && <small className="text-red-500">{phone.error}</small>}
            </div>

            <div className="form-control col-span-2">
                <label htmlFor="company">Company / Organization</label>
                <input type="text" name="company" id="company" value={company.value} onChange={companyOnChangeHandler} />
                {!company.isValid && company.error && <small className="text-red-500">{company.error}</small>}
            </div>

            <div className="form-control col-span-2">
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" value={address.value} onChange={addressOnChangeHandler} />
                {!address.isValid && address.error && <small className="text-red-500">{address.error}</small>}
            </div>

            <div className="form-control col-span-2">
                <label htmlFor="notes">Notes</label>
                <textarea rows={3} id="notes" name="notes" value={notes.value} onChange={notesOnChangeHandler} />
                {!notes.isValid && notes.error && <small className="text-red-500">{notes.error}</small>}
            </div>

            <div className="col-span-2 pt-4">
                <button disabled={!formIsValid} className="btn">Create</button>
            </div>

        </form>
    </div>
}

export default Create