import { LoaderFunctionArgs, json } from "react-router-dom"
import ContactsService from "../lib/contacts-service"
import { Contact } from "../types"

export async function getContactLoader({ params }: LoaderFunctionArgs) {
    const docSnap = await ContactsService.fetchContact(params.id!)

    if (!docSnap.exists()) {
        throw json({ message: "Contact information not found" }, { status: 404 })
    }

    return json({
        id: docSnap.id,
        ...docSnap.data() as Contact
    }, { status: 200 })
}