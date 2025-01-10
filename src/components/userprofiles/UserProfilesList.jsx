import { useEffect, useState } from 'react';
import {
  activateUserProfile,
  deactivateUserProfile,
  getProfiles,
} from '../../managers/userProfileManager';
import { Link } from 'react-router-dom';
import './UserProfilesList.css';

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };
  useEffect(() => {
    getUserProfiles();
  }, []);

  const handleDeactivateBtnClick = (userId) => {
    const activeAdmins = userProfiles.filter(
      (up) => up.roles.includes('Admin') && !up.isDeactivated
    );

    if (activeAdmins.length === 1 && activeAdmins[0].id === userId) {
      alert(
        'You cannot deactivate the last remaining admin. Please promote another user to admin first.'
      );
      return;
    }
    const userConfirmed = window.confirm(
      'Are you sure you want to deactivate this user?'
    );

    if (userConfirmed) {
      deactivateUserProfile(userId).then(() => getUserProfiles());
    }
  };

  const handleActivateBtnClick = (userId) => {
    activateUserProfile(userId).then(() => getUserProfiles());
  };

  return (
    <>
      <h3>User Profile List</h3>
      {userProfiles.map((p) => (
        <div className="user-wrapper" key={p.id}>
          <p>
            <span>Full Name:</span> {p.fullName} <span>Username:</span>{' '}
            {p.userName} <Link to={`/userprofiles/${p.id}`}>Details</Link>
          </p>
          {p.roles.includes('Admin') && <p>[Admin]</p>}
          {p.isDeactivated ? (
            <button onClick={() => handleActivateBtnClick(p.id)}>
              Activate
            </button>
          ) : (
            <button onClick={() => handleDeactivateBtnClick(p.id)}>
              Deactivate
            </button>
          )}
        </div>
      ))}
    </>
  );
}
