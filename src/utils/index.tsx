import { Contact, GroupedContacts } from "../types";

export function generateProfilePhoto(firstName: string, lastName?: string) {
    return `https://ui-avatars.com/api/?name=${firstName.substring(0, 1)}+${lastName?.substring(0, 1)}&color=FFFFFF&background=455A64`
}

export function groupAndSortContactsByFirstLetter(contacts: Contact[]) {
    const groupedContacts: GroupedContacts = {};
  
    contacts.forEach(contact => {
      const firstLetter = contact.firstName[0].toUpperCase();
      if (!groupedContacts[firstLetter]) {
        groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
    });
  
    const sortedGroupedContacts: GroupedContacts = {};
    Object.keys(groupedContacts).sort().forEach(key => {
      sortedGroupedContacts[key] = groupedContacts[key].sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
    });
  
    return sortedGroupedContacts;
  }
  