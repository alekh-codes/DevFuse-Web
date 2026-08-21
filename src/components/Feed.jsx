import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addfeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { RiCheckLine } from "react-icons/ri";
import GradientText from "./GradientText";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addfeed(res?.data?.data || []));
    } catch (err) {
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading || !feed) {
    return null;
  }

  if (feed.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <GradientText
          colors={["#75e9ee", "#56ee0e", "#2b52f0"]}
          animationSpeed={4}
          showBorder={false}
          className="custom-class"
        >
          <h1 className="font-bold text-2xl mt-20 text-sm md:text-2xl">
            All caught up! Check back later for new profiles
          </h1>
        </GradientText>

        <RiCheckLine className="text-3xl md:text-6xl mt-5 bg-green-600 p-2 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-87.5 h-130 flex justify-center items-center">
        {feed.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
      <p className="xl:hidden mx-2 text-center text-gray-200/40 font-medium">Swipe left to ignore and right to show interest.</p>
    </div>
  );
};

export default Feed;