"use client";

import { useState } from "react";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () =>
      fetchNotes({
        page: page,
        perPage: 12,
        search,
      }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {isLoading && <p>Loading...</p>}

      {error && <p>Something went wrong!</p>}

      {!isLoading && !error && notes.length > 0 && <NoteList notes={notes} />}

      {!isLoading && !error && notes.length === 0 && <p>No notes found</p>}

      {isFetching && <p>Updating notes...</p>}
    </div>
  );
}
