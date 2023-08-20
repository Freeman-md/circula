import { ActionFunctionArgs, Link, redirect, useRouteLoaderData, useSubmit } from "react-router-dom"
import { useState } from "react"

import { generateProfilePhoto } from "../../utils"
import { Contact } from "../../types"
import { ReactComponent as Phone } from '../../assets/svgs/phone.svg'
import { ReactComponent as Envelope } from '../../assets/svgs/envelope.svg'
import { ReactComponent as QrCode } from '../../assets/svgs/qr-code.svg'
import Jumbotron from "../../components/Jumbotron"
import contactsService from "../../lib/firebase"
import { store } from "../../store"
import { showSnackbar } from "../../store/ui/uiActions"
import { SnackbarTypes, toggleModal } from "../../store/ui/uiSlice"
import { useAppDispatch } from "../../hooks/useReduxHooks"

const View = () => {
    const contact = useRouteLoaderData('get-contact') as Contact
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const submit = useSubmit()

    const dispatch = useAppDispatch()

    const profilePhotoURL = generateProfilePhoto(contact.firstName, contact.lastName)

    const deleteConfirmationHandler = () => setShowDeleteConfirmation(prevState => !prevState)

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

        submit(
            null, {
            method: 'post',
        })
    }

    const openModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(toggleModal({
            modal: {
                qrcodeValue: `${window.location.origin}/share/${contact.id}`
            }
        }))
    }

    return <div className="container py-10 space-y-4">
        <Link to="edit" className="fixed z-10 top-4 right-4 text-blue-500 transition duration-200 hover:text-blue-700">Edit</Link>

        <div className="flex flex-col space-y-2 items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-gray-200 bg-cover bg-center" style={{
                backgroundImage: `url(${profilePhotoURL})`,
            }}></div>
            <p className="text-xl font-semibold">
                {contact.firstName} {contact.lastName}
            </p>
        </div>

        <div className="w-full flex flex-wrap items-center justify-center">
            <a href={`tel:${contact.phone}`} className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mr-10">
                <Phone className="w-6" />
                <p className="text-sm px-2">Call</p>
            </a>

            <a href={`mailto:${contact.email}`} className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mr-10">
                <Envelope className="w-6" />
                <p className="text-sm px-2">Mail</p>
            </a>

            <button onClick={openModalHandler} className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mr-10">
                <QrCode className="w-6" />
                <p className="text-sm px-2">Share</p>
            </button>
        </div>

        <Jumbotron as="a" href={`tel:${contact.phone}`}>
            <p className="text-sm">Phone</p>
            <p className="text-blue-500">{contact.phone}</p>
        </Jumbotron>

        <Jumbotron>
            <p className="text-sm">Address</p>
            <p>{contact.address || 'N/A'}</p>
        </Jumbotron>

        <Jumbotron>
            <p className="text-sm">Company</p>
            <p>{contact.company || 'N/A'}</p>
        </Jumbotron>

        <Jumbotron>
            <p className="text-sm">Notes</p>
            <p>{contact.notes || 'N/A'}</p>
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
}

export default View

export async function action({ request, params }: ActionFunctionArgs) {
    const id = params.id!

    await contactsService.deleteContact(id)

    store.dispatch(showSnackbar({
        type: SnackbarTypes.Success,
        content: 'Contact deleted successfully!'
    }))

    return redirect('/')
}