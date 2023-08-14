import useInput from "../../hooks/useInput"
import { Contact } from "../../types"
import { ActionFunctionArgs, Form, redirect, useNavigation, useRouteLoaderData } from "react-router-dom"
import contactsService from "../../lib/firebase"

const Edit = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    const contact = useRouteLoaderData('get-contact') as Contact

    const navigation = useNavigation()

    const isFormSubmitting = navigation.state === 'submitting'

    const { state: firstName, valueOnChangeHandler: firstNameOnChangeHandler } = useInput(contact.firstName, (value: string) => value.length !== 0, 'Please enter a first name', true)
    const { state: lastName, valueOnChangeHandler: lastNameOnChangeHandler } = useInput(contact.lastName, (value: string) => value.length !== 0, 'Please enter a last name', true)
    const { state: email, valueOnChangeHandler: emailOnChangeHandler } = useInput(contact.email, (value: string) => emailRegex.test(value), 'Please enter a valid email address', true)
    const { state: phone, valueOnChangeHandler: phoneOnChangeHandler } = useInput(contact.phone, (value: string) => phoneRegex.test(value), 'Please enter a valid phone number', true)
    const { state: company, valueOnChangeHandler: companyOnChangeHandler } = useInput(contact.company)
    const { state: address, valueOnChangeHandler: addressOnChangeHandler } = useInput(contact.address)
    const { state: notes, valueOnChangeHandler: notesOnChangeHandler } = useInput(contact.notes)

    const formIsValid: boolean = firstName.isValid && lastName.isValid && email.isValid && phone.isValid && company.isValid && address.isValid && notes.isValid

    return <div className="py-10 container space-y-6">
        <h1 className="text-3xl font-semibold text-secondary">Edit contact</h1>

        <Form method="post" className="grid grid-cols-2 gap-6 w-3/4">

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
                <button disabled={!formIsValid || isFormSubmitting} className="btn">
                { !isFormSubmitting ? 'Update' : 'Submitting...' }
                </button>
            </div>

        </Form>
    </div>
}

export default Edit

export async function action({ request, params }: ActionFunctionArgs) {
    const contactId = params.id
    const data: FormData = await request.formData()

    const contactData: Contact = {
        id: contactId,
        firstName: data.get('first_name')?.toString() ?? '',
        lastName: data.get('last_name')?.toString() ?? '',
        email: data.get('email')?.toString() ?? '',
        phone: data.get('phone')?.toString() ?? '',
        company: data.get('company')?.toString() ?? '',
        address: data.get('address')?.toString() ?? '',
        notes: data.get('notes')?.toString() ?? ''
    }

    await contactsService.updateContact(contactData)

    console.log('Contact updated with ID: ' + contactData.id)

    return redirect(`/${contactId}`)
}