// import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useMusicPlayerData } from "./useDataStore";
import { TrackProps } from '../Components/Props';
import { useEffect } from 'react';

const useMusicPlayer = () => {
    const { setCurrentSong, setNextSong, setPreviousSong, currentSong, playList, setPlayList, setCurrentMusicID, readyToPlay: singleLooping } = useMusicPlayerData()
    // const player = useGlobalAudioPlayer()
    // let currentIndex = -1
    // let currentPlaylist = [] as TrackProps[]

    useEffect(() => {
        console.log("useMusicPlayer", "newLoop:", "newSingleLoop:" + singleLooping);
        console.log("playList:", playList.length);
        console.log("currentSong:", currentSong);

        // const musicPos = player.getPosition()

        if (playList.length > 0 && currentSong > -1) {
            console.log("Playing Music");

            // player.load(playList[currentSong].preview, {
            //     html5: true, autoplay: true, loop: singleLooping, format: "mp3", onend: onEndHandler
            // })
            // player.seek(musicPos)

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong, playList, singleLooping])


    const PlayPreviousMusic = () => {
        console.log("Playing Previous Song");
        const currentIndex = currentSong;
        setNextSong(currentIndex)
        setCurrentSong(currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex)
        setPreviousSong(currentIndex - 2 >= 0 ? currentIndex - 2 : currentIndex - 1)
        PlayMusic({ songIndex: currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex })
    }

    // function onEndHandler() {
    //     console.log("useMusicPlayer/PlayMusic:", "newLoop: " + looping, "newSingleLoop:" + singleLooping);
    //     if (!singleLooping && looping && playList.length - 1 > currentSong) {
    //         setCurrentSong(currentSong + 1)
    //         // PlayMusic({})
    //     }
    //     if (!singleLooping && looping && currentSong === playList.length - 1) {
    //         setCurrentSong(0)
    //         // PlayMusic({})
    //     }
    //     if (singleLooping) {
    //         // PlayMusic({})
    //     }
    // }


    const PlayMusic = ({ newPlayList, songIndex }: { newPlayList?: TrackProps[], songIndex?: number }) => {

        if (songIndex) setCurrentSong(songIndex)
        if (newPlayList) setPlayList(newPlayList)

        if (newPlayList && songIndex) setCurrentMusicID(newPlayList[songIndex].id)
        // console.log("Playing Current Song", currentIndex, currentPlaylist.length - 1);
        // console.log(currentPlaylist[currentIndex]);
        // console.log("looping: ", looping);



        // console.log(currentIndex, singleLooping);


    }

    const PlayNextMusic = () => {
        // currentIndex = currentSong
        // if (currentSong < playList.length - 1) {
        //     setPreviousSong(currentIndex)
        //     // console.log("Playing Next Music");
        //     setCurrentSong(currentIndex + 1 <= playList.length - 1 ? currentIndex + 1 : currentIndex)
        //     setNextSong(currentIndex + 2 <= playList.length - 1 ? currentIndex + 2 : currentIndex + 1)
        //     currentIndex++
        //     // console.log(currentSong);
        // } else if (looping) {
        //     currentIndex = 0
        //     setPreviousSong(currentIndex)
        //     setCurrentSong(currentIndex)
        //     setNextSong(currentIndex + 1)
        // }


        // PlayMusic({ songIndex: currentIndex })

    }
    return { PlayNextMusic, PlayPreviousMusic, PlayMusic }
}


export default useMusicPlayer