import React, { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, message }) => {
  const modal = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!modal.current) return;
      if (!open || modal.current.contains(event.target as Node)) return;
      onClose();
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [open, onClose]);

  // Close on ESC key
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!open || event.key !== "Escape") return;
      onClose();
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [open, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-dark/90 px-4 py-5">
      <div
        ref={modal}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[570px] rounded-2xl bg-bg border border-gray-700 px-8 py-12 text-center"
      >
        <h3 className="pb-[18px] text-xl font-semibold text-dark sm:text-2xl">
          {title || "Success!"}
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-indigo-500"></span>
        <p className="mb-10 text-semibold leading-relaxed text-body-color">
          {message || "I will get back to you soon… but don't hold your breath!"}
        </p>
        <button
          onClick={onClose}
          className="w-46 rounded-2xl px-4 py-2 text-md font-normal transition hover:bg-gray-600 bg-gray-700 text-main-neutral"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;