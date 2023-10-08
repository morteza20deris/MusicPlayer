import { Box, Button, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import amplitude from "amplitudejs";
import { useEffect, useState } from 'react';
import { LuRepeat, LuRepeat1, LuShuffle } from "react-icons/lu";
import { MdGraphicEq } from "react-icons/md";
import DummyData from '../Services/DummyData';
import { useMusicPlayerData } from '../hooks/useDataStore';

export const MusicPlayerControls = () => {
    const [musicPos, setMusicPos] = useState(0)
    const { setIsPlaying, setReadyToPlay, readyToPlay } = useMusicPlayerData()
    // const percentageToMusicLength = (percentage: number) => (amplitude.getSongDuration() / 100) * percentage

    const getSeekPosFromMusic = amplitude.getSongDuration() ? ((1 - (((amplitude.getSongDuration()) - musicPos) / (amplitude.getSongDuration()))) * 100) : 0

    const [loopState, setLoopState] = useState(1)



    const loopClickHandler = () => {

        switch (loopState) {
            case 1:
                amplitude.setRepeatSong(true)
                // amplitude.setRepeatPlaylist("ancient_astronauts", false)
                setLoopState(2)

                break;
            case 2:
                // console.log("don");
                setLoopState(1)
                amplitude.setRepeatSong(false)


                break;
            default:
                break;
        }

    }

    useEffect(() => {
        const test = DummyData.tracks.data.filter(song => song.preview.length > 0)



        amplitude.init({
            songs: test.map(song => {

                return {
                    name: song.title,
                    artist: song.artist.name,
                    album: song.album.title,
                    url: song.preview,
                    cover_art_url: song.album.cover_medium,
                    id: song.id
                }


            }),
            playlists: {
                "ancient_astronauts": {
                    songs: [...Array(test.length).keys()],
                    title: 'Best of Ancient Astronauts'
                }
            },
            callbacks: {
                loadeddata: function () { setReadyToPlay(true) },
                loadstart: function () { setReadyToPlay(false) },
                ended: function () {
                    console.log("stopping");
                    amplitude.pause()
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    useEffect(() => {
        setInterval(() => setMusicPos(Math.round((amplitude.getSongPlayedSeconds() + Number.EPSILON) * 100) / 100), 10)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ position: 'fixed', bottom: "0", zIndex: 999, height: "32vh", maxHeight: "110px", width: "100vw" }}>

            <VStack align="start" height="100%" background="gray.900" >
                <HStack width="100%" alignContent="center" justifyContent="space-between">
                    <Text paddingStart="1%" paddingTop="-0.5" height="0">{new Date(musicPos * 1000).toISOString().slice(14, 19)}</Text>
                    <Text paddingEnd="1%" paddingTop="-0.5" height="0">{new Date((amplitude.getSongDuration() || 0) * 1000).toISOString().slice(14, 19)}</Text>
                </HStack>
                <Box paddingStart="2%" marginTop="4" width="97vw">
                    <Slider value={getSeekPosFromMusic} onChange={(e) => { amplitude.setSongPlayedPercentage(e) }} aria-label='slider-ex-4' defaultValue={0}>
                        <SliderTrack bg='red.100'>
                            <SliderFilledTrack bg='tomato' />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                            <Box color='tomato' as={MdGraphicEq} />
                        </SliderThumb>
                    </Slider>
                </Box>

                <HStack width="100vw" paddingX={6} alignContent="center" justifyContent="space-between" >
                    <Box>
                        <Button className='amplitude-prev' isActive={amplitude.getActiveIndex() === 0} >Previous</Button>
                    </Box>
                    <HStack>
                        <LuShuffle color={amplitude.getShuffle() === true && "green" || ""} onClick={() => setIsPlaying(amplitude.getPlayerState() === "playing" ? true : false)} className="amplitude-shuffle" size="20px" />
                        <Button onClick={() => {
                            console.log(amplitude.getSongsState());
                            console.log(amplitude.getShuffle());
                            setIsPlaying(amplitude.getPlayerState() === "playing" ? true : false)

                        }} className="amplitude-play-pause" >{amplitude.getPlayerState() === "playing" ? readyToPlay ? "Pause" : "Loading..." : "Play"}</Button>



                        {loopState === 1 && <LuRepeat color="green" onClick={loopClickHandler} size="20px" />}
                        {loopState === 2 && <LuRepeat1 color="green" onClick={loopClickHandler} size="20px" />}
                    </HStack>
                    <Button className='amplitude-next' data-amplitude-playlist="ancient_astronauts" >Next</Button>
                </HStack>
            </VStack>


        </div>
    )
}
