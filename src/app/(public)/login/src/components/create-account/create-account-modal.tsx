"use client";

import { Modal } from "@/components/ui/Modal";
import { SuccessModal } from "./success-modal/success-modal";
import { useCreateAccount } from "../../hooks/use-create-account";
import { CreateAccountForm } from "./create-account-modal-form/create-account-form";
import type { CreateAccountModalProps } from "../../types/create-account.types";

export function CreateAccountModal({
  isOpen,
  onClose,
}: CreateAccountModalProps) {
  const { showSuccess, handleSubmit, isLoading, handleCloseSuccess } =
    useCreateAccount();

  return (
    <>
      {/* Modal de Criação de Conta */}
      <Modal isOpen={isOpen && !showSuccess} onClose={onClose}>
        <CreateAccountForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Modal>

      {/* Modal de Sucesso */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          handleCloseSuccess();
          onClose();
        }}
      />
    </>
  );
}
