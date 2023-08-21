import { ReactNode } from 'react'
import { useAppSelector } from '../hooks/useReduxHooks'
import Guest from './Guest'

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({ children } : ProtectedRouteProps) => {
    const user = useAppSelector(state => state.user.user)

    if (!user) return <Guest />

    return <>
        { children }
    </>
}

export default ProtectedRoute