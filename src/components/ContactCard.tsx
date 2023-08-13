import { Contact } from "../types"
import { generateProfilePhoto } from "../utils"

const ContactCard = ({ contact }: { contact: Contact }) => {
    const profilePhotoURL = generateProfilePhoto(contact.firstName, contact.lastName)

    return (
        <div className="flex space-x-4 items-center -mx-2 p-3.5 transition duration-200 bg-transparent hover:bg-secondary/10 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-gray-200 bg-cover bg-center" style={{
                backgroundImage: `url(${profilePhotoURL})`,
            }}></div>
            <p>
                {contact.firstName} {contact.lastName}
            </p>
        </div>
    )
}

export default ContactCard