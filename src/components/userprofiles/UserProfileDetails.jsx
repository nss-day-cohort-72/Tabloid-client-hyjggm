import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  demoteUser,
  getProfile,
  promoteUser,
} from '../../managers/userProfileManager';

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then(setUserProfile);
  }, [id]);

  if (!userProfile) {
    return null;
  }

  const formateDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-US');

    return formattedDate;
  };

  const handlePromoteBtnClick = () => {
    const userConfirmed = window.confirm(
      'Are you sure you want to promote this user?'
    );

    if (userConfirmed) {
      promoteUser(id).then(() => getProfile(id).then(setUserProfile));
    }
  };

  const handleDemoteBtnClick = () => {
    const userConfirmed = window.confirm(
      'Are you sure you want to demote this user?'
    );

    if (userConfirmed) {
      demoteUser(id).then(() => getProfile(id).then(setUserProfile));
    }
  };

  return (
    <>
      <img src={userProfile.imageLocation} alt={userProfile.firstName} />
      <h3>{userProfile.fullName}</h3>
      <p>Username: {userProfile.userName}</p>
      <p>Email: {userProfile.email}</p>
      <p>Profile created on: {formateDate(userProfile.createDateTime)}</p>
      <p>
        {' '}
        Profile Type: {userProfile.roles.includes('Admin') ? 'Admin' : 'Author'}
      </p>
      {userProfile.roles.includes('Admin') ? (
        <button onClick={handleDemoteBtnClick}>Demote User</button>
      ) : (
        <button onClick={handlePromoteBtnClick}>Promote</button>
      )}
    </>
  );
}
