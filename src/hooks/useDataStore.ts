import { create } from "zustand"
// import DummyData from "../Services/DummyData"
import { TrackProps } from "../Components/Props"

interface searchInputProps{
    searchText: string
    setSearchText:(text:string|undefined)=>void
}

interface MusicPlayerProps{
    playList: TrackProps[]
    setPlayList:(playList:TrackProps[])=>void
    currentSong:number
    setCurrentSong:(currentSong:number)=>void
    previousSong: number
    setPreviousSong:(previousSong:number)=>void
    nextSong: number
    setNextSong: (nextSong: number) => void
    currentMusicID: number
    setCurrentMusicID: (CurrentMusicID: number) => void
    looping: boolean
    setLooping: (looping: boolean) => void
    singleLooping: boolean
    setSingleLooping: (singleLooping: boolean) => void
    
}

interface LikedSongsProps{
    likedSongs: TrackProps[]
    setLikedSongs:(likedSongs:TrackProps[])=>void
}

export const useSearchInputData = create<searchInputProps>((set) => ({
    searchText: "",
    setSearchText:(text)=>set(()=>({searchText:text}))
}))

export const useLikedSongs = create<LikedSongsProps>(set => ({
    likedSongs: [],
    setLikedSongs: (newLikedSongs:TrackProps[])=>set(()=>({likedSongs:newLikedSongs}))
}))

export const useMusicPlayerData = create<MusicPlayerProps>((set) => ({
    playList:[],
    currentSong: 0,
    nextSong: 1,
    previousSong: 0,
    currentMusicID: 0,
    looping:false,
    singleLooping:false,
    setCurrentSong:(newCurrentSong)=>set(()=>({currentSong:newCurrentSong})),
    setNextSong:(newNextSong)=>set(()=>({nextSong:newNextSong})),
    setPreviousSong: (newPreviousSong) => set(() => ({ previousSong: newPreviousSong })),
    setPlayList: (newPlayList) => set(() => ({ playList: newPlayList })),
    setCurrentMusicID: (newCurrentMusicID) => set(() => ({ currentMusicID: newCurrentMusicID })),
    setLooping:(newLooping)=>set(()=>({looping:newLooping})),
    setSingleLooping:(newSingleLooping)=>set(()=>({singleLooping:newSingleLooping}))
}))