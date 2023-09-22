import { Button, Grid, GridItem, Heading, List, ListItem } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { MusicList } from "./Components/MusicList";
import { MusicPlayerControls } from './Components/MusicPlayerControls';
import NavBar from "./Components/NavBar";
import { Authentication, db } from './Configs/Firebase';
import EndPoints from "./Services/EndPoints";
import { OnUserSignIN } from './hooks/OnUserSignIN';

function App() {
  // const [selectedPlayList, setSelectedPlayList] = useState(1140232701)
  // const searchRes = SearchMusicByArtist({ artistName: searchText })
  // const res = PlayListTracks({ id: selectedPlayList + "" })
  // console.log(res.data);

  // const [showRes, setShowRes] = useState(res)

  // const [myLikedSongsID, setMyLikedSongsID] = useState([])
  const UserLikedSongsCollection = collection(db, Authentication.currentUser?.uid + "",)
  const { isAuthenticated } = OnUserSignIN()

  useEffect(() => {

    const getMyLikedSongs = async () => {
      const data = await getDocs(UserLikedSongsCollection)
      const filteredData = data.docs.map(dt => ({ ...dt.data() }))
      console.log(filteredData)

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
                <Button>{item.name}</Button>
              </ListItem>
            })}
          </List>
        </GridItem>


        <GridItem paddingTop={5} area={"main"}>

          {/* {res.data && <MusicList musicArray={res.data.tracks.data} />} */}
          <MusicList />
        </GridItem>

      </Grid>
      <MusicPlayerControls />
    </>
  )
}

export default App
