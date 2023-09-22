import { setDoc, doc } from "firebase/firestore";
import { TrackProps } from "../Components/Props";
import { Authentication, db } from "../Configs/Firebase";

async function AddLikedSongToDB(likedSong: TrackProps) {

    await setDoc(doc(db, Authentication.currentUser?.uid+"", likedSong.id + ""), likedSong).catch(e => console.log(e));
}
  
export default AddLikedSongToDB