import { useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';

import { toggleModal } from '../store/ui/uiSlice';
import ReactPortal from './ReactPortal';

const Modal = () => {
    const dispatch = useAppDispatch()
    const isModalOpen = useAppSelector(state => state.ui.modal.show)

    console.log('component re-rendered')

    const closeModalHandler = useCallback(
        () => {
            dispatch(
                toggleModal()
            )
        },
        [dispatch],
    )


    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? closeModalHandler() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [closeModalHandler]);

    if (!isModalOpen) return null;

    return (
        <ReactPortal wrapperId='overlay-root'>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-gray-800 opacity-60" onClick={closeModalHandler}></div>
                <div className="relative z-10 p-4 bg-white rounded-md shadow-md">
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        onClick={closeModalHandler}
                    >
                        Close
                    </button>
                    <div>

                    </div>
                </div>
            </div>
        </ReactPortal>
    );
};

export default Modal;