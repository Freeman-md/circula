import { AnimatePresence, motion } from "framer-motion"

import { ReactComponent as CheckCircle } from '../assets/svgs/check-circle.svg'
import { ReactComponent as InformationCircle } from '../assets/svgs/information-circle.svg'
import { ReactComponent as XCircle } from '../assets/svgs/x-circle.svg'
import { useAppSelector } from '../hooks/useReduxHooks'
import { SnackbarTypes } from '../store/ui/uiSlice'

const Snackbar = () => {
    let snackbarContainerClasses: string = 'bg-white px-4 py-2.5 rounded border border-b-2 flex space-x-4 items-center justify-center'
    let snackbarIconClasses: string = 'w-6'
    const snackbarType: SnackbarTypes = useAppSelector(state => state.ui.snackbar.type)
    const snackbarContent: string = useAppSelector(state => state.ui.snackbar.content)

    switch (snackbarType) {
        case SnackbarTypes.Error:
            snackbarContainerClasses += ' border-b-red-500'
            snackbarIconClasses += ' text-red-500'
            break
        case SnackbarTypes.Success:
            snackbarContainerClasses += ' border-b-green-500'
            snackbarIconClasses += ' text-green-500'
            break
        case SnackbarTypes.Warning:
            snackbarContainerClasses += ' border-b-orange-500'
            snackbarIconClasses += ' text-orange-500'
            break
        default:
            break;
    }

    const snackbarIcon = snackbarType === SnackbarTypes.Error
        ? <XCircle className={snackbarIconClasses} />
        : snackbarType === SnackbarTypes.Success
            ? <CheckCircle className={snackbarIconClasses} />
            : snackbarType === SnackbarTypes.Warning
                ? <InformationCircle className={snackbarIconClasses} />
                : <></>

    return <>{
        snackbarType && snackbarContent &&
        <div className='right-4 top-4 fixed z-50'>
            <motion.div initial={{ x: 104 }}
                animate={{ x: 0 }}
                exit={{ x: 104 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
                className={snackbarContainerClasses}>
                {snackbarIcon}
                <p>{snackbarContent}</p>
            </motion.div>
        </div>
    }</>
}

export default Snackbar