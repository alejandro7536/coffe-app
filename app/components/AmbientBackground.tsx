// Fixed warm-obsidian canvas with the amber aurora keyed to --accent.
// Ambient glow pulse is locked ON, so the "breathe" class is always present.
export default function AmbientBackground() {
  return (
    <div className="ambient breathe" aria-hidden>
      <div className="grain" />
    </div>
  );
}
