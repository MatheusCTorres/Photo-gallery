import Photo from "./components/Photos"
import Search from "./components/Search"
import Modal from "./components/Modal"
import Favorites from "./components/Favorites"
import { useGlobalContext } from "../context";

// CSS
import './css/App.css'

function App() {
  const { showModal, favorites } = useGlobalContext()

  return (
    <main>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Photo />
      {showModal && <Modal />}
    </main>
  )
}

export default App
