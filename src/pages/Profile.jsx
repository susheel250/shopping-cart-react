import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/authService";

import "./Profile.css";
import Loader from "../components/Loader";

function Profile() {

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();

      setProfile(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        name: profile.name,
        mobile: profile.mobile,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword({
        currentPassword:
          passwordData.currentPassword,

        newPassword:
          passwordData.newPassword,
      });

      toast.success("Password changed successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.error || "Failed to change password");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {/* Profile Section */}
      <div className="profile-card">
        <h2>Personal Information</h2>

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={profile.email}
              disabled
            />
          </div>

          <button type="submit">
            Update Profile
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="profile-card">
        <h2>Change Password</h2>

        <form
          onSubmit={handleChangePassword}
        >
          <div className="form-group">
            <label>
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={
                passwordData.currentPassword
              }
              onChange={
                handlePasswordChange
              }
            />
          </div>

          <div className="form-group">
            <label>
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={
                passwordData.newPassword
              }
              onChange={
                handlePasswordChange
              }
            />
          </div>

          <div className="form-group">
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={
                passwordData.confirmPassword
              }
              onChange={
                handlePasswordChange
              }
            />
          </div>

          <button type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;