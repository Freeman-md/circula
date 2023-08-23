import { Contact, GroupedContacts } from "../types";

export function generateProfilePhoto(firstName?: string, lastName?: string): string {
  return `https://ui-avatars.com/api/?name=${firstName?.substring(0, 1) || 'N'}+${lastName?.substring(0, 1) || 'A'}&color=FFFFFF&background=455A64`
}

export function groupAndSortContactsByFirstLetter(contacts: Contact[]): GroupedContacts {
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

export function isObjectEmpty(obj: object): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function createWrapperAndAppendToBody(wrapperId: string): HTMLElement {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}