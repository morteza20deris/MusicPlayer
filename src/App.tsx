import { Button, Grid, GridItem, Heading, List, ListItem } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { MusicList } from "./Components/MusicList";
import { MusicPlayerControls } from './Components/MusicPlayerControls';
import NavBar from "./Components/NavBar";
import { Authentication, db } from './Configs/Firebase';
import EndPoints from "./Services/EndPoints";
import { OnUserSignIN } from './Services/OnUserSignIn';
import { TrackProps } from './Components/Props';
import DummyData from './Services/DummyData';
import { useLikedSongs } from './hooks/useDataStore';

function App() {
  // const [selectedPlayList, setSelectedPlayList] = useState(1140232701)
  // const searchRes = SearchMusicByArtist({ artistName: searchText })
  // const res = PlayListTracks({ id: selectedPlayList + "" })
  // console.log(res.data);

  // const [showRes, setShowRes] = useState(res)

  // const [myLikedSongs, setMyLikedSongs] = useState<TrackProps[]>()
  const { likedSongs, setLikedSongs } = useLikedSongs()
  const [displayMusic, setDisplayMusic] = useState<TrackProps[]>()
  const UserLikedSongsCollection = collection(db, Authentication.currentUser?.uid + "",)
  const { isAuthenticated } = OnUserSignIN()



  useEffect(() => {
    setDisplayMusic(DummyData.tracks.data)
    const getMyLikedSongs = async () => {
      const data = await getDocs(UserLikedSongsCollection)
      const filteredData = data.docs.map(dt => ({ ...dt.data() })) as TrackProps[]
      console.log(filteredData)
      setLikedSongs(filteredData)

    }

    if (Authentication.currentUser) {
      console.log("getting songs");

      getMyLikedSongs()
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])




  return (
    <>
      <NavBar />
      <Grid marginTop={70} gridTemplateColumns={`150px`} templateAreas={{
        base: ` "side main"`

      }}>

        <GridItem area={"side"}>
          <Heading paddingTop={5} paddingLeft={6}>Genres</Heading>
          <List >
            {EndPoints.map(item => {
              return <ListItem marginY={1} key={item.id}>
                <Button width="100px">{item.name}</Button>
              </ListItem>
            })}
            <Button onClick={() => { if (likedSongs && likedSongs.length > 0) setDisplayMusic(likedSongs) }} width="100px">Liked Songs</Button>
          </List>
        </GridItem>


        <GridItem paddingTop={5} area={"main"}>

          {/* {res.data && <MusicList musicArray={res.data.tracks.data} />} */}
          <MusicList musicArray={displayMusic} />
        </GridItem>

      </Grid>
      <MusicPlayerControls />
    </>
  )
}

export default App
