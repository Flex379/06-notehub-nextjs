import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({ page, perPage, search }: FetchNotesParams) {
  const { data } = await noteApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });
  return data;
}

export async function createNote({ title, content, tag }: CreateNoteData) {
  const { data } = await noteApi.post<Note>("/notes", {
    title,
    content,
    tag,
  });
  return data;
}

export async function deleteNote(id: string) {
  const { data } = await noteApi.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await noteApi.get<Note>(`/notes/${id}`);
  return data;
}
