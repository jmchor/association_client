import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileBio from "../components/Profile/ProfileBio";
import ProfilePicture from "../components/Profile/ProfilePicture";
import CollectionCard from "../components/Collections/CollectionCard";

const API_URL = "http://localhost:5005";

// DETERMINE CURRENT USER
const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`${API_URL}/users/${user._id}`)
        .then((res) => {
          setCurrentUser(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  // USER PROFILE RENDER

  if (currentUser.categories || currentUser.collections) {
    return (
      <div id="main-content">
        {/* Header and profile picture block */}
        <div className="relative">
          <ProfileHeader />
          <div className="absolute mt-[-80px] mx-4">
            <ProfilePicture currentUser={currentUser} />
          </div>
        </div>

        {/* User bio, needs to be added to User model */}
        <div>
          <ProfileBio currentUser={currentUser} />
        </div>

        <section className="p-3 bg-slate-300">
          <h4 className="text-2xl text-slate-600">Collections</h4>
          <Grid container spacing={3}>
            {/* Available collections of this user will be rendered as cards here */}
            {currentUser.collections.length < 1 ? (
              <p>No collections available</p>
            ) : (
              currentUser.collections.map((collection) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <CollectionCard
                        key={collection._id}
                        collection={collection}
                      />
                    </Grid>
                  </>
                );
              })
            )}
          </Grid>

          <h4 className="text-2xl text-slate-600">Interests</h4>
          <Grid container spacing={3}>
            {/* Available categories of this user will be rendered as cards here */}
            {currentUser.categories.length < 1 ? (
              <Grid item xs={12} sm={6} md={4} lg={3}>
              <p>No categories available</p>
              </Grid>
            ) : (
              currentUser.categories.map((category) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <h5>{category}</h5>

                    </Grid>
                  </>
                );
              })
            )}
          </Grid>
          {/* Add new collection button */}

          <nav className="my-4">
            <Link to="/create-collection" className="m-2">
              <Button variant="contained">New collection</Button>
            </Link>
          </nav>
        </section>
      </div>
    );
  }
};

export default ProfilePage;
