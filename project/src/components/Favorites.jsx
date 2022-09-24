import { useGlobalContext } from '../../context'

const Favorites = () => {
    const { favorites, selectPicture, removeFromFavorites } = useGlobalContext()

    return <section className="favorites">
        <div className="favorites-content">
            <h5>Favorites</h5>
            <div className="favorites-container">
                {favorites.map((item) => {
                    const { id, photo } = item;

                    return (
                        <div key={id} className="favorite-item" >
                            <img src={photo} className="favorites-img img" onClick={() => selectPicture(id, true)} />
                            <button className='remove-btn' onClick={() => removeFromFavorites(id)}>remove</button>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
}


export default Favorites