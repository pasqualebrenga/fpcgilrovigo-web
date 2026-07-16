"use client";

import type { ReactNode } from "react";

type DeleteConfirmFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  children: ReactNode;
  className?: string;
  confirmMessage: string;
  hiddenName: string;
  hiddenValue: string;
};

export function DeleteConfirmForm({
  action,
  children,
  className,
  confirmMessage,
  hiddenName,
  hiddenValue,
}: DeleteConfirmFormProps) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <input name={hiddenName} type="hidden" value={hiddenValue} />
      {children}
    </form>
  );
}
