import { useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { motion } from "framer-motion";
import QRCode from 'qrcode.react';


import { toggleModal } from '../store/ui/uiSlice';
import ReactPortal from './ReactPortal';
import { ReactComponent as XCircle } from '../assets/svgs/x-circle.svg'

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const Modal = () => {
    const dispatch = useAppDispatch()
    const isModalOpen = useAppSelector(state => state.ui.modal.show)
    const qrcodeValue = useAppSelector(state => state.ui.modal.qrcodeValue)

    const closeModalHandler = useCallback(
        () => {
            dispatch(
                toggleModal({
                    modal: {
                        qrcodeValue: ''
                    }
                })
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
            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-gray-800 opacity-60" onClick={closeModalHandler}></div>
                <motion.div className="relative z-10 p-4 bg-white rounded-md shadow-md w-2/3 sm:w-1/2 space-y-4" variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                    <button
                        className="absolute top-2 right-2 transition duration-200 text-gray-600 hover:text-black"
                        onClick={closeModalHandler}
                    >
                        <XCircle strokeWidth={2} className='w-6' />
                    </button>
                    <div className='flex flex-col justify-center items-center pb-4'>
                        <h2 className="text-2xl font-semibold mb-4 text-center">Scan QR Code</h2>
                        <QRCode value={qrcodeValue} size={400} />
                    </div>
                </motion.div>
            </motion.div>
        </ReactPortal>
    );
};

export default Modal;