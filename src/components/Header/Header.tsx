import { useState } from "react";
import { logo } from "@/data/imagesData";
import MainMenu from "./MainMenu";
import BtnMenu from "../Botao/BtnMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full h-auto bg-gradient-to-b from-fromColor to-toColor py-5 z-[2]">
      <nav className="nav-bar container mx-auto px-4">
        {/* Topo */}
        <div className="flex items-center justify-between">
          <div className="absolute right-4">
            <BtnMenu open={open} onClick={() => setOpen(!open)} />
          </div>
          <div className="flex flex-col items-center mb-4 text-center">
            <img
              src={logo}
              alt="Imagem da logo do Lumahc"
              className="w-20 h-20 rounded-full p-[3px]"
            />

          </div>
        </div>

        {/* Menu principal */}
        <div className={`mt-3 ${open ? "block" : "hidden"} lg:block`}>
          <MainMenu />
        </div>
      </nav>
    </header>
  );
}
