import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import React, { useEffect } from "react";

interface ModalProps{
  onClose: () => void;
 children : React.ReactNode;
}

const modalRoot = document.querySelector("#modal-root") as HTMLElement;
export default function Modal({onClose, children} : ModalProps){
  useEffect(()=> {
    const onEscape = ( e :KeyboardEvent )=>{
      if(e.key === "Escape") onClose();
    }
    window.addEventListener("keydown",onEscape);
    document.body.style.overflow = "hidden";
    return()=>{
      window.removeEventListener("keydown", onEscape);
    document.body.style.overflow="auto";
    }
  }, [onClose]);

  const backDropClick = (e : React.MouseEvent) => {
    if(e.target === e.currentTarget) onClose();
  }
  return createPortal (
       ( <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
  onClick={backDropClick}>

  <div className={css.modal}
    onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
</div>
),modalRoot
    )
}