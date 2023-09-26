import { Box, Button, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdGraphicEq } from "react-icons/md";
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { MusicPlayer } from '../hooks/useMusicPlayer';
import { useMusicPlayerData } from '../hooks/useDataStore';

export const MusicPlayerControls = () => {
    const { currentSong } = useMusicPlayerData()
    const { togglePlayPause, playing, getPosition, duration, seek } = useGlobalAudioPlayer()
    const { PlayNextMusic, PlayPreviousMusic } = MusicPlayer()
    const [musicPos, setMusicPos] = useState(0)

    const percentageToMusicLength = (percentage: number) => (duration / 100) * percentage

    const getSeekPosFromMusic = duration ? ((1 - (((duration) - musicPos) / (duration))) * 100) : 0

    useEffect(() => {
        setInterval(() => setMusicPos(Math.round((getPosition() + Number.EPSILON) * 100) / 100), 10)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ position: 'fixed', bottom: "0", zIndex: 999, height: "25vh", maxHeight: "100px", width: "100vw" }}>

            <VStack height="100%" background="gray.900" >
                <Box width="97vw">
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
                    <Button isActive={currentSong === 0} onClick={() => {
                        PlayPreviousMusic()
                        // console.log("clicked previous");

                    }} >Previous</Button>
                    <Button onClick={() => togglePlayPause()}>{playing ? "Pause" : "Play"}</Button>
                    <Button onClick={() => {
                        PlayNextMusic()
                    }} >Next</Button>
                </HStack>
            </VStack>


        </div>
    )
}
