import { useRef, useState } from "react";
import { logo } from "@/assets/images";
import MainMenu from "./MainMenu";
import BtnMenu from "../Button/BtnMenu";
import BtnSearch from "../Button/BtnSearch";
import SearchBox from "./SearchBox";

/**
 * Componente de cabeçalho da aplicação
 * Exibe avatar do usuário, saudação e menu principal
 */
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
<header className="w-full bg-gradient-to-b from-fromColor to-toColor">
  <div className="mx-auto w-full max-w-screen-xl px-6 sm:px-8 lg:px-10 xl:px-12">
    {/* linha do header */}
<div
  className="
    flex items-center justify-between 
    h-16 sm:h-20 lg:h-24            /* <<< aumentei a altura do header */
    lg:grid lg:grid-cols-[auto_1fr_auto] lg:justify-items-center lg:gap-4
    min-w-0
  "
>
{/* Logo */}
<a className="shrink-0 lg:pl-2 xl:pl-4" href="/">
  {/* Wrapper controla o TAMANHO, não a <img> diretamente */}
  <div
    className="
      h-14 w-14               
      sm:h-16 sm:w-16         
      md:h-18 md:w-18         
      lg:h-20 lg:w-20         
      xl:h-24 xl:w-24      
      shrink-0
    "
  >
    <img
      src={logo}
      alt="Imagem da logo do LumaHC"
      className="h-full w-full object-contain max-h-none max-w-none select-none"
      draggable={false}
    />
  </div>
</a>


      {/* Menu central */}
      <div className="hidden lg:flex lg:justify-self-center">
        <div className="flex flex-nowrap items-center gap-3 whitespace-nowrap">
          <MainMenu filter={query} />
        </div>
      </div>

      {/* Ações (placeholder em lg para equilibrar) */}
      <div
        className="
          flex items-center gap-2 sm:gap-3 lg:opacity-0 lg:pointer-events-none lg:block
          pr-[env(safe-area-inset-right)]
        "
      >
        <button
          type="button"
          aria-label="Buscar"
          aria-expanded={searchOpen}
          aria-controls="search-popover"
          onClick={() => setSearchOpen(v => !v)}
          className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center lg:hidden"
        >
          <BtnSearch />
        </button>
        <div className="lg:hidden">
          <BtnMenu open={menuOpen} onClick={() => setMenuOpen(v => !v)} />
        </div>
      </div>
    </div>

    {/* Popover de busca (mobile) */}
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

    {/* Menu colapsado (mobile) */}
    <div
      id="primary-navigation"
      ref={menuRef}
      className={`mt-3 ${menuOpen ? 'block' : 'hidden'} lg:hidden`}
    >
      <MainMenu filter={query} />
    </div>
  </div>
</header>

  );
}
