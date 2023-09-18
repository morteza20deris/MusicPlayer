import { useGlobalAudioPlayer } from "react-use-audio-player";
import { musicPlayerData } from "./DataStore";
import DummyData from "./DummyData";
import { TrackProps } from './Props';

export const MusicPlayer = () => {
    const { setCurrentSong, setNextSong, setPreviousSong, currentSong, playList, setPlayList } = musicPlayerData()
    const player = useGlobalAudioPlayer()


    const PlayPreviousMusic = () => {
        console.log("Playing Previous Song");
        const currentIndex = currentSong;
        setNextSong(currentIndex)
        setCurrentSong(currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex)
        setPreviousSong(currentIndex - 2 >= 0 ? currentIndex - 2 : currentIndex - 1)
        PlayMusic({ songIndex: currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex })
    }

    let test = 0
    const PlayMusic = ({ newPlayList, songIndex }: { newPlayList?: TrackProps[], songIndex?: number }) => {
        if (songIndex) test = songIndex
        console.log("Playing Current Song", test);

        setPlayList(newPlayList || DummyData.tracks.data)
        setCurrentSong(test)
        player.load(playList[test].preview, {
            html5: true, autoplay: true, format: "mp3", onend: () => {
                if (playList.length - 1 > test) test++

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


