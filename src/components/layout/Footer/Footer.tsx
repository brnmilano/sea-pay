"use client";

import { usePathname } from "next/navigation";
import styles from "./footer.module.scss";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} seaPay Instituição de Pagamento S/A.
      </p>

      <address>
        CNPJ 00.000.000/0000-00 Edifício Lê Quartier, SHCN, 1017/1018 Brasília -
        DF
      </address>
    </footer>
  );
}
