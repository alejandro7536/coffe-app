"use client";

import { HISTORY, DRINKS_BY_ID } from "@/lib/drinks";
import { useStore } from "../store";

export default function HistoryPage() {
  const { reorder } = useStore();

  return (
    <div className="page">
      <div className="page-head">
        <h1>Order History</h1>
        <p>Your recent brews. Reorder a favourite in one tap.</p>
      </div>

      <div className="hist-list">
        {HISTORY.map((h, i) => {
          const d = DRINKS_BY_ID[h.id];
          return (
            <div className="hist-row glass" key={i}>
              <div className="hist-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.img} alt={d.name} />
              </div>
              <div className="hist-main">
                <div className="hn">
                  {d.name}{" "}
                  <span style={{ color: "var(--outline)", fontWeight: 500, fontSize: 13 }}>
                    · {h.size}
                  </span>
                </div>
                <div className="hd">{h.date}</div>
              </div>
              <span className={"hist-status " + (h.status === "Ready" ? "ready" : "done")}>
                {h.status}
              </span>
              <span className="hist-price">${h.price.toFixed(2)}</span>
              <button className="reorder-btn" onClick={() => reorder(h)}>
                Reorder
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
