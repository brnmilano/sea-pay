import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  is_shopkeeper?: boolean;
  children: ReactNode;
}
