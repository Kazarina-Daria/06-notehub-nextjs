import styles from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import {Note} from "@/types/note";

interface NoteDetailsProps{
   params: Promise<{ noteId: string }>;
}

export default async function NoteDetails({params}:NoteDetailsProps){
    const { noteId } = await params;
    const note :Note = await fetchNoteById(noteId);
    return(
<NoteDetails/>
    )
}