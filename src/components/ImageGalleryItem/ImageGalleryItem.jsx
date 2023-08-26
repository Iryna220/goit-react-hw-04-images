import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, openModal }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItem__image}
        src={webformatURL}
        alt=""
        onClick={() => openModal({ src: largeImageURL })}
      />
    </li>
  );
};

export default ImageGalleryItem;
