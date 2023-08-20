import React, { useState, useLayoutEffect, ReactNode, FC } from 'react';
import { createPortal } from 'react-dom';
import { createWrapperAndAppendToBody } from '../utils';

interface ReactPortalProps {
    children: ReactNode;
    wrapperId: string;
}

const ReactPortal: FC<ReactPortalProps> = ({ children, wrapperId }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);

        return () => {
            // delete the programmatically created element
            if (systemCreated && element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    if (!wrapperElement) {
        return null; // Return null or a loading indicator while waiting for the element to be created
    }

    return createPortal(children, wrapperElement);
};

export default ReactPortal;
