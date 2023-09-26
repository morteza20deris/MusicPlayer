import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import AddLikedSongToDB from "../Services/AddLikedSongToDB";
import DeleteLikedSongFormDB from "../Services/DeleteLikedSongFormDB";
import { OnUserSignIN } from "../Services/OnUserSignIn";
import hero from "../assets/hero.png";
import { useLikedSongs, useMusicPlayerData } from "../hooks/useDataStore";
import { MusicPlayer } from '../hooks/useMusicPlayer';
import { TrackProps } from "./Props";
import "./styles/imageRotation.css";


export const MusicList = ({ musicArray }: { musicArray: TrackProps[] }) => {
    const { currentMusicID } = useMusicPlayerData()
    const { likedSongs, setLikedSongs } = useLikedSongs()
    const player = useGlobalAudioPlayer()
    const { PlayMusic } = MusicPlayer()
    const [musicPos, setMusicPos] = useState(0)
    const { isAuthenticated } = OnUserSignIN()
    const { setPlayList } = useMusicPlayerData()


    useEffect(() => {
        setInterval(() => setMusicPos(Math.floor(player.getPosition())), 1000)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (<>
        {musicArray.map((music, index) => {
            if (music.preview) return (

                <HStack fontSize="30" key={music.id} marginY="10px">
                    <Image className={music.preview === player.src && player.playing ? "rotation-class" : ""} src={music.album.cover_small || hero} boxSize="15%" maxH="100px" maxW="100px" borderRadius="50%" bgColor="white" />
                    <div>
                        <Text w="100%" fontSize="50%">{"Artist: " + music.artist.name}</Text>
                        <Text w={{ base: "47vw", lg: "30vw" }} fontSize={{ base: "60%", lg: "100%" }} marginTop="1%">{music.title}</Text>
                    </div>
                    <Button size="md" onClick={() => {
                        if (music.id === currentMusicID && player.src) {
                            player.togglePlayPause()

                        } else {

                            PlayMusic({ newPlayList: musicArray, songIndex: index })
                            setPlayList(musicArray)

                        }

                    }}>
                        {music.id === currentMusicID ? (player.playing ? "Pause" : player.isLoading ? "Loading..." : "Play") : "Play"}
                    </Button>

                    {music.preview === player.src && player.playing && <Text marginTop={4}>{new Date(musicPos * 1000).toISOString().slice(14, 19)}</Text>}
                    {likedSongs.find((song) => song.id == music.id) ? <BsFillHeartFill size={{}} onClick={() => {
                        DeleteLikedSongFormDB(music.id)
                        setLikedSongs(likedSongs.filter(song => song.id !== music.id))
                    }} color="green" /> : <BsHeart onClick={() => {
                        if (isAuthenticated) {
                            setLikedSongs([...likedSongs, music])
                            AddLikedSongToDB(music)
                        } else {
                            console.log("Please LogIn First");

                        }
                    }} />}
                </HStack >
            )
        })}
    </>)


}
