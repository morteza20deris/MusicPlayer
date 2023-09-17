import { Button, Grid, GridItem, Heading, List, ListItem } from '@chakra-ui/react';
import { MusicList } from "./Components/MusicList";
import NavBar from "./Components/NavBar";
import EndPoints from "./Services/EndPoints";
import { MusicPlayerControls } from './Components/MusicPlayerControls';

function App() {
  // const [selectedPlayList, setSelectedPlayList] = useState(1140232701)
  // const searchRes = SearchMusicByArtist({ artistName: searchText })
  // const res = PlayListTracks({ id: selectedPlayList + "" })
  // console.log(res.data);

  // const [showRes, setShowRes] = useState(res)

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
                <Button >{item.name}</Button>
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
