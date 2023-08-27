import styles from './App.module.css';
import { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPicturesQuery } from 'service/api';

const App = () => {
  const [search, setSearch] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [largeImage, setlargeImage] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [totalHits, settotalHits] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchPictures = async () => {
      try {
        setLoading(true);
        const data = await fetchPicturesQuery(search, page);
        data.hits.length === 0
          ? toast.error('Nothing found')
          : setPictures(prevPictures => [...prevPictures, ...data.hits]);
        settotalHits(data.totalHits);
      } catch (error) {
        setError({ error: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchPictures();
  }, [search, page]);

  const searchPictures = newSearch => {
    setSearch(newSearch);
    setPictures([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage.page + 1);
  };
  const openModal = data => {
    setshowModal(true);
    setlargeImage(data);
  };
  const toggleModal = () => {
    setshowModal(!showModal);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={searchPictures} />
      {pictures.length !== 0 && (
        <ImageGallery pictures={pictures} openModal={openModal} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {loading && <Loader />}
      {error && <p>Something goes wrong</p>}
      {totalHits > pictures.length && !loading && <Button onClick={loadMore} />}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default App;
