import { Box, Button, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, VStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdGraphicEq } from "react-icons/md";
import { LuShuffle, LuRepeat1, LuRepeat } from "react-icons/lu";
import { TbRepeatOff } from "react-icons/tb";
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { MusicPlayer } from '../hooks/useMusicPlayer';
import { useMusicPlayerData } from '../hooks/useDataStore';

export const MusicPlayerControls = () => {
    const { currentSong, playList, setPlayList, setLooping, setSingleLooping, singleLooping } = useMusicPlayerData()
    const { togglePlayPause, playing, getPosition, duration, seek } = useGlobalAudioPlayer()
    const { PlayNextMusic, PlayPreviousMusic } = MusicPlayer()
    const [musicPos, setMusicPos] = useState(0)

    const percentageToMusicLength = (percentage: number) => (duration / 100) * percentage

    const getSeekPosFromMusic = duration ? ((1 - (((duration) - musicPos) / (duration))) * 100) : 0
    const [loopState, setLoopState] = useState(0)
    const shuffleClickHandler = () => {
        setPlayList(playList.sort(() => Math.random() - 0.5))
    }

    const loopClickHandler = () => {

        switch (loopState) {
            case 0:
                setLoopState(1)
                setLooping(true)

                break;
            case 1:
                setLoopState(2)
                setLooping(false)

                setSingleLooping(true)

                break;
            case 2:
                console.log("don");
                setLoopState(0)

                setSingleLooping(false)

                break;
            default:
                break;
        }

    }

    useEffect(() => {

        console.log("MPCLooping: ", loopState, singleLooping);

    }, [singleLooping])

    useEffect(() => {
        setInterval(() => setMusicPos(Math.round((getPosition() + Number.EPSILON) * 100) / 100), 10)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ position: 'fixed', bottom: "0", zIndex: 999, height: "32vh", maxHeight: "110px", width: "100vw" }}>

            <VStack align="start" height="100%" background="gray.900" >
                <HStack width="100%" alignContent="center" justifyContent="space-between">
                    <Text paddingStart="1%" paddingTop="-0.5" height="0">{new Date(musicPos * 1000).toISOString().slice(14, 19)}</Text>
                    <Text paddingEnd="1%" paddingTop="-0.5" height="0">{new Date(duration * 1000).toISOString().slice(14, 19)}</Text>
                </HStack>
                <Box paddingStart="2%" marginTop="4" width="97vw">
                    <Slider onChange={(e) => {
                        seek(percentageToMusicLength(e))
                    }} value={getSeekPosFromMusic} aria-label='slider-ex-4' defaultValue={0}>
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
                        <Button isActive={currentSong === 0} onClick={() => {
                            PlayPreviousMusic()
                            // console.log("clicked previous");
                        }} >Previous</Button>
                    </Box>
                    <HStack>
                        <LuShuffle onClick={shuffleClickHandler} size="20px" />
                        <Button onClick={() => togglePlayPause()}>{playing ? "Pause" : "Play"}</Button>

                        {loopState === 0 && <TbRepeatOff onClick={loopClickHandler} size="20px" />}
                        {loopState === 1 && <LuRepeat color="green" onClick={loopClickHandler} size="20px" />}
                        {loopState === 2 && <LuRepeat1 color="green" onClick={loopClickHandler} size="20px" />}
                    </HStack>
                    <Button onClick={() => {
                        PlayNextMusic()
                    }} >Next</Button>
                </HStack>
            </VStack>


        </div>
    )
}
