import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfileDetails.css';
import {
  demoteUser,
  getProfile,
  getProfiles,
  promoteUser,
} from '../../managers/userProfileManager';
import { UploadAvatar } from './UploadAvatar';

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();
  const [userProfiles, setUserProfiles] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProfiles().then((data) => setUserProfiles(data));
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
    const activeAdmins = userProfiles.filter(
      (up) => up.roles.includes('Admin') && !up.isDeactivated
    );

    if (activeAdmins.length === 1 && activeAdmins[0].id === parseInt(id)) {
      alert(
        'You cannot demote the last remaining admin. Please promote another user to admin first.'
      );
      return;
    }
    const userConfirmed = window.confirm(
      'Are you sure you want to demote this user?'
    );
    if (userConfirmed) {
      demoteUser(id).then(() => getProfile(id).then(setUserProfile));
    }
  };

  return (
    <>
      <img
        className="profile-pic"
        src={
          userProfile.imageLocation.startsWith('http')
            ? userProfile.imageLocation // Use absolute URL as-is (e.g., robohash.org)
            : `http://localhost:5000${userProfile.imageLocation.replace(
                / /g,
                '%20'
              )}` // Handle relative paths with spaces encoded
        }
        alt={userProfile.firstName}
      />
      <UploadAvatar
        id={id}
        onUploadSuccess={() => getProfile(id).then(setUserProfile)}
      />
      <h3>{userProfile.fullName}</h3> <p>Username: {userProfile.userName}</p>{' '}
      <p>Email: {userProfile.email}</p>{' '}
      <p>Profile created on: {formateDate(userProfile.createDateTime)}</p>{' '}
      <p>
        {' '}
        Profile Type: {userProfile.roles.includes('Admin')
          ? 'Admin'
          : 'Author'}{' '}
      </p>{' '}
      {userProfile.roles.includes('Admin') ? (
        <button onClick={handleDemoteBtnClick}>Demote User</button>
      ) : (
        <button onClick={handlePromoteBtnClick}>Promote</button>
      )}{' '}
    </>
  );
}
