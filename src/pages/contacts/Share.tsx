import { Link, useLoaderData } from "react-router-dom"

import { generateProfilePhoto } from "../../utils"
import { Contact } from "../../types"
import { ReactComponent as Phone } from '../../assets/svgs/phone.svg'
import { ReactComponent as Envelope } from '../../assets/svgs/envelope.svg'
import Jumbotron from "../../components/Jumbotron"

const Share = () => {
    const contact = useLoaderData() as Contact

    const profilePhotoURL = generateProfilePhoto(contact.firstName, contact.lastName)

    return <div className="container py-10 space-y-4">

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
    </div>
}

export default Share