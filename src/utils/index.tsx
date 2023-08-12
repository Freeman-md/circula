import { Contact, GroupedContacts } from "../types";

export function generateProfilePhoto(firstName: string, lastName?: string) {
    return `https://ui-avatars.com/api/?name=${firstName.substring(0, 1)}+${lastName?.substring(0, 1)}&color=FFFFFF&background=455A64`
}

  