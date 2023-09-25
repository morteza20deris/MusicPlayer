import { HStack, Image, Link, Switch, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Authentication } from '../Configs/Firebase';
import logo from "../assets/react.svg";
import useUserAuthentication from '../hooks/useUserAuthentication';
import { Search } from "./Search";
import "./styles/imageRotation.css";
import { OnUserSignIN } from '../Services/OnUserSignIn';
import { useLikedSongs } from '../hooks/useDataStore';

const NavBar = () => {
    const [active, setActive] = useState(false)
    const { toggleColorMode } = useColorMode()
    const { Login, logOut, user } = useUserAuthentication()
    const [first, setFirst] = useState(false)
    const { setLikedSongs } = useLikedSongs()

    const { isAuthenticated } = OnUserSignIN()
    useEffect(() => {
        setFirst(!first)
        console.log("NavBar StateChange");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])



    return (
        <div style={{ position: "fixed", inset: "0", zIndex: 999, width: "100vw", height: "0px" }}>
            <HStack background="gray.900" marginEnd={3} justifyContent="space-between">
                <Image className="logo-rotation" padding={2} boxSize="60px" src={logo} />
                <Search />
                <Switch marginEnd={1} size="lg" onChange={() => {
                    toggleColorMode()
                    setActive(!active)
                }} isChecked={active} />
                {isAuthenticated ?
                    <Link>
                        <Image
                            style={{ fontSize: 50 }}
                            marginEnd="50px"
                            boxSize={50}
                            borderRadius={100}
                            src={user?.user.photoURL || Authentication.currentUser?.photoURL || undefined}
                            alt='User Picture'
                            onClick={() => {
                                logOut()
                                setTimeout(() => {
                                    setLikedSongs([])
                                }, 0);
                            }}
                        />
                    </Link> :
                    <Link isExternal={isAuthenticated ? false : true}>
                        <BiUserCircle
                            style={{ marginRight: "10px", fontSize: "50px" }}
                            size="50"
                            onClick={() => Login()}
                        />
                    </Link>}
            </HStack>
        </div>
    )
}

export default NavBar