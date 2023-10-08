import { setDoc, doc } from "firebase/firestore";
import { AmplitudeSongProps } from "../Components/Props";
import { Authentication, db } from "../Configs/Firebase";

async function AddLikedSongToDB(likedSong: AmplitudeSongProps) {

    await setDoc(doc(db, Authentication.currentUser?.uid+"", likedSong.id + ""), likedSong).catch(e => console.log(e));
}
  
export default AddLikedSongToDB