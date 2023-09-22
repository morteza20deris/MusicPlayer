import { UserCredential, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from "react";
import { Authentication, googleProvider } from '../Configs/Firebase';

const useUserAuthentication = () => {
  const [user, setUser] = useState<UserCredential>()

    const Login = async () => {
        await signInWithPopup(Authentication,googleProvider).then(user=>setUser(user))
    }

    

    

    const logOut = () => {
        signOut(Authentication)
    }

    return {user,logOut,Login}
}

export default useUserAuthentication