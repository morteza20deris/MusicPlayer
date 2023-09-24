import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useMusicPlayerData } from "./useDataStore";
// import DummyData from "../Services/DummyData";
import { TrackProps } from '../Components/Props';

export const MusicPlayer = () => {
    const { setCurrentSong, setNextSong, setPreviousSong, currentSong, playList, setPlayList, setCurrentMusicID } = useMusicPlayerData()
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
        if (songIndex) currentIndex = songIndex
        if (newPlayList) currentPlaylist = newPlayList


        setCurrentSong(currentIndex)
        if (!newPlayList && playList.length > 0) { currentPlaylist = playList }
        else if (!playList && newPlayList && newPlayList.length > 0) {
            setPlayList(newPlayList)
        }

        if (currentPlaylist.length > 0) setCurrentMusicID(currentPlaylist[currentIndex].id)
        console.log("Playing Current Song", currentIndex);
        // console.log(newPlayList[test].preview);



        if (playList) player.load(currentPlaylist[currentIndex].preview, {
            html5: true, autoplay: true, format: "mp3", onend: () => {
                if (currentPlaylist.length - 1 > currentIndex) currentIndex++

                // console.log(test);
                PlayMusic({})
            }
        })
    }

    const PlayNextMusic = () => {
        const currentIndex = currentSong
        setPreviousSong(currentIndex)
        // console.log("Playing Next Music");
        setCurrentSong(currentIndex + 1 <= playList.length - 1 ? currentIndex + 1 : currentIndex)
        setNextSong(currentIndex + 2 <= playList.length - 1 ? currentIndex + 2 : currentIndex + 1)
        // console.log(currentSong);

        PlayMusic({ songIndex: currentIndex + 1 <= playList.length - 1 ? currentIndex + 1 : currentIndex })

    }
    return { PlayNextMusic, PlayPreviousMusic, PlayMusic }
}


