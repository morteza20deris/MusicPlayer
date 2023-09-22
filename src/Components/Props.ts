// export interface PlayListProps{
//     id: number
//     readable: boolean
//     title: string
//     title_short: string
//     title_version: string
//     link: string
//     duration: number
//     rank: number
//     explicit_lyrics: boolean
//     explicit_content_lyrics: number
//     explicit_content_cover: number
//     preview: string
//     md5_image: string
//     artist: ArtistProps
//     album: AlbumProps
//     type:string
    
// }

export interface PlayListProps{
    tracks:TracksProps
}
interface TracksProps{
    data:TrackProps[]
}
export interface TrackProps{
    
    id: number
    readable:boolean
    title: string
    title_short: string
    title_version: string
    link: string
    duration: number
    rank: number
    explicit_lyrics: boolean
    explicit_content_lyrics: number
    explicit_content_cover:number
    preview: string
    md5_image: string
    time_add:number
    artist: ArtistProps
    album: AlbumProps
    type:string
}

interface ArtistProps{
    id: number
    name: string
    link: string
    tracklist: string
    type: string
}

interface AlbumProps{
    id: number
    title: string
    cover: string
    cover_small: string|null
    cover_medium:string|null
    cover_big:string|null
    cover_xl:string|null
    md5_image:string
    tracklist:string
    type:string
}

export interface UserProps{
    email: string
    family_name: string
    given_name: string
    id: number
    locale: string
    name: string
    picture: string
    verified_email: boolean
    
}