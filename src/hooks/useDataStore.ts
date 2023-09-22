import { create } from "zustand"
import DummyData from "../Services/DummyData"
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
    setNextSong:(nextSong:number)=>void
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
    playList:DummyData.tracks.data,
    currentSong: 0,
    nextSong: 1,
    previousSong: 0,
    setCurrentSong:(newCurrentSong)=>set(()=>({currentSong:newCurrentSong})),
    setNextSong:(newNextSong)=>set(()=>({nextSong:newNextSong})),
    setPreviousSong: (newPreviousSong) => set(() => ({ previousSong: newPreviousSong })),
    setPlayList:(newPlayList) => set(() => ({ playList: newPlayList }))
}))