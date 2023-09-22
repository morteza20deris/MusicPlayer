import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Authentication } from "../Configs/Firebase"

export const OnUserSignIN = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        const SignInState = onAuthStateChanged(Authentication, async (user) => {
            setIsAuthenticated(!!user)
        })

        return ()=>{SignInState()}
    }, [])
    return {isAuthenticated}
}
