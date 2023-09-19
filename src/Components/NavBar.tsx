import { HStack, Image, Switch, useColorMode } from "@chakra-ui/react"
import { useState } from "react"
import logo from "../assets/react.svg"
import { Search } from "./Search"
import "./styles/imageRotation.css"


const NavBar = () => {
    const [active, setActive] = useState(false)
    const { toggleColorMode } = useColorMode()

    return (
        <div style={{ position: "fixed", inset: "0", zIndex: 999, width: "100vw", height: "0px" }}>
            <HStack background="gray.900" marginEnd={3} justifyContent="space-between">
                <Image className="logo-rotation" padding={2} boxSize="60px" src={logo} />
                <Search />
                <Switch marginEnd={3} size="lg" onChange={() => {
                    toggleColorMode()
                    setActive(!active)
                }} isChecked={active} />
            </HStack>
        </div>
    )
}

export default NavBar