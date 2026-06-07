"use client";

import { useStore } from "../store";
import { Icon } from "./Icon";

// Bottom-center dark notification pill. Slides up on add-to-cart / checkout,
// auto-hides after ~2.4s (managed by the store).
export default function Toast() {
  const { toast } = useStore();

  return (
    <div
      className={"toast" + (toast ? " show" : "")}
      role="status"
      aria-live="polite"
    >
      <span className="ok">
        <Icon name="check" />
      </span>
      {toast && (
        <div className="toast-text">
          <span className="toast-title">{toast.title}</span>
          {toast.description && (
            <span className="toast-desc">{toast.description}</span>
          )}
        </div>
      )}
    </div>
  );
}
