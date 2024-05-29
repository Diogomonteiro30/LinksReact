import { auth } from '../services/firebaseConnection'
import {onAuthStateChanged} from 'firebase/auth'
import {ReactNode, useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateProps{
    children: ReactNode
}

export function Private({children}: PrivateProps): any{

    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    id: user.uid,                    
                    email: user.email,                    
                }
                localStorage.setItem('@links-fale:user', JSON.stringify(userData))
                setLoading(false)
                setIsAuthenticated(true)

            }else{
                setLoading(false)
                setIsAuthenticated(false)
            }
        })

        return () => {
            unsubscribe()
        }
        
    }, [])

        if(loading){
            return <div>Carregando...</div>
        }

        if(!isAuthenticated){
            return <Navigate to="/login"/>
        }
    
    return children;
}