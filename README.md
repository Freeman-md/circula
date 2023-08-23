# Circula - A Modern Contact Manager

Circula is a sophisticated contact manager built using React, TypeScript, and cutting-edge technologies like Redux, React Router, and React Hooks. It serves as a versatile tool for managing professional and casual connections, enabling seamless sharing of contact details using QR codes.


![Home Page](/public/images/home.png)

## Motivation

The inspiration behind Circula came from a real-life scenario where the need to share contact information seamlessly arose. By creating this application, I aimed to provide users with a simple yet powerful solution to share their contact details, both publicly and privately.

## Key Features

- View, search, and sort contacts based on various criteria.
- Group contacts for better organization.
- View detailed contact information, including home and company addresses.
- Perform actions such as copying contact details, calling, and emailing.
- Cloud Firestore integration for reliable data storage and real-time updates.
- Utilization of Google Places API for easy address input.
- Support for phone numbers with country codes.
- Integrated authentication for private access.
- PWA functionality for offline access and usage.

#### View Contact
![View Contact](/public/images/view-contact.png)

## Technology Stack

- React and TypeScript for building a modern user interface.
- Redux for state management and handling complex interactions.
- React Router for efficient navigation within the app.
- React Hooks (useCallback, useMemo) for optimizing performance.
- React Portal for creating a smooth user experience.
- Cloud Firestore for data storage and real-time updates.

## Installation and Usage

1. Clone the repository.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Run the app locally using `npm start`.
4. Access the app through your browser at `http://localhost:3000`.

## How to Use

1. Log in to access your personalized contact list.
2. Add, edit, or delete contacts as needed.
3. Group contacts and sort them by first name for better organization.
5. Others can scan the QR code to instantly access the shared information.

## Additional Features (Version 2)

- Enhanced sharing options: public and private fields.
- Unlimited custom fields with various data types.
- Secure personal contact information sharing.
- Offline support

## Challenges and Learnings

During development, I encountered challenges with dispatching Redux actions from route actions and loaders. I successfully resolved this by utilizing the exported store object. Additionally, I faced minor difficulties in structuring files within directories, but I managed to overcome this obstacle.

## Contribution Guidelines

If you're interested in contributing to Circula, please send me a message on twitter @ [Freemancodz](https://twitter.com/freemancodz). Your contributions are highly appreciated and will help make the project even better.

## Video Demonstration

Check out this short video to see Circula in action: [Video Demonstration](https://www.mediafire.com/file/mwochf11q11cdpw/Screen_Recording_2023-08-23_at_9.30.51_PM.mov/file)