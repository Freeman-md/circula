import { NavLink } from "react-router-dom";
import { Contact } from "../types";
import { generateProfilePhoto } from "../utils";

const ContactCard = ({ contact }: { contact: Contact }) => {
    const profilePhotoURL = generateProfilePhoto(contact.firstName, contact.lastName);

    const cardBaseClassName = "flex space-x-4 items-center -mx-2 p-3.5";
    const activeCardClassName = `${cardBaseClassName} bg-secondary/20`;
    const inactiveCardClassName = `${cardBaseClassName} transition duration-200 bg-transparent hover:bg-secondary/10 cursor-pointer`;

    return (
        <NavLink
            to={`/${contact.id}`}
            className={({ isActive }) => isActive ? activeCardClassName : inactiveCardClassName}
        >
            <div
                className="h-10 w-10 rounded-full bg-gray-200 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${profilePhotoURL})`,
                }}
            ></div>
            <p>
                {contact.firstName} {contact.lastName}
            </p>
        </NavLink>
    );
};

export default ContactCard;
