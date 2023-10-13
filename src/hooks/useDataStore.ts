import { create } from "zustand"
// import DummyData from "../Services/DummyData"
import { AmplitudeSongProps } from "../Components/Props"
import TopGenreEndPoints from "../Services/TopGenreEndPoints"

interface searchInputProps{
    searchText: string
    setSearchText:(text:string|undefined)=>void
}

interface MusicPlayerProps{
    playList: string
    setPlayList:(playList:string)=>void
    currentSong:number
    setCurrentSong:(currentSong:number)=>void
    previousSong: number
    setPreviousSong:(previousSong:number)=>void
    nextSong: number
    setNextSong: (nextSong: number) => void
    currentMusicID: number
    setCurrentMusicID: (CurrentMusicID: number) => void
    isPlaying: boolean
    setIsPlaying: (newIsPlaying: boolean) => void
    readyToPlay: boolean
    setReadyToPlay: (newReadyToPlay: boolean) => void
    
}

interface LikedSongsProps{
    likedSongs: AmplitudeSongProps[]
    setLikedSongs:(likedSongs:AmplitudeSongProps[])=>void
}

export const useSearchInputData = create<searchInputProps>((set) => ({
    searchText: "",
    setSearchText:(text)=>set(()=>({searchText:text}))
}))

export const useLikedSongs = create<LikedSongsProps>(set => ({
    likedSongs: [],
    setLikedSongs: (newLikedSongs:AmplitudeSongProps[])=>set(()=>({likedSongs:newLikedSongs}))
}))

export const useMusicPlayerData = create<MusicPlayerProps>((set) => ({
    playList:TopGenreEndPoints[4].id,
    currentSong: 0,
    nextSong: 1,
    previousSong: 0,
    currentMusicID: 0,
    isPlaying:false,
    readyToPlay:false,
    setCurrentSong:(newCurrentSong)=>set(()=>({currentSong:newCurrentSong})),
    setNextSong:(newNextSong)=>set(()=>({nextSong:newNextSong})),
    setPreviousSong: (newPreviousSong) => set(() => ({ previousSong: newPreviousSong })),
    setPlayList: (newPlayList) => set(() => ({ playList: newPlayList })),
    setCurrentMusicID: (newCurrentMusicID) => set(() => ({ currentMusicID: newCurrentMusicID })),
    setIsPlaying:(newIsPlaying)=>set(()=>({isPlaying:newIsPlaying})),
    setReadyToPlay:(newSingleLooping)=>set(()=>({readyToPlay:newSingleLooping}))
}))