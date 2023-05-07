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

  console.log("the currentUser", currentUser);

  // USER PROFILE RENDER
  return (
    currentUser && (
      <div>
        {/* Header and profile picture */}
        <div className="relative">
          <ProfileHeader />
          <div className="absolute mt-[-80px] mx-4">
            <ProfilePicture currentUser={currentUser} />
          </div>
        </div>

        {/* User bio */}
        <div>
          <ProfileBio currentUser={currentUser} />
        </div>

        <section className="p-3 bg-slate-300">
          <h4 className="text-2xl text-slate-600">Collections</h4>
          <Grid container spacing={3}>
            {/* Available collections of this user will be rendered as cards here */}
            {!currentUser.collections ? (
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
          {/* Add new collection button */}

          <nav className="my-4">
            <Link to="/create-collection" className="m-2">
              <Button variant="contained">New collection</Button>
            </Link>
            <Link to="/create-item" className="m-2">
              <Button variant="contained">Add new item</Button>
            </Link>
            <Link to="/collections" className="m-2">
              <Button variant="outlined">Collections (redundant)</Button>
            </Link>
          </nav>
        </section>
      </div>
    )
  );
};

export default ProfilePage;
