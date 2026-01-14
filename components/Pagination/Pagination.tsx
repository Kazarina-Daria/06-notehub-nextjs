import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps{
    currentPage : number;
    pageCount : number;
    onPageChange : (page : number ) => void;
}


export default function Pagination ({currentPage, pageCount, onPageChange} : PaginationProps){
     if (pageCount <= 1) return null;
     return (
        <ReactPaginate
             previousLabel={"<"}
      nextLabel={">"}
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={(e) => onPageChange(e.selected)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      containerClassName={css.pagination} 
      pageLinkClassName={css.pageLink} 
      activeClassName={css.active}
      previousClassName={css.page}
      nextClassName={css.page}
        />
     )
}