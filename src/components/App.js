import {useEffect, useState} from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [currentUser, setCurrentUser] = useState({
    user_id: '',
    nama: '',
    title: '',
    avatar: '',
  });

  const user = api.getUserInfo();

  useEffect(() => {
    user.then((res) => {
      setCurrentUser({
        user_id: res._id,
        nama: res.name,
        title: res.about,
        avatar: res.avatar,
      });
    });
  }, []); // eslint-disable-line

  const [cardData, setCardData] = useState([]);

  // Refetch cards when currentUser changes
  useEffect(() => {
    const cards = api.getAllCards();
    cards.then((res) => {
      setCardData(res);
    });
  }, []); // eslint-disable-line

  return (
    <CurrentUserContext.Provider
      value={{
        user_id: currentUser.user_id,
        nama: currentUser.nama,
        title: currentUser.title,
        avatar: currentUser.avatar,
        currentUser,
        setCurrentUser,
      }}
    >
      <Header />

      <section className='profile'>
        <div className='profile__container'>
          <EditAvatarPopup
            avatar={currentUser.avatar ? currentUser.avatar : '#'}
            setUserData={setCurrentUser} // Assuming this is the correct prop for setting user data
          />
          <div className='profile__info'>
            <div className='profile__name-container'>
              <h1 className='profile__name'>
                {currentUser.nama ? currentUser.nama : '....'}
              </h1>
              <EditProfilePopup
                nama={currentUser.nama}
                title={currentUser.title}
                setUserData={setCurrentUser} // Assuming this is the correct prop for setting user data
              />
            </div>
            <p className='profile__title'>
              {currentUser.title ? currentUser.title : '....'}
            </p>
          </div>
          <AddPlacePopup setCardData={setCardData} />
        </div>
      </section>

      <Main cardData={cardData} setCardData={setCardData} />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
