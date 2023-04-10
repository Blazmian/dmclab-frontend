import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            navigate('/login')
        }
    }, [navigate])

    return isLoggedIn ? <>{children}</> : null
}

export function checkAuth() {
    const token = localStorage.getItem('token')
    return token !== null
}

export default Auth