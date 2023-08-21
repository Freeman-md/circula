import { LoaderFunctionArgs, json } from "react-router-dom"
import ContactsService from "../lib/contacts-service"

export async function getContactLoader({ params }: LoaderFunctionArgs) {
    const docSnap = await ContactsService.fetchContact(params.id!)

    if (!docSnap.exists()) {
        throw json({ message: "Contact information not found" }, { status: 404 })
    }

    return json(docSnap.data(), { status: 200 })
}