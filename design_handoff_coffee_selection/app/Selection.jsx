// ===== Chap Coffee — Selection screen (3 layouts) =====
const { useState: useStateSel } = React;

function Stars({ score }) {
  return (
    <div className="score-row">
      <Icon name="star" className="star" />
      <span>{score.toFixed(1)} Score</span>
    </div>
  );
}

function SizeSelector({ drink, sizeIdx, setSizeIdx }) {
  return (
    <div className="size-row">
      {drink.sizes.map((s, i) => (
        <button
          key={s.label}
          className={"size-btn" + (i === sizeIdx ? " active" : "")}
          onClick={() => setSizeIdx(i)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

function PriceBlock({ drink, sizeIdx, fav, toggleFav }) {
  const price = drink.sizes[sizeIdx].price;
  return (
    <div className="price-block">
      <div className="price-tag">
        <span className="label">Price</span>
        <span className="amount"><span className="cur">$</span>{price.toFixed(2)}</span>
      </div>
      <div className="aux-row">
        <button className={"fav-btn" + (fav ? " on" : "")} onClick={toggleFav} aria-label="Favourite">
          <Icon name={fav ? "heartFill" : "heartOutline"} />
        </button>
        <span className="pill-badge">
          <Icon name={drink.badge.icon} />
          {drink.badge.label}
        </span>
      </div>
    </div>
  );
}

function Cta({ onConfirm }) {
  return (
    <button className="cta" onClick={onConfirm}>
      <span className="sheen" />
      Confirm Selection
      <span className="chev"><Icon name="arrow" /></span>
    </button>
  );
}

// Full info content (used by panel / card variants)
function InfoFull({ drink, sizeIdx, setSizeIdx, fav, toggleFav, onConfirm, showNotes }) {
  return (
    <React.Fragment>
      <div className="eyebrow fade-up d1">What would you like to drink today?</div>
      <div className="title-kicker fade-up d1">Coffee Selection</div>
      <h1 className="title-main fade-up d2" key={drink.id}>{drink.name}</h1>
      <div className="tagline fade-up d2">{drink.tagline}</div>
      <div className="fade-up d3"><Stars score={drink.score} /></div>
      <p className="desc fade-up d3">{drink.desc}</p>
      {showNotes && (
        <div className="notes-row fade-up d3">
          {drink.notes.map((n) => <span className="note-chip" key={n}>{n}</span>)}
        </div>
      )}
      <div className="fade-up d4">
        <div className="field-label">Select Size</div>
        <SizeSelector drink={drink} sizeIdx={sizeIdx} setSizeIdx={setSizeIdx} />
      </div>
      <div className="fade-up d5">
        <PriceBlock drink={drink} sizeIdx={sizeIdx} fav={fav} toggleFav={toggleFav} />
      </div>
      <div className="fade-up d6"><Cta onConfirm={onConfirm} /></div>
    </React.Fragment>
  );
}

function Dots({ drinks, index, onIndex }) {
  return (
    <div className="dots">
      {drinks.map((d, i) => (
        <div key={d.id} className={"dot" + (i === index ? " active" : "")} onClick={() => onIndex(i)} />
      ))}
    </div>
  );
}

function SelectionScreen(props) {
  const { drinks, index, onIndex, layout, mode, anim, sizeIdx, setSizeIdx, favs, toggleFav, onConfirm, showNotes } = props;
  const drink = drinks[index];
  const fav = favs.has(drink.id);
  const infoProps = { drink, sizeIdx, setSizeIdx, fav, toggleFav: () => toggleFav(drink.id), onConfirm, showNotes };

  if (layout === "spotlight") {
    return (
      <div className="selection">
        <div className="layout-spotlight">
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <div className="eyebrow fade-up d1">What would you like to drink today?</div>
            <div className="title-kicker fade-up d1" style={{ display: "inline" }}>Coffee Selection · </div>
            <span className="title-main fade-up d2" key={drink.id} style={{ display: "inline", fontSize: "clamp(34px,4vw,56px)" }}>{drink.name}</span>
            <div className="tagline fade-up d2" style={{ marginTop: 6 }}>{drink.tagline} · {drink.score.toFixed(1)} ★</div>
          </div>
          <Stage drinks={drinks} index={index} onIndex={onIndex} mode={mode} anim={anim} neighbours={true} />
          <div className="info-dock glass fade-up d4">
            <div className="dock-main">
              <div className="field-label" style={{ marginBottom: 8 }}>Select Size</div>
              <SizeSelector drink={drink} sizeIdx={sizeIdx} setSizeIdx={setSizeIdx} />
            </div>
            <div className="dock-divider" />
            <div className="price-tag">
              <span className="label">Price</span>
              <span className="amount"><span className="cur">$</span>{drink.sizes[sizeIdx].price.toFixed(2)}</span>
            </div>
            <button className={"fav-btn" + (fav ? " on" : "")} onClick={() => toggleFav(drink.id)}>
              <Icon name={fav ? "heartFill" : "heartOutline"} />
            </button>
            <Cta onConfirm={onConfirm} />
          </div>
          <div style={{ marginTop: 18 }}><Dots drinks={drinks} index={index} onIndex={onIndex} /></div>
        </div>
      </div>
    );
  }

  if (layout === "editorial") {
    return (
      <div className="selection">
        <div className="layout-editorial">
          <div className="ghost-title" key={"g" + drink.id}>{drink.name.split(" ")[0]}</div>
          <Stage drinks={drinks} index={index} onIndex={onIndex} mode={mode} anim={anim} neighbours={true} />
          <div className="info in-glass glass fade-up d3" style={{ position: "absolute", left: 0, bottom: "8%", maxWidth: 400, zIndex: 12 }}>
            <div className="eyebrow">Coffee Selection</div>
            <h1 className="title-main" key={drink.id} style={{ fontSize: "clamp(30px,3.2vw,42px)" }}>{drink.name}</h1>
            <div className="tagline">{drink.tagline}</div>
            <Stars score={drink.score} />
            <p className="desc" style={{ marginTop: 10, marginBottom: 18 }}>{drink.desc}</p>
            <div className="field-label">Select Size</div>
            <SizeSelector drink={drink} sizeIdx={sizeIdx} setSizeIdx={setSizeIdx} />
            <PriceBlock drink={drink} sizeIdx={sizeIdx} fav={fav} toggleFav={() => toggleFav(drink.id)} />
            <Cta onConfirm={onConfirm} />
          </div>
          <div style={{ position: "absolute", right: 16, bottom: "8%", zIndex: 12 }}>
            <Dots drinks={drinks} index={index} onIndex={onIndex} />
          </div>
        </div>
      </div>
    );
  }

  // default: split
  return (
    <div className="selection">
      <div className="layout-split">
        <div className="info in-glass glass">
          <InfoFull {...infoProps} />
        </div>
        <div style={{ position: "relative" }}>
          <Stage drinks={drinks} index={index} onIndex={onIndex} mode={mode} anim={anim} neighbours={true} />
          <div style={{ marginTop: 6 }}><Dots drinks={drinks} index={index} onIndex={onIndex} /></div>
        </div>
      </div>
    </div>
  );
}

window.SelectionScreen = SelectionScreen;
