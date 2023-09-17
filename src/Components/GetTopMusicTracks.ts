import { useQuery } from "react-query"
import ApiClient from "../Services/ApiClient"
    
 const GetTopMusicTracks = ({maxTracks}:{maxTracks:number}) => {
    useQuery({
        queryKey: ["TopTracks"],
        queryFn: () => {
            ApiClient.get(`/chart/0/tracks?limit=${maxTracks}`)
            .then(res=>console.log(res.data))
        }
  })
}

export default GetTopMusicTracks