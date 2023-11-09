import { ActionFunctionArgs, Link, json, redirect, useRouteLoaderData, useSubmit } from "react-router-dom"
import { useState } from "react"
import QRCode from 'qrcode.react';
import { parsePhoneNumber } from "libphonenumber-js";

import { generateProfilePhoto } from "../../utils"
import { IContact } from "../../types"
import { ReactComponent as Phone } from '../../assets/svgs/phone.svg'
import { ReactComponent as Envelope } from '../../assets/svgs/envelope.svg'
import { ReactComponent as QrCode } from '../../assets/svgs/qr-code.svg'
import Jumbotron from "../../components/Jumbotron"
import Modal from "../../components/Modal"
import { store } from "../../store"
import { showSnackbar } from "../../store/ui/uiActions"
import { SnackbarTypes } from "../../store/ui/uiSlice"
import ContactsService from "../../lib/contacts-service";
import ToggleButton from "../../components/ToggleButton";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";

const View = () => {
    const contact = useRouteLoaderData('get-contact') as IContact
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const submit = useSubmit()

    const profilePhotoURL = generateProfilePhoto(contact.firstName.value, contact.lastName.value)
    const parsedPhoneNumber = (parsePhoneNumber(contact.phone.value, contact.countryCode.value)).number
    const shareQrCodeValue = `${window.location.origin}/share/${contact.id}`

    const deleteConfirmationHandler = () => setShowDeleteConfirmation(prevState => !prevState)

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

        submit(
            null, {
            method: 'post',
        })
    }

    const toggleModalHandler = () => {
        setIsModalOpen(prevState => !prevState)
    }

    const toggleFieldVisibility = async (value: boolean, property: keyof IContact) => {
        // Check if the property is an object with a 'visibility' property
        if (typeof contact[property] === 'object') {
            // Type assertion to inform TypeScript about the property type
            (contact[property] as { value: string; visibility: boolean }).visibility = value;
        }

        // update contact details
        await ContactsService.updateContact(contact);
    };

    return <>
        <div className="container py-10 space-y-4 relative">
            <Link to="edit" className="absolute top-20 right-6 text-blue-500 transition duration-200 hover:text-blue-700">Edit</Link>

            <div className="flex flex-col space-y-2 items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-gray-200 bg-cover bg-center" style={{
                    backgroundImage: `url(${profilePhotoURL})`,
                }}></div>
                <p className="text-xl font-semibold">
                    {contact.firstName.value} {contact.lastName.value}
                </p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-center space-x-4">
                <a href={`tel:${contact.phone.value}`} className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mb-4">
                    <Phone className="w-6" />
                    <p className="text-sm px-2">Call</p>
                </a>

                <a href={`mailto:${contact.email.value}`} className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mb-4">
                    <Envelope className="w-6" />
                    <p className="text-sm px-2">Mail</p>
                </a>

                <button onClick={toggleModalHandler} className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mb-4">
                    <QrCode className="w-6" />
                    <p className="text-sm px-2">Share</p>
                </button>
            </div>

            <Jumbotron as="a" href={`tel:${parsedPhoneNumber}`} toggleButton={<ToggleButton key={contact.phone.visibility.toString()} initialVisibility={contact.phone.visibility} onToggle={(value) => toggleFieldVisibility(value, 'phone')} />}>
                <p className="text-sm">Phone</p>
                <p className="text-blue-500">{`${parsedPhoneNumber}`}</p>
            </Jumbotron>


            <Jumbotron toggleButton={<ToggleButton key={contact.address.visibility.toString()} initialVisibility={contact.address.visibility} onToggle={(value) => toggleFieldVisibility(value, 'address')} />}>
                <p className="text-sm">Address</p>
                <p>{contact.address.value || 'N/A'}</p>
            </Jumbotron>

            <Jumbotron toggleButton={<ToggleButton key={contact.company.visibility.toString()} initialVisibility={contact.company.visibility} onToggle={(value) => toggleFieldVisibility(value, 'company')} />}>
                <p className="text-sm">Company</p>
                <p>{contact.company.value || 'N/A'}</p>
            </Jumbotron>

            <Jumbotron toggleButton={<ToggleButton key={contact.notes.visibility.toString()} initialVisibility={contact.notes.visibility} onToggle={(value) => toggleFieldVisibility(value, 'notes')} />}>
                <p className="text-sm">Notes</p>
                <p>{contact.notes.value || 'N/A'}</p>
            </Jumbotron>

            <Jumbotron as="button" className="w-full !text-red-500 !font-medium text-left" onClick={deleteConfirmationHandler}>
                Delete this contact
            </Jumbotron>

            {
                showDeleteConfirmation && <div className="w-3/4 sm:w-1/2 mx-auto grid grid-cols-2 gap-6">
                    <Jumbotron as="button" className="w-full !bg-red-500 !text-white !font-medium text-center" onClick={deleteHandler}>
                        Confirm!
                    </Jumbotron>
                    <Jumbotron as="button" className="w-full !text-red-500 !font-medium text-center" onClick={deleteConfirmationHandler}>
                        Cancel
                    </Jumbotron>
                </div>
            }
        </div>
        <Modal isOpen={isModalOpen} onClose={toggleModalHandler}>
            <div className='flex flex-col justify-center items-center pb-4'>
                <h2 className="text-2xl font-semibold mb-4 text-center">Scan QR Code</h2>
                <div className="flex flex-col items-center justify-center space-y-2">
                    <QRCode value={shareQrCodeValue} size={250} />
                    <CopyToClipboardButton value={shareQrCodeValue} />
                </div>
            </div>
        </Modal>

    </>
}

export default View

export async function action({ request, params }: ActionFunctionArgs) {
    const id = params.id!

    try {
        await ContactsService.deleteContact(id)

        store.dispatch(showSnackbar({
            type: SnackbarTypes.Success,
            content: 'Contact deleted successfully!'
        }))

        return redirect('/')
    } catch (error: any) {
        store.dispatch(showSnackbar({
            type: SnackbarTypes.Error,
            content: 'An error has occurred'
        }))

        throw json({ message: error.message })
    }
}