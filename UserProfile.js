import React from 'react';

const UserProfile = ({ user }) => {
  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;