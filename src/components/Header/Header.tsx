import MainMenu from "./MainMenu";

export default function Header() {
  return (
    <header>
      <nav className="nav-bar">
        <div className="profile">
          //*TODO: adicionar avatar quando assets estiverem no public
           <img src="/assets/img/geral/avatar.png" alt="Imagem de um Avatar" /> 
          <h2>Olá, Usuário!</h2>
          <p>Vamos te ajudar</p>
        </div>
        <MainMenu />
      </nav>
    </header>
  )
}
