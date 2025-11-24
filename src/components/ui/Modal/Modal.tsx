"use client";

import { MouseEvent, useEffect } from "react";
import type { ModalProps } from "./Modal.type";
import styles from "./modal.module.scss";

/**
 * @description Componente de Modal reutilizável com overlay e opção de fechar
 *
 * @param isOpen - Estado que controla se o modal está aberto ou fechado
 * @param onClose - Função chamada ao fechar o modal
 * @param is_shopkeeper - Flag para identificar se é um usuário lojista
 * @param children - Conteúdo a ser renderizado dentro do modal
 */
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Previne scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fecha o modal ao pressionar ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Fecha o modal ao clicar no overlay
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
