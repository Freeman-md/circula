import { useLoaderData } from "react-router-dom"

import { generateProfilePhoto } from "../../utils"
import { ContactModel } from "../../types"
import { ReactComponent as Phone } from '../../assets/svgs/phone.svg'
import { ReactComponent as Envelope } from '../../assets/svgs/envelope.svg'
import Jumbotron from "../../components/Jumbotron"
import { useEffect } from "react"
import ContactsService from "../../lib/contacts-service"

const Share = () => {
    const contact = useLoaderData() as ContactModel

    const profilePhotoURL = generateProfilePhoto(contact.firstName.value, contact.lastName.value)

    useEffect(() => {
        ContactsService.deleteSharedContact(contact.id!)
    })

    return <><div className="container py-10 space-y-4">

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            Shared contact links can only be used once. Please ensure you have the necessary details before closing the tab.
        </div>

        <div className="flex flex-col space-y-2 items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-gray-200 bg-cover bg-center" style={{
                backgroundImage: `url(${profilePhotoURL})`,
            }}></div>
            <p className="text-xl font-semibold">
                {contact.firstName.visibility && contact.firstName.value} {contact.lastName.visibility && contact.lastName.value}
            </p>
        </div>

        <div className="w-full flex flex-wrap items-center justify-center">
            {
                contact.phone.visibility && <a href={`tel:${contact.phone.value}`} className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mx-5">
                    <Phone className="w-6" />
                    <p className="text-sm px-2">Call</p>
                </a>
            }

            {
                contact.email.visibility && <a href={`mailto:${contact.email.value}`} className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mx-5">
                    <Envelope className="w-6" />
                    <p className="text-sm px-2">Mail</p>
                </a>
            }
        </div>

        {
            contact.phone.visibility && <Jumbotron as="a" href={`tel:${contact.phone.value}`}>
                <p className="text-sm">Phone</p>
                <p className="text-blue-500">{contact.phone.value}</p>
            </Jumbotron>
        }

        {
            contact.address.visibility && <Jumbotron>
                <p className="text-sm">Address</p>
                <p>{contact.address.value || 'N/A'}</p>
            </Jumbotron>
        }

        {
            contact.company.visibility && <Jumbotron>
                <p className="text-sm">Company</p>
                <p>{contact.company.value || 'N/A'}</p>
            </Jumbotron>
        }

        {
            contact.notes.visibility && <Jumbotron>
                <p className="text-sm">Notes</p>
                <p>{contact.notes.value || 'N/A'}</p>
            </Jumbotron>
        }
    </div>

        <footer className='fixed bottom-2 inset-x-0'>
            <p className='text-center text-sm'>
                Designed & Developed by <a className='underline text-base font-medium' href="https://freemancodz.netlify.app">Freemancodz</a>
            </p>
        </footer>
    </>
}

export default Share