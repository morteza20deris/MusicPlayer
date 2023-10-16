import { Box, Button, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import amplitude from "amplitudejs";
import { useEffect, useState } from 'react';
import { LuRepeat, LuRepeat1, LuShuffle } from "react-icons/lu";
import { MdGraphicEq } from "react-icons/md";
import { useMusicPlayerData } from '../hooks/useDataStore';

export const MusicPlayerControls = () => {
    const [musicPos, setMusicPos] = useState(0)
    const { setIsPlaying, readyToPlay, playList } = useMusicPlayerData()
    const [shuffleState, setShuffleState] = useState(false)
    // const percentageToMusicLength = (percentage: number) => (amplitude.getSongDuration() / 100) * percentage

    const getSeekPosFromMusic = amplitude.getSongDuration() ? ((1 - (((amplitude.getSongDuration()) - musicPos) / (amplitude.getSongDuration()))) * 100) : 0

    const [loopState, setLoopState] = useState(1)



    const loopClickHandler = () => {

        switch (loopState) {
            case 1:
                amplitude.setRepeatSong(true)
                amplitude.setRepeat(false)
                setLoopState(2)

                break;
            case 2:
                setLoopState(1)
                amplitude.setRepeatSong(false)
                amplitude.setRepeat(true)
                break;
            default:
                break;
        }

    }


    useEffect(() => {
        setInterval(() => setMusicPos(Math.round((amplitude.getSongPlayedSeconds() + Number.EPSILON) * 100) / 100), 10)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ position: 'fixed', bottom: "0", zIndex: 999, height: "32vh", maxHeight: "110px", width: "100vw" }}>

            <VStack align="start" height="100%" background="gray.900" >

                // Track Timing
                <HStack width="100%" alignContent="center" justifyContent="space-between">
                    <Text paddingStart="3%" paddingTop="-0.5" height="0">{new Date(musicPos * 1000).toISOString().slice(14, 19)}</Text>
                    <Text paddingEnd="3%" paddingTop="-0.5" height="0">{new Date((amplitude.getSongDuration() || 0) * 1000).toISOString().slice(14, 19)}</Text>
                </HStack>

                // Track Slider
                <Box paddingStart="3%" marginTop="4" width="100%" paddingEnd="3%">
                    <Slider value={getSeekPosFromMusic} onChange={(e) => { amplitude.setSongPlayedPercentage(e) }} aria-label='slider-ex-4' defaultValue={0}>
                        <SliderTrack bg='red.100'>
                            <SliderFilledTrack bg='tomato' />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                            <Box color='tomato' as={MdGraphicEq} />
                        </SliderThumb>
                    </Slider>
                </Box>

                // Music Player Buttons
                <HStack width="100vw" paddingX="3%" alignContent="center" justifyContent="space-between" >

                    <Button className='amplitude-prev' isActive={amplitude.getActiveIndex() === 0} >Previous</Button>

                    <HStack>
                        <LuShuffle className="amplitude-shuffle" color={shuffleState === true ? "green" : ""} onClick={() => {

                            setShuffleState(!shuffleState)
                            setIsPlaying(amplitude.getPlayerState() === "playing" ? true : false)
                        }} size="20px" />

                        <Button className="amplitude-play-pause" onClick={() => {

                            setIsPlaying(amplitude.getPlayerState() === "playing" ? true : false)
                            console.log(amplitude.getRepeatPlaylist(playList));

                        }}>{amplitude.getPlayerState() === "playing" ? readyToPlay ? "Pause" : "Loading..." : "Play"}</Button>

                        {loopState === 1 && <LuRepeat color="green" onClick={loopClickHandler} size="20px" />}
                        {loopState === 2 && <LuRepeat1 color="green" onClick={loopClickHandler} size="20px" />}

                    </HStack>

                    <Button className='amplitude-next' >Next</Button>

                </HStack>
            </VStack>


        </div>
    )
}
