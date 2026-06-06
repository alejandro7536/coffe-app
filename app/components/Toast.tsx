"use client";

import { useStore } from "../store";
import { Icon } from "./Icon";

export default function Toast() {
  const { toast } = useStore();

  return (
    <div className={"toast" + (toast ? " show" : "")} role="status" aria-live="polite">
      <span className="ok">
        <Icon name="check" />
      </span>
      {toast}
    </div>
  );
}
