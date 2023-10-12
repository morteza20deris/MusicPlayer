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
import TopGenreEndPoints from './Services/TopGenreEndPoints';
import { useLikedSongs, useMusicPlayerData } from './hooks/useDataStore';
import { GetPlayListTracksFromDeezer } from './Services/MusicServices';

function App() {
  const [selectedPlayList, setSelectedPlayList] = useState(TopGenreEndPoints[4].id)
  // const searchRes = SearchMusicByArtist({ artistName: searchText })
  const res = GetPlayListTracksFromDeezer({ id: selectedPlayList + "" })
  // const res = DummyData;
  const { setReadyToPlay } = useMusicPlayerData()

  const { likedSongs, setLikedSongs } = useLikedSongs()
  const [displayMusic, setDisplayMusic] = useState<AmplitudeSongProps[]>()

  const UserLikedSongsCollection = collection(db, Authentication.currentUser?.uid + "",)
  const { isAuthenticated } = OnUserSignIN()

  const getMyLikedSongs = async () => {
    const data = await getDocs(UserLikedSongsCollection)
    const filteredData = data.docs.map(dt => ({ ...dt.data() })) as AmplitudeSongProps[]
    console.log(filteredData)
    setLikedSongs(filteredData)
    return filteredData

  }

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

  useEffect(() => {
    if (res.data) {
      const test = res.data.tracks.data.filter(song => song.preview.length > 0)


      amplitude.init({
        songs: test.map(song => {

          return {
            name: song.title,
            artist: song.artist.name,
            album: song.album.title,
            url: song.preview,
            cover_art_url: song.album.cover_medium,
            id: song.id
          }


        }),
        playlists: {
          "ancient_astronauts": {
            songs: [...Array(test.length).keys()],
            title: 'Best of Ancient Astronauts'
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
      setDisplayMusic(amplitude.getSongsState() as AmplitudeSongProps[])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.data])




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
                  <Button onClick={() => setSelectedPlayList(item.id)} marginStart={5} width="150px">{item.name}</Button>
                </ListItem>
              })}
              <Button width="150px" marginStart={5} onClick={() => { if (likedSongs && likedSongs.length > 0) setDisplayMusic(likedSongs) }}>Liked Songs</Button>
            </List>
          </GridItem>
        </Show>


        <GridItem paddingStart="5%" paddingTop={5} area={"main"}>

          {displayMusic && <MusicList />}

        </GridItem>

      </Grid >
      <MusicPlayerControls />
    </>
  )
}

export default App
