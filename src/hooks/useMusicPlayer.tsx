import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useMusicPlayerData } from "./useDataStore";
// import DummyData from "../Services/DummyData";
import { TrackProps } from '../Components/Props';

export const MusicPlayer = () => {
    const { setCurrentSong, setNextSong, setPreviousSong, currentSong, playList, setPlayList, setCurrentMusicID, looping, singleLooping } = useMusicPlayerData()
    const player = useGlobalAudioPlayer()


    const PlayPreviousMusic = () => {
        console.log("Playing Previous Song");
        const currentIndex = currentSong;
        setNextSong(currentIndex)
        setCurrentSong(currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex)
        setPreviousSong(currentIndex - 2 >= 0 ? currentIndex - 2 : currentIndex - 1)
        PlayMusic({ songIndex: currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex })
    }

    let currentIndex = 0
    let currentPlaylist = [] as TrackProps[]
    const PlayMusic = async ({ newPlayList, songIndex }: { newPlayList?: TrackProps[], songIndex?: number }) => {
        if (currentPlaylist.length > 0 && !currentPlaylist[currentIndex].preview) currentIndex++
        if (songIndex) currentIndex = songIndex
        if (newPlayList) currentPlaylist = newPlayList


        setCurrentSong(currentIndex)
        if (!newPlayList && playList.length > 0) { currentPlaylist = playList }
        else if (!playList && newPlayList && newPlayList.length > 0) {
            setPlayList(newPlayList)
        }

        if (currentPlaylist.length > 0) setCurrentMusicID(currentPlaylist[currentIndex].id)
        console.log("Playing Current Song", currentIndex, currentPlaylist.length - 1);
        console.log(currentPlaylist[currentIndex]);
        // console.log("looping: ", looping);



        console.log(currentIndex, singleLooping);

        if (playList) player.load(currentPlaylist[currentIndex].preview, {
            html5: true, autoplay: true, format: "mp3", onend: () => {
                if (!singleLooping && currentPlaylist.length - 1 > currentIndex) currentIndex++
                if (!singleLooping && looping && currentIndex === currentPlaylist.length - 1) currentIndex = 0
                PlayMusic({})
            }
        })
    }

    const PlayNextMusic = () => {
        currentIndex = currentSong
        if (currentSong < playList.length - 1) {
            setPreviousSong(currentIndex)
            // console.log("Playing Next Music");
            setCurrentSong(currentIndex + 1 <= playList.length - 1 ? currentIndex + 1 : currentIndex)
            setNextSong(currentIndex + 2 <= playList.length - 1 ? currentIndex + 2 : currentIndex + 1)
            currentIndex++
            // console.log(currentSong);
        } else if (looping) {
            currentIndex = 0
            setPreviousSong(currentIndex)
            setCurrentSong(currentIndex)
            setNextSong(currentIndex + 1)
        }


        PlayMusic({ songIndex: currentIndex })

    }
    return { PlayNextMusic, PlayPreviousMusic, PlayMusic }
}


