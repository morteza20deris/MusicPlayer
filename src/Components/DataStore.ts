import { create } from "zustand"
import DummyData from "./DummyData"
import { TrackProps } from "./Props"

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

export const searchInput = create<searchInputProps>((set) => ({
    searchText: "",
    setSearchText:(text)=>set(()=>({searchText:text}))
}))

export const musicPlayerData = create<MusicPlayerProps>((set) => ({
    playList:DummyData.tracks.data,
    currentSong: 0,
    nextSong: 1,
    previousSong: 0,
    setCurrentSong:(newCurrentSong)=>set(()=>({currentSong:newCurrentSong})),
    setNextSong:(newNextSong)=>set(()=>({nextSong:newNextSong})),
    setPreviousSong: (newPreviousSong) => set(() => ({ previousSong: newPreviousSong })),
    setPlayList:(newPlayList) => set(() => ({ playList: newPlayList }))
}))