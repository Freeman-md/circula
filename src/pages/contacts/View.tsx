import { doc, getDoc } from "firebase/firestore/lite"
import { Link, LoaderFunctionArgs, json, useLoaderData } from "react-router-dom"

import { db } from "../../db/firebase"
import { generateProfilePhoto } from "../../utils"
import { Contact } from "../../types"
import { ReactComponent as Phone } from '../../assets/svgs/phone.svg'
import { ReactComponent as Envelope } from '../../assets/svgs/envelope.svg'
import { ReactComponent as QrCode } from '../../assets/svgs/qr-code.svg'
import Jumbotron from "../../components/Jumbotron"

const View = () => {
    const contact = useLoaderData() as Contact

    const profilePhotoURL = generateProfilePhoto(contact.firstName, contact.lastName)

    return <div className="container py-10 space-y-4">
        <Link to="/" className="fixed top-4 right-4 text-blue-500 transition duration-200 hover:text-blue-700">Edit</Link>
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

            <button className="px-6 py-2 flex flex-col items-center justify-center space-y-1 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mr-10">
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
            <p>{contact.address ?? 'N/A'}</p>
        </Jumbotron>

        <Jumbotron>
            <p className="text-sm">Company</p>
            <p>{contact.company ?? 'N/A'}</p>
        </Jumbotron>

        <Jumbotron>
            <p className="text-sm">Notes</p>
            <p>{contact.notes ?? 'N/A'}</p>
        </Jumbotron>

        <Jumbotron as="button" className="w-full !text-red-500 !font-medium text-left">
            <p>Delete this contact</p>
        </Jumbotron>
    </div>
}

export default View

export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.id

    const docRef = doc(db, 'contacts', 'y3nEStpbp0RoPo2uyTRi')
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        throw json({ message: "Contact information not found" }, { status: 404 })
    }

    return json(docSnap.data(), { status: 200 })
}