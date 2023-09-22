import { HStack, Image, Link, Switch, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Authentication } from '../Configs/Firebase';
import logo from "../assets/react.svg";
import useUserAuthentication from '../hooks/useUserAuthentication';
import { Search } from "./Search";
import "./styles/imageRotation.css";
import { OnUserSignIN } from '../hooks/OnUserSignIN';

const NavBar = () => {
    const [active, setActive] = useState(false)
    const { toggleColorMode } = useColorMode()
    const { Login, logOut, user } = useUserAuthentication()
    const [first, setfirst] = useState(false)

    const { isAuthenticated } = OnUserSignIN()
    useEffect(() => {
        setfirst(!first)
    }, [isAuthenticated])




    return (
        <div style={{ position: "fixed", inset: "0", zIndex: 999, width: "100vw", height: "0px" }}>
            <HStack background="gray.900" marginEnd={3} justifyContent="space-between">
                <Image className="logo-rotation" padding={2} boxSize="60px" src={logo} />
                <Search />
                <Switch marginEnd={3} size="lg" onChange={() => {
                    toggleColorMode()
                    setActive(!active)
                }} isChecked={active} />
                {isAuthenticated ? <Link><Image className='me-4 ms-2' boxSize={50} borderRadius={100} onClick={() => logOut()} src={user?.user.photoURL || Authentication.currentUser?.photoURL} alt='User Picture' /></Link> :
                    <Link><BiUserCircle onClick={() => Login()} className="me-3" size="50" /></Link>}

            </HStack>
        </div>
    )
}

export default NavBar