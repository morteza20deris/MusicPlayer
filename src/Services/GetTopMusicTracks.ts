import { useQuery } from "@tanstack/react-query"
import ApiClient from "./ApiClient"
    
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