"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../store";
import { Icon } from "./Icon";

const LINKS = [
  { href: "/", label: "Menu" },
  { href: "/favourites", label: "Favourites" },
  { href: "/history", label: "History" },
  { href: "/profile", label: "Profile" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const { favCount, cartCount } = useStore();

  return (
    <nav className="nav">
      <Link className="brand" href="/">
        <span className="brand-mark">
          <Icon name="leaf" />
        </span>
        <span className="brand-name">
          Chap <b>Coffee</b>
        </span>
      </Link>

      <div className="nav-links">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={"nav-link" + (pathname === l.href ? " active" : "")}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        <Link href="/favourites" className="icon-btn glass" aria-label="Favourites">
          <Icon name="heartOutline" />
          {favCount > 0 && <span className="badge-dot">{favCount}</span>}
        </Link>
        <Link href="/cart" className="icon-btn glass" aria-label="Cart">
          <Icon name="cart" />
          {cartCount > 0 && <span className="badge-dot">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
