import { ReactNode } from 'react'
import { useAppSelector } from '../hooks/useReduxHooks'
import Guest from './Guest'
import { UsageModes } from '../store/userSlice'

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute = ({ children } : ProtectedRouteProps) => {
    const user = useAppSelector(state => state.user.user)
    const usageMode = useAppSelector(state => state.user.mode)

    if (usageMode === UsageModes.Neutral && !user) return <Guest />

    return <>
        { children }
    </>
}

export default ProtectedRoute