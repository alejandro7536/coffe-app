"use client";

import { DRINKS_BY_ID, HISTORY } from "@/lib/drinks";
import { useStore } from "../store";
import { Icon } from "../components/Icon";

export default function ProfilePage() {
  const { favCount, cartCount } = useStore();
  const orderCount = HISTORY.length + cartCount;
  const mocha = DRINKS_BY_ID["mocha"];

  return (
    <div className="page">
      <div className="page-head">
        <h1>Profile</h1>
        <p>Your taste, rewards and preferences.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card glass">
          <div className="avatar">A</div>
          <div className="pname">Alex Rivera</div>
          <div className="pmail">alex.rivera@chap.coffee</div>
          <div className="tier">
            <Icon name="bolt" /> Gold Roaster
          </div>
          <div style={{ marginTop: 26, textAlign: "left" }}>
            <div className="field-label" style={{ marginBottom: 6 }}>
              Beans to next reward
            </div>
            <div className="bean-track">
              <div className="bean-fill" style={{ width: "72%" }} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "var(--on-surface-variant)",
              }}
            >
              <span>720 / 1000</span>
              <span>Free drink at 1000</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="stat-grid">
            <div className="stat glass">
              <div className="sv">{orderCount}</div>
              <div className="sl">Total orders</div>
            </div>
            <div className="stat glass">
              <div className="sv">{favCount}</div>
              <div className="sl">Favourites</div>
            </div>
            <div className="stat glass">
              <div className="sv">4.8</div>
              <div className="sl">Avg. rating</div>
            </div>
          </div>

          <div className="section-card glass">
            <h3>Preferences</h3>
            <div className="pref-row">
              <span className="pk">Default size</span>
              <span className="pv">Medium</span>
            </div>
            <div className="pref-row">
              <span className="pk">Milk</span>
              <span className="pv">Oat</span>
            </div>
            <div className="pref-row">
              <span className="pk">Sweetness</span>
              <span className="pv">Low</span>
            </div>
            <div className="pref-row">
              <span className="pk">Favourite roast</span>
              <span className="pv">Dark · Single origin</span>
            </div>
          </div>

          <div className="section-card glass">
            <h3>Usual order</h3>
            <div className="pref-row" style={{ borderBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="hist-thumb" style={{ width: 54, height: 54 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mocha.img} style={{ height: 64 }} alt="Mocha" />
                </div>
                <div>
                  <div className="pk">Mocha · Medium</div>
                  <div className="pv">Ordered 14 times</div>
                </div>
              </div>
              <span className="hist-price">$6.79</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
