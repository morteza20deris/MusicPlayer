import { deleteDoc, doc } from "firebase/firestore"
import { Authentication, db } from "../Configs/Firebase"

const DeleteLikedSongFormDB = (songID:number) => {
    const docToDelete = doc(db, Authentication.currentUser?.uid + "", songID.toString())
   return deleteDoc(docToDelete)
}
export default DeleteLikedSongFormDB