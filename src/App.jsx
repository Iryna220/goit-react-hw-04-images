import styles from './App.module.css';
import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPicturesQuery } from 'service/api';

export default class App extends Component {
  state = {
    search: '',
    pictures: [],
    page: 1,
    error: null,
    loading: false,
    largeImage: null,
    showModal: false,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPictures();
    }
  }

  async fetchPictures() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await fetchPicturesQuery(search, page);
      data.hits.length === 0
        ? toast.error('Nothing found')
        : this.setState(({ pictures }) => ({
            pictures: [...pictures, ...data.hits],
          }));
      this.setState({ totalHits: data.totalHits });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchPictures = ({ search }) => {
    this.setState({ search, pictures: [], page: 1 });
  };
  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  openModal = data => {
    this.setState({
      showModal: true,
      largeImage: data,
    });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { pictures, loading, largeImage, error, totalHits, showModal } =
      this.state;
    const { searchPictures, loadMore, openModal, toggleModal } = this;
    return (
      <div className={styles.App}>
        <Searchbar
          onSubmit={this.searchPictures}
          searchPictures={searchPictures}
        />
        {pictures.length !== 0 && (
          <ImageGallery pictures={pictures} openModal={openModal} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        {loading && <Loader />}
        {error && <p>Something goes wrong</p>}
        {totalHits > pictures.length && !loading && (
          <Button onClick={loadMore} />
        )}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
