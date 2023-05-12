import { useContext } from "react";
import Button from "@mui/material/Button";
import UserStatistics from "./UserStatistics";
import CategoryTags from "./CategoryTags";
import { UserDataContext } from "../../context/userData.context";

const ProfileBio = () => {
  const { userData } = useContext(UserDataContext);
  console.log(userData);

  return (
    <div className="grid grid-auto-rows bg-slate-600 px-4 h-30 py-2">
      <div className="text-right pt-3 pb-4">
        <Button variant="contained">Edit Profile</Button>
      </div>
      <div>
        <div className="flex">
          {/* Username */}
          <h2 className="mr-4 self-end text-3xl text-white m-0">
            {userData.username}
          </h2>

          {/* Pronouns */}
          <i className="text-md text-white self-end p-1 ml-2">
            {/* Should be ({userData.pronouns}), but waiting for updated User model and Edit profile function. Leaving placeholder for now.*/}
            {/* ({userData.pronouns}) */}
            (they/them)
          </i>
        </div>

        {/* Statistics (Followers, Collections, Items) */}
        <div className="my-2">
          <UserStatistics />
        </div>

        {/* UserBio */}
        <p className="text-white text-lg">
          {/* Needs to be replaced with {userData.userBio} once the Edit Profile function is ready.
          Leaving Lorem ipsum for testing purposes for now. */}
          {/* {userData.userBio} */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Display user's category/interests tags */}
        <div className="flex">
          <div className="mr-3">
            <CategoryTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
