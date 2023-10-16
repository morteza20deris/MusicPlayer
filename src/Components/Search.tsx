import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect, useRef, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { SearchMusicByArtist } from "../Services/MusicServices";
import { useMusicPlayerData } from "../hooks/useDataStore";
import { AmplitudeSongProps } from "./Props";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import amplitude from 'amplitudejs';
import getAmplitudeDataFromDeezer from "../Services/getAmplitudeDataFromDeezer";


export const Search = () => {
    const ref = useRef<HTMLInputElement>(null)
    const { setMusicToDisplay, setReadyToPlay, setPlayList } = useMusicPlayerData()
    const [first, setFirst] = useState(0)
    const deezerDataFromSearch = SearchMusicByArtist({ artistName: ref.current?.value || "" })


    useEffect(() => {
        if (deezerDataFromSearch.data && !deezerDataFromSearch.data.error && ref.current) {
            const amplitudeDataFromDeezerSearch = getAmplitudeDataFromDeezer(deezerDataFromSearch.data.data)

            setMusicToDisplay(amplitudeDataFromDeezerSearch as AmplitudeSongProps[])
            setPlayList(ref.current.value)
            amplitude.addPlaylist(ref.current?.value, {
                callbacks: {
                    loadeddata: function () { setReadyToPlay(true) },
                    loadstart: function () { setReadyToPlay(false) },
                    ended: function () {
                        amplitude.pause()
                    }
                }
            }, amplitudeDataFromDeezerSearch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [first, deezerDataFromSearch.data])

    // const { setMusicToDisplay } = useMusicPlayerData()
    return (
        <InputGroup>
            <Input onKeyDown={e => {
                if (e.keyCode == 13) {
                    setFirst(first + 1)
                }
            }} ref={ref} borderRadius={20} placeholder="Search..." variant="filled" />
            <InputLeftElement padding={1} children={<BsSearch />} />
        </InputGroup>


    )
}
