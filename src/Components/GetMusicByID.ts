import { useQuery } from "@tanstack/react-query";
import ApiClient from "../Services/ApiClient";

const GetMusicByID = ({id}:{id:number}) => {
    useQuery({
        queryKey: ["song", id],
        queryFn: () => {
            ApiClient.get(`/track/${id}`)
            .then((res=>console.log(res.data)))
        }
  })
}

export default GetMusicByID