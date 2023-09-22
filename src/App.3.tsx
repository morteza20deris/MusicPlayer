import { Button, Grid, GridItem, Heading, List, ListItem } from '@chakra-ui/react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { MusicList } from "./Components/MusicList";
import { MusicPlayerControls } from './Components/MusicPlayerControls';
import NavBar from "./Components/NavBar";
import { db } from './Configs/Firebase';
import EndPoints from "./Services/EndPoints";
import { TrackProps } from './Components/Props';

export function App() {
    // const [selectedPlayList, setSelectedPlayList] = useState(1140232701)
    // const searchRes = SearchMusicByArtist({ artistName: searchText })
    // const res = PlayListTracks({ id: selectedPlayList + "" })
    // console.log(res.data);
    // const [showRes, setShowRes] = useState(res)
    const [myLikedSongsID, setMyLikedSongsID] = useState([]);
    const UserLikedSongsCollection = collection(db, "UserID");

    useEffect(() => {
        const getMyLikedSongsIDs = async () => {
            const data = await getDocs(UserLikedSongsCollection);
            const filteredData = data.docs.map(dt => ({ ...dt.data() }));
            console.log(filteredData);

        };
        getMyLikedSongsIDs();

    }, []);

    async function onSubmitLikedSong(likedSong: TrackProps) {

        await setDoc(doc(db, "UserID", likedSong.id + ""), likedSong).catch(e => console.log(e));
    }


    return (
        <>
            <NavBar />
            <Grid marginTop={70} gridTemplateColumns={`150px`} templateAreas={{
                base: ` "side main"`
            }}>

                <GridItem area={"side"}>
                    <Heading paddingTop={5} paddingLeft={6}>Genres</Heading>
                    <List>
                        {EndPoints.map(item => {
                            return <ListItem marginY={1} key={item.id}>
                                <Button onClick={() => onSubmitLikedSong()}>{item.name}</Button>
                            </ListItem>;
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
    );
}
