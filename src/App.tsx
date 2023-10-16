import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Grid, GridItem, List, ListItem, Spinner } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { MusicList } from "./Components/MusicList";
import { MusicPlayerControls } from './Components/MusicPlayerControls';
import NavBar from "./Components/NavBar";
import { AmplitudeSongProps } from './Components/Props';
import { Authentication, db } from './Configs/Firebase';
import { OnUserSignIN } from './Services/OnUserSignIn';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import amplitude from 'amplitudejs';
import { useQuery } from '@tanstack/react-query';
import { GetPlayListTracksFromDeezer } from './Services/MusicServices';
import getAmplitudeDataFromDeezer from './Services/getAmplitudeDataFromDeezer';
import { useLikedSongs, useMusicPlayerData } from './hooks/useDataStore';
import TopGenreEndPoints from './Services/TopGenreEndPoints';
import TopCountryEndPoints from './Services/TopCountryEndPoints';

function App() {
  const [selectedPlayList, setSelectedPlayList] = useState(TopGenreEndPoints[4].id)
  const deezerPlaylistTracks = GetPlayListTracksFromDeezer({ id: selectedPlayList + "" })
  const { setReadyToPlay, playList, setPlayList, musicToDisplay, setMusicToDisplay } = useMusicPlayerData()
  const [first, setFirst] = useState(false)
  const { likedSongs, setLikedSongs } = useLikedSongs()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const UserLikedSongsCollection = collection(db, Authentication.currentUser?.uid + "",)
  const { isAuthenticated } = OnUserSignIN()
  const [sideBarContentRef, setSideBarContentRef] = useState("")
  const getMyLikedSongs = async () => {
    const data = await getDocs(UserLikedSongsCollection)
    const filteredData = data.docs.map(dt => ({ ...dt.data() })) as AmplitudeSongProps[]

    setLikedSongs(filteredData)
    amplitude.addPlaylist("MyLikedSongs", {
      callbacks: {
        loadeddata: function () { setReadyToPlay(true) },
        loadstart: function () { setReadyToPlay(false) },
        ended: function () {
          amplitude.pause()
        }
      }
    }, filteredData);
    return filteredData

  }



  useEffect(() => {
    if (deezerPlaylistTracks.data) {
      setMusicToDisplay(getAmplitudeDataFromDeezer(deezerPlaylistTracks.data.tracks.data))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first])


  useEffect(() => {
    if (amplitude.getSongs().length === 0 && deezerPlaylistTracks.data) {
      const test = getAmplitudeDataFromDeezer(deezerPlaylistTracks.data.tracks.data)
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
      amplitude.setRepeat(true)
    } else if (amplitude.getSongs().length > 0 && deezerPlaylistTracks.data) {
      const test = getAmplitudeDataFromDeezer(deezerPlaylistTracks.data.tracks.data)
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
  }, [deezerPlaylistTracks.data])


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
      <Grid marginTop={70} gridTemplateColumns={{ lg: "0px" }} templateAreas={{
        base: ` " main"`,
        lg: `"side main"`

      }}>


        <GridItem area={"side"}>

          <Drawer placement='left' isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(!isDrawerOpen)}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Genres</DrawerHeader>
                <DrawerBody>
                  <List >
                    {(sideBarContentRef === "Genres" ? TopGenreEndPoints : TopCountryEndPoints).map(item => {
                      return <ListItem marginY={1.5} key={item.id}>
                        <Button onClick={() => {
                          setSelectedPlayList(item.id)
                          setPlayList(item.id)
                          setFirst(!first)
                          setIsDrawerOpen(!isDrawerOpen)
                        }} marginStart={5} width="190px">{item.name}</Button>
                      </ListItem>
                    })}
                    <Button width="190px" marginStart={5} onClick={() => {
                      setIsDrawerOpen(!isDrawerOpen)
                      if (likedSongs && likedSongs.length > 0) {
                        setMusicToDisplay(likedSongs)

                        setPlayList("MyLikedSongs")
                      }
                    }}>Liked Songs</Button>
                  </List>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>

        </GridItem>



        <GridItem paddingStart="5%" paddingTop={5} area={"main"}>
          <Button onClick={() => {
            setSideBarContentRef("Genres")
            setIsDrawerOpen(!isDrawerOpen)
          }}>Genres</Button>
          <Button onClick={() => {
            setSideBarContentRef("Countries")
            setIsDrawerOpen(!isDrawerOpen)
          }} marginLeft="10px">Countries</Button>
          <div>{deezerPlaylistTracks.isLoading && <Spinner marginLeft="5%" marginTop="5%" />}</div>
          {musicToDisplay && <MusicList musicToDisplay={musicToDisplay} />}


        </GridItem>

      </Grid >
      <MusicPlayerControls />
    </>
  )
}

export default App
