import { createContext, useContext, useState, useEffect } from "react"
import Axios from "axios"

const AppContext = createContext()
// const Allpic = "http://localhost:4000/picDesc?"
const Allpic = "https://app-gallery-photo.herokuapp.com/picDesc/"

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
        favorites = []
    }
    return favorites
}

const AppProvider = ({ children }) => {
    const [pic, setPic] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [selectedPic, setSelectedPic] = useState(null)
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())
    const [loading, setLoading] = useState(false)

    const fetchPics = async (url) => {
        setLoading(true)
        try {
            const { data } = await Axios.get(url)
            if (data) {
                setPic(data)
            } else {
                setPic([])
            }
        } catch (err) {
            console.log(err.response)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPics(Allpic)
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        fetchPics(`${Allpic}${searchTerm}`)
    }, [searchTerm])

    const selectPicture = (id, favoritePic) => {
        let picture
        if (favoritePic) {
            picture = favorites.find((picture) => picture.id === id)
        } else {
            picture = pic.find((picture) => picture.id === id)
        }

        setSelectedPic(picture)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addFavorite = (id) => {
        const picture = pic.find((picture) => picture.id === id)
        const alreadyFavorite = favorites.find((picture) => picture.id === id)

        if (alreadyFavorite) return
        const updatedFavorites = [...favorites, picture]
        setFavorites(updatedFavorites)
    }

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter((picture) => picture.id !== id)
        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    return (
        <AppContext.Provider value={{ loading, pic, setSearchTerm, showModal, removeFromFavorites, selectedPic, selectPicture, addFavorite, closeModal, favorites }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {
    AppContext,
    AppProvider
}