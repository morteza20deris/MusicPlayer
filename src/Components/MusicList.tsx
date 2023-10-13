import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import AddLikedSongToDB from "../Services/AddLikedSongToDB";
import DeleteLikedSongFormDB from "../Services/DeleteLikedSongFormDB";
import { OnUserSignIN } from "../Services/OnUserSignIn";
import hero from "../assets/hero.png";
import { useLikedSongs, useMusicPlayerData } from "../hooks/useDataStore";
import { AmplitudeSongProps } from "./Props";
import "./styles/imageRotation.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import amplitude from "amplitudejs";


export const MusicList = ({ musicToDisplay }: { musicToDisplay: AmplitudeSongProps[] }) => {
    const { likedSongs, setLikedSongs } = useLikedSongs()
    const { isAuthenticated } = OnUserSignIN()
    const { setIsPlaying, readyToPlay, playList } = useMusicPlayerData()





    return (<Box marginBottom="15vh">
        {musicToDisplay?.map((music, songIndex) => {
            return (

                <HStack fontSize="30" key={music.id} marginY="10px">
                    <Image className={music.id === amplitude.getActiveSongMetadata().id && amplitude.getPlayerState() === "playing" ? "rotation-class" : ""} src={music.cover_art_url || hero} boxSize="15%" maxH="100px" maxW="100px" borderRadius="50%" bgColor="white" />
                    <div>
                        <Text w="100%" fontSize="50%">{"Artist: " + music.artist}</Text>
                        <Text w={{ base: "47vw", lg: "30vw" }} fontSize={{ base: "60%", lg: "100%" }} marginTop="1%">{music.name}</Text>
                    </div>

                    //play Button
                    <Button onClick={() => {
                        if (amplitude.getPlayerState() === "playing" && music.id === amplitude.getActiveSongMetadata().id) {
                            amplitude.pause()
                            console.log(1);

                        } else if (music.id === amplitude.getActiveSongMetadata().id) {
                            amplitude.play()
                            console.log(2);

                        } else {
                            console.log("3");

                            amplitude.stop()
                            amplitude.playPlaylistSongAtIndex(songIndex, playList)


                        }

                        setIsPlaying(amplitude.getPlayerState() === "playing" ? true : false)
                    }} size="md" >
                        {music.id === amplitude.getActiveSongMetadata().id ? (amplitude.getPlayerState() === "playing" ? readyToPlay ? "Pause" : "Loading..." : "Play") : "Play"}
                    </Button>

                    {/* {music.preview === player.src && player.playing && <Text marginTop={4}>{new Date(musicPos * 1000).toISOString().slice(14, 19)}</Text>} */}
                    {likedSongs.find((song) => song.id == music.id) ? <BsFillHeartFill onClick={() => {
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
    </Box>)


}
