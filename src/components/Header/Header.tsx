import { useRef, useState } from "react";
import { logo } from "@/data/imagesData";
import MainMenu from "./MainMenu";
import BtnMenu from "../Botao/BtnMenu";
import BtnSearch from "../Botao/BtnSearch";
import SearchBox from "./SearchBox";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const submitSearch = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024 && !menuOpen) {
      setMenuOpen(true);
    }
    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-fromColor to-toColor">
      <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-5 lg:px-6">
        <div className="flex items-center gap-4 h-14 sm:h-16 lg:h-20">
          <a className="shrink-0 justify-self-start -ml-2 sm:-ml-3 lg:-ml-4" href="/">
            <img
              src={logo}
              alt="Imagem da logo do LumaHC"
              className="h-10 w-auto sm:h-12 md:h-14 rounded-full p-[2px] select-none mr-4"
            />
          </a>
          <div className="hidden lg:flex flex-1 justify-center">
            <MainMenu filter={query} />
          </div>
          <div className="lg:hidden ml-auto flex items-center gap-2 sm:gap-3 pr-[env(safe-area-inset-right)]">
            <button
              type="button"
              aria-label="Buscar"
              aria-expanded={searchOpen}
              aria-controls="search-popover"
              onClick={() => setSearchOpen(v => !v)}
              className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center "
            >
              <BtnSearch />
            </button>

            <BtnMenu
              open={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
            />
          </div>
        </div>
        {searchOpen && (
          <div id="search-popover" className="mt-2 lg:hidden">
            <SearchBox
              open
              value={query}
              onChange={setQuery}
              onSubmit={submitSearch}
              onClose={() => setSearchOpen(false)}
            />
          </div>
        )}
        <div
          id="primary-navigation"
          ref={menuRef}
          className={`mt-3 ${menuOpen ? "block" : "hidden"} lg:hidden`}
        >
          <MainMenu filter={query} />
        </div>
      </div>
    </header>
  );
}
