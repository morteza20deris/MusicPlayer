import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useRef } from "react"
import { BsSearch } from "react-icons/bs"
import { searchInput } from "./DataStore"


export const Search = () => {
    const ref = useRef<HTMLInputElement>(null)
    const { setSearchText } = searchInput()
    return (
        <InputGroup>
            <Input onKeyDown={e => {
                if (e.key === "Enter") setSearchText(ref.current?.value)
            }} ref={ref} borderRadius={20} placeholder="Search..." variant="filled" />
            <InputLeftElement padding={1} children={<BsSearch />} />
        </InputGroup>


    )
}
