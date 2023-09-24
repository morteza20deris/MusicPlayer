import { useQuery } from "@tanstack/react-query";
import ApiClient from "./ApiClient";
import { PlayListProps } from "../Components/Props";

export const SearchMusicByArtist = ({ artistName }: { artistName: string }) => {
     return useQuery({
        queryKey: [artistName],
        queryFn: () => {
           return ApiClient.get(`/search?q=${artistName}`)
                    .then(res=>res.data)
        }
        ,
        staleTime:Infinity
   })
   
}

export const GetPlayListTracksFromDeezer = ({id}:{id:string}) => {
   return useQuery({
      queryKey: [id],
      queryFn: () => {
         return ApiClient.get<PlayListProps>(`playlist/${id}`)
         .then(res=>res.data)
      }
   })
}

