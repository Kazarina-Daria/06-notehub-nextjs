
"use client";

import css from "./Notes.client.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useParams } from "next/navigation";
import NoteDetails from "./[id]/NoteDetails";

export default function NotesClient() {
  const [onQuery, setOnQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const { id } = useParams<{ id: string }>();
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["note", currentPage, onQuery],
    queryFn: () => fetchNotes(onQuery, currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const totalPages = data?.totalPages;

  const onFound = useDebouncedCallback((value: string) => {
    setOnQuery(value);
    setCurrentPage(1);
  }, 250);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        <SearchBox value={onQuery} onChange={onFound} />
        {data && data.totalPages !== undefined && (
          <Pagination
            pageCount={totalPages ?? 0}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </header>
      {isSuccess && data.notes.length === 0 && (
        <div>Create your first note</div>
      )}
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {isSuccess && (data?.notes?.length ?? 0) > 0 && (
        <NoteList notes={data.notes} />
      )}

      {modalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
