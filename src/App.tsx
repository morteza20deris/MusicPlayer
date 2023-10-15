import { Button, Grid, GridItem, Heading, List, ListItem, Show } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { MusicList } from "./Components/MusicList";
import { MusicPlayerControls } from './Components/MusicPlayerControls';
import NavBar from "./Components/NavBar";
import { AmplitudeSongProps } from './Components/Props';
import { Authentication, db } from './Configs/Firebase';
import { OnUserSignIN } from './Services/OnUserSignIn';
import EndPoints from "./Services/TopGenreEndPoints";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import amplitude from 'amplitudejs';
import { useQuery } from '@tanstack/react-query';
import { GetPlayListTracksFromDeezer } from './Services/MusicServices';
import { useLikedSongs, useMusicPlayerData } from './hooks/useDataStore';
import getAmplitudeDataFromDeezer from './Services/getAmplitudeDataFromDeezer';

function App() {
  const [selectedPlayList, setSelectedPlayList] = useState(EndPoints[4].id)
  const deezerPlaylistTracks = GetPlayListTracksFromDeezer({ id: selectedPlayList + "" }).data
  const { setReadyToPlay, playList, setPlayList, musicToDisplay, setMusicToDisplay } = useMusicPlayerData()
  const [first, setFirst] = useState(false)
  const { likedSongs, setLikedSongs } = useLikedSongs()

  const UserLikedSongsCollection = collection(db, Authentication.currentUser?.uid + "",)
  const { isAuthenticated } = OnUserSignIN()

  const getMyLikedSongs = async () => {
    const data = await getDocs(UserLikedSongsCollection)
    const filteredData = data.docs.map(dt => ({ ...dt.data() })) as AmplitudeSongProps[]
    console.log(filteredData)
    setLikedSongs(filteredData)
    return filteredData

  }



  useEffect(() => {
    if (deezerPlaylistTracks) {
      setMusicToDisplay(getAmplitudeDataFromDeezer(deezerPlaylistTracks.tracks.data))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first])


  useEffect(() => {
    if (amplitude.getSongs().length === 0 && deezerPlaylistTracks) {
      const test = getAmplitudeDataFromDeezer(deezerPlaylistTracks.tracks.data)
      setMusicToDisplay(test)
      amplitude.init({
        songs: test,
        playlists: {
          [`${selectedPlayList}`]: {
            songs: [...Array(test.length).keys()],
            title: { playList }
          }
        },
        callbacks: {
          loadeddata: function () { setReadyToPlay(true) },
          loadstart: function () { setReadyToPlay(false) },
          ended: function () {
            amplitude.pause()
          }
        }
      });
    } else if (amplitude.getSongs().length > 0 && deezerPlaylistTracks) {
      const test = getAmplitudeDataFromDeezer(deezerPlaylistTracks.tracks.data)
      setMusicToDisplay(test)
      amplitude.addPlaylist(selectedPlayList, {
        callbacks: {
          loadeddata: function () { setReadyToPlay(true) },
          loadstart: function () { setReadyToPlay(false) },
          ended: function () {
            amplitude.pause()
          }
        }
      }, test);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deezerPlaylistTracks])


  useQuery({
    queryKey: [Authentication.currentUser?.uid],
    queryFn: () => {
      if (isAuthenticated) {
        return getMyLikedSongs()
      } else {
        return []
      }
    },

  })

  return (
    <>
      <NavBar />
      <Grid marginTop={70} gridTemplateColumns={{ lg: "150px" }} templateAreas={{
        base: ` " main"`,
        lg: `"side main"`

      }}>

        <Show above='lg'>
          <GridItem area={"side"}>
            <Heading paddingTop={5} paddingLeft={6}>Genres</Heading>
            <List >
              {EndPoints.map(item => {
                return <ListItem marginY={1.5} key={item.id}>
                  <Button onClick={() => {
                    setSelectedPlayList(item.id)
                    setPlayList(item.id)
                    setFirst(!first)
                  }} marginStart={5} width="150px">{item.name}</Button>
                </ListItem>
              })}
              <Button width="150px" marginStart={5} onClick={() => { if (likedSongs && likedSongs.length > 0) setMusicToDisplay(likedSongs) }}>Liked Songs</Button>
            </List>
          </GridItem>
        </Show>


        <GridItem paddingStart="5%" paddingTop={5} area={"main"}>

          {musicToDisplay && <MusicList musicToDisplay={musicToDisplay} />}


        </GridItem>

      </Grid >
      <MusicPlayerControls />
    </>
  )
}

export default App
