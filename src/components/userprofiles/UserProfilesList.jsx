import { useEffect, useState } from "react";
import {
  getProfiles,
  getDeactivatedProfiles,
  getActiveProfiles,
  reactivateProfile,
  deactivateProfile,
} from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [showDeactivated, setShowDeactivated] = useState(false);

  // Separate useEffect to load all profiles initially
  useEffect(() => {
    console.log("Loading all profiles with roles initially...");
    getProfiles()
      .then((profiles) => {
        console.log("Loaded profiles with roles:", profiles);
        setUserProfiles(profiles);
      })
      .catch((error) =>
        console.error("Error loading initial profiles with roles:", error)
      );
  }, []); // Only runs once when the component mounts

  useEffect(() => {
    console.log(`Fetching ${showDeactivated ? "deactivated" : "active"} profiles after state update.`);
    fetchProfiles();
  }, [showDeactivated]);
  

  // Function to fetch active or deactivated profiles dynamically
  const fetchProfiles = () => {
    console.log(
      `Fetching ${showDeactivated ? "deactivated" : "active"} profiles`
    );

    if (showDeactivated) {
      getDeactivatedProfiles()
        .then((profiles) => {
          console.log("Fetched deactivated profiles from backend:", profiles);
          setUserProfiles(profiles);
        })
        .catch((error) =>
          console.error("Error fetching deactivated profiles:", error)
        );
    } else {
      getActiveProfiles()
        .then((profiles) => {
          console.log("Fetched active profiles from backend:", profiles);
          setUserProfiles(profiles);
        })
        .catch((error) =>
          console.error("Error fetching active profiles:", error)
        );
    }
  };

  // Deactivate a user profile
  const handleDeactivate = (id) => {
    if (window.confirm(`Are you sure you want to deactivate the user with ID: ${id}?`)) {
      console.log(`Initiating deactivation for user with ID: ${id}`);
      deactivateProfile(id)
        .then(() => {
          console.log(`Deactivation completed for user with ID: ${id}`);
          fetchProfiles(); // Refresh the data
        })
        .catch((error) =>
          console.error(`Error during deactivation of user with ID: ${id}`, error)
        );
    }
  };

  // Reactivate a user profile
  const handleReactivate = (id) => {
    if (window.confirm(`Are you sure you want to reactivate the user with ID: ${id}?`)) {
      console.log(`Initiating reactivation for user with ID: ${id}`);
      reactivateProfile(id)
        .then(() => {
          console.log(`Reactivation completed for user with ID: ${id}`);
          fetchProfiles(); // Refresh the data
        })
        .catch((error) =>
          console.error(`Error during reactivation of user with ID: ${id}`, error)
        );
    }
  };

  return (
    <>
      <h2>User Profile List</h2>
      <button onClick={() => setShowDeactivated(!showDeactivated)}>
        {showDeactivated ? "View Active Users" : "View Deactivated Users"}
      </button>
      <ul>
        {userProfiles.map((p) => (
          <li key={p.id}>
            {p.firstName} {p.lastName} - {p.userName}
            {showDeactivated ? (
              <button onClick={() => handleReactivate(p.id)}>Reactivate</button>
            ) : (
              <button onClick={() => handleDeactivate(p.id)}>Deactivate</button>
            )}
            <Link to={`/userprofiles/${p.id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
