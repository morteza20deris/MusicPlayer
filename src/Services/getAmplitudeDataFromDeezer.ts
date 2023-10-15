import { AmplitudeSongProps, TrackProps } from "../Components/Props"

const getAmplitudeDataFromDeezer = function (deezerData: TrackProps[]) {

  const deezerFilteredData = deezerData.filter(song => song.preview.length > 0)
  return deezerFilteredData.map(song => {
    return {
      name: song.title,
      artist: song.artist.name,
      album: song.album.title,
      url: song.preview,
      cover_art_url: song.album.cover_medium,
      id: song.id
    }
  }) as AmplitudeSongProps[]



}
  
export default getAmplitudeDataFromDeezer