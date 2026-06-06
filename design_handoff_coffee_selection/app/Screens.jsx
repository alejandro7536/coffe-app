// ===== Chap Coffee — secondary screens =====

function DrinkCard({ drink, fav, onToggleFav, onAdd, onOpen }) {
  return (
    <div className="drink-card glass" style={{ "--card-accent": drink.accent }} onClick={onOpen}>
      <div className="glow" />
      <button className="card-fav" onClick={(e) => { e.stopPropagation(); onToggleFav(drink.id); }}>
        <Icon name={fav ? "heartFill" : "heartOutline"} />
      </button>
      <div className="thumb"><img src={drink.img} alt={drink.name} /></div>
      <div className="card-name">{drink.name}</div>
      <div className="card-sub">{drink.tagline} · {drink.score.toFixed(1)} ★</div>
      <div className="card-foot">
        <span className="card-price">${drink.sizes[0].price.toFixed(2)}</span>
        <button className="mini-add" onClick={(e) => { e.stopPropagation(); onAdd(drink); }}>
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}

function FavouritesScreen({ drinks, favs, toggleFav, onAdd, onOpen }) {
  const list = drinks.filter((d) => favs.has(d.id));
  return (
    <div className="page">
      <div className="page-head">
        <h1>Favourites</h1>
        <p>{list.length ? `${list.length} drink${list.length > 1 ? "s" : ""} you keep coming back to.` : "Tap the heart on any drink to save it here."}</p>
      </div>
      {list.length === 0 ? (
        <div className="empty">
          <Icon name="heartOutline" />
          <h3>No favourites yet</h3>
          <p>Heart a coffee from the menu and it will live here for one-tap reordering.</p>
        </div>
      ) : (
        <div className="card-grid">
          {list.map((d) => (
            <DrinkCard key={d.id} drink={d} fav={true} onToggleFav={toggleFav} onAdd={onAdd} onOpen={() => onOpen(d.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function HistoryScreen({ drinksById, history, onReorder }) {
  return (
    <div className="page">
      <div className="page-head">
        <h1>Order History</h1>
        <p>Your recent brews. Reorder a favourite in one tap.</p>
      </div>
      <div className="hist-list">
        {history.map((h, i) => {
          const d = drinksById[h.id];
          return (
            <div className="hist-row glass" key={i}>
              <div className="hist-thumb"><img src={d.img} alt={d.name} /></div>
              <div className="hist-main">
                <div className="hn">{d.name} <span style={{ color: "var(--outline)", fontWeight: 500, fontSize: 13 }}>· {h.size}</span></div>
                <div className="hd">{h.date}</div>
              </div>
              <span className={"hist-status " + (h.status === "Ready" ? "ready" : "done")}>{h.status}</span>
              <span className="hist-price">${h.price.toFixed(2)}</span>
              <button className="reorder-btn" onClick={() => onReorder(h)}>Reorder</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfileScreen({ drinksById, favCount, orderCount }) {
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
          <div className="tier"><Icon name="bolt" /> Gold Roaster</div>
          <div style={{ marginTop: 26, textAlign: "left" }}>
            <div className="field-label" style={{ marginBottom: 6 }}>Beans to next reward</div>
            <div className="bean-track"><div className="bean-fill" style={{ width: "72%" }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--on-surface-variant)" }}>
              <span>720 / 1000</span><span>Free drink at 1000</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="stat-grid">
            <div className="stat glass"><div className="sv">{orderCount}</div><div className="sl">Total orders</div></div>
            <div className="stat glass"><div className="sv">{favCount}</div><div className="sl">Favourites</div></div>
            <div className="stat glass"><div className="sv">4.8</div><div className="sl">Avg. rating</div></div>
          </div>
          <div className="section-card glass">
            <h3>Preferences</h3>
            <div className="pref-row"><span className="pk">Default size</span><span className="pv">Medium</span></div>
            <div className="pref-row"><span className="pk">Milk</span><span className="pv">Oat</span></div>
            <div className="pref-row"><span className="pk">Sweetness</span><span className="pv">Low</span></div>
            <div className="pref-row"><span className="pk">Favourite roast</span><span className="pv">Dark · Single origin</span></div>
          </div>
          <div className="section-card glass">
            <h3>Usual order</h3>
            <div className="pref-row" style={{ borderBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="hist-thumb" style={{ width: 54, height: 54 }}><img src={drinksById["mocha"].img} style={{ height: 64 }} alt="Mocha" /></div>
                <div><div className="pk">Mocha · Medium</div><div className="pv">Ordered 14 times</div></div>
              </div>
              <span className="hist-price">$6.79</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartScreen({ cart, setQty, removeItem, onCheckout, onBrowse }) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + (cart.length ? tax + 0.5 : 0);
  return (
    <div className="page">
      <div className="page-head">
        <h1>Your Cart</h1>
        <p>{cart.length ? `${cart.reduce((s, i) => s + i.qty, 0)} item${cart.reduce((s, i) => s + i.qty, 0) > 1 ? "s" : ""} ready for pickup.` : "Your cart is empty."}</p>
      </div>
      {cart.length === 0 ? (
        <div className="empty">
          <Icon name="cart" />
          <h3>Nothing brewing yet</h3>
          <p style={{ marginBottom: 22 }}>Head to the menu and confirm a selection to fill your cart.</p>
          <button className="reorder-btn" onClick={onBrowse}>Browse the menu</button>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((it) => (
              <div className="cart-row glass" key={it.key} style={{ "--card-accent": it.accent }}>
                <div className="cart-thumb"><div className="g" /><img src={it.img} alt={it.name} /></div>
                <div className="cart-info">
                  <div className="cn">{it.name}</div>
                  <div className="cs">{it.size} · {it.tagline}</div>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(it.key, it.qty - 1)}><Icon name="minus" /></button>
                  <span className="n">{it.qty}</span>
                  <button onClick={() => setQty(it.key, it.qty + 1)}><Icon name="plus" /></button>
                </div>
                <span className="rprice">${(it.price * it.qty).toFixed(2)}</span>
                <button className="del" onClick={() => removeItem(it.key)}><Icon name="trash" /></button>
              </div>
            ))}
          </div>
          <div className="summary glass">
            <h3>Order Summary</h3>
            <div className="sum-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="sum-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="sum-row"><span>Service</span><span>$0.50</span></div>
            <div className="promo">
              <input placeholder="Promo code" />
              <button>Apply</button>
            </div>
            <div className="sum-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="cta" style={{ marginTop: 18, maxWidth: "none" }} onClick={onCheckout}>
              <span className="sheen" />
              Checkout
              <span className="chev"><Icon name="arrow" /></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { FavouritesScreen, HistoryScreen, ProfileScreen, CartScreen, DrinkCard });
