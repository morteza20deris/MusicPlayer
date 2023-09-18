import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useGlobalAudioPlayer } from "react-use-audio-player";
import hero from "../assets/hero.png";
import { musicPlayerData } from "./DataStore";
import DummyData from "./DummyData";
import { TrackProps } from "./Props";
import "./imageRotation.css";
import { MusicPlayer } from './MusicPlayer';


export const MusicList = ({ musicArray }: { musicArray?: TrackProps[] }) => {
    const { currentSong } = musicPlayerData()
    musicArray = DummyData.tracks.data //temporary for testing
    const player = useGlobalAudioPlayer()
    const { PlayMusic } = MusicPlayer()
    const [musicPos, setMusicPos] = useState(0)
    setInterval(() => setMusicPos(Math.floor(player.getPosition())), 1000)

    useEffect(() => {

    }, [currentSong])


    return (<>
        {musicArray.map((music, index) => {
            return (

                <HStack key={music.id} className="my-2">
                    <Image className={music.preview === player.src && player.playing ? "rotation-class" : ""} src={hero} boxSize={100} borderRadius={50} bgColor="white" />
                    <div>
                        <Text marginTop={0} fontSize={15}>{"Artist: " + music.artist.name}</Text>
                        <Text fontSize={25} marginTop={-5}>{music.title}</Text>
                    </div>
                    <Button onClick={() => {
                        if (index === currentSong && player.src) {
                            player.togglePlayPause()

                        } else {

                            PlayMusic({ newPlayList: musicArray, songIndex: index })
                        }

                    }}>
                        {currentSong === index ? (player.playing ? "Pause" : player.isLoading ? "Loading..." : "Play") : "Play"}
                    </Button>

                    {currentSong === index && player.playing && <Text marginTop={4}>{new Date(musicPos * 1000).toISOString().slice(14, 19)}</Text>}
                </HStack >
            )
        })}
    </>)


}
