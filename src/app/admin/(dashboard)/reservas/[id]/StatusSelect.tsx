"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "../actions";
import { STATUS_MAP } from "../status";

export default function StatusSelect({ bookingId, status }: { bookingId: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    startTransition(() => {
      updateBookingStatus(bookingId, next);
    });
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      disabled={isPending}
      style={{
        padding: "4px 10px",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        fontSize: 11,
        fontWeight: 600,
        color: "var(--color-foreground)",
        cursor: isPending ? "default" : "pointer",
        opacity: isPending ? 0.6 : 1,
      }}
    >
      {Object.entries(STATUS_MAP).map(([key, { label }]) => (
        <option key={key} value={key}>{label}</option>
      ))}
    </select>
  );
}
