import { useGlobalContext } from '../../context'

const Modal = () => {
    const { selectedPic, closeModal } = useGlobalContext()
    const { photo, city, description, author, source } = selectedPic

    return (
        <aside className='modal-overlay'>
            <div className='modal-container'>
                <img src={photo} className="img modal-img" />
                <div className='modal-content'>
                    <h4>{city}</h4>
                    <p>{author}</p>
                    <p> {description}</p>
                    <a href={source} target="_blank">Original Source</a>
                    <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal
