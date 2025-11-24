"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CircleCheckBig } from "lucide-react";
import styles from "./success-modal.module.scss";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <main className={styles.container}>
        <h2 className={styles.title}>Abertura de conta</h2>

        <div className={styles.message}>
          <CircleCheckBig size={34} />

          <p>
            Tudo pronto, agora você já pode acessar a sua conta através do
            painel de Login.
          </p>
        </div>

        <div className={styles.actions}>
          <Button onClick={onClose} text="Ok" ariaLabel="Ok" />
        </div>
      </main>
    </Modal>
  );
}
