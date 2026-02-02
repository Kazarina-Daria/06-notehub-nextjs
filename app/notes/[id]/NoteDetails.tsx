import NotesClient from "../Notes.client";
import { fetchNoteById } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";
import type { Note } from "@/types/note";
interface NoteDetailsProps{
   params:{ id: string };
}

export default async function NoteDetails({params}:NoteDetailsProps){
    const { id } =  params;
    const queryClient= new QueryClient();
    await queryClient.prefetchQuery({
        queryKey:["note", id],
        queryFn:()=> fetchNoteById(id),
    })
    const note = queryClient.getQueryData<Note>(["note", id]) as Awaited<
    ReturnType<typeof fetchNoteById>>;
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
<NotesClient/>
{note && (
 <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{note.createdAt}</p>
	</div>
</div>

)}
        </HydrationBoundary>

    )
}