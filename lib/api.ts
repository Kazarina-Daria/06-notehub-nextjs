import axios from 'axios';
import {type Note}  from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes= async (onQuery : string, page: number) : Promise<FetchNotesResponse>=> {
    const res = await axios.get<FetchNotesResponse>(BASE_URL + "/notes", {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        params: {
            page,
            perPage : 12,
            search: onQuery,
        }
    });
    return res.data;
}

export interface CreateNote{
title:string;
content :string;
   tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export const createNote = async (playload : CreateNote) :Promise<Note> => {
    const res = await axios.post<Note>(BASE_URL + "/notes", playload, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
    });
    return res.data;
}
export const deleteNote = async (id : Note["id"]): Promise<Note> =>{
    const res = await axios.delete<Note>(BASE_URL + `/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
    });
    return res.data;
}

export const fetchNoteById = async (id:Note["id"]):Promise<Note> => {
    const res = await axios.get<Note>(BASE_URL +`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
    });
    return res.data;
}