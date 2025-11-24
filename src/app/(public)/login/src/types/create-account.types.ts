export interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateAccountFormData {
  email: string;
  password: string;
  confirmPassword: string;
  accountType?: "PF" | "PJ";
  fullName?: string;
  cpf?: string;
  businessName?: string;
  cnpj?: string;
}

export interface CreateAccountFormProps {
  onSubmit: (data: CreateAccountFormData) => void;
  isLoading: boolean;
}
