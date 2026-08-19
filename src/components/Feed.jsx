import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addfeed, addMoreFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { RiCheckLine } from "react-icons/ri";
import GradientText from "./GradientText";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async (pageNumber) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/feed?page=${pageNumber}&limit=10`,
        {
          withCredentials: true,
        }
      );

      const newUsers = res?.data?.data || [];

      setHasMore(res?.data?.hasMore);

      if (pageNumber === 1) {
        dispatch(addfeed(newUsers));
      } else {
        dispatch(addMoreFeed(newUsers));
      }

    } catch (err) {
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeed(1);
  }, []);

  useEffect(() => {
    if (feed && feed.length === 0 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [feed, loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      getFeed(page);
    }
  }, [page]);

  if (!feed) return null;

  if (feed.length === 0 && !loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <GradientText
          colors={["#75e9ee", "#56ee0e", "#2b52f0"]}
          animationSpeed={4}
          showBorder={false}
          className="custom-class"
        >
          <h1 className="font-bold text-2xl mt-20">
            All caught up! Check back later for new profiles
          </h1>
        </GradientText>

        <RiCheckLine className="text-6xl mt-12 bg-green-600 p-2 rounded-full" />
      </div>
    );
  }

  if (loading && feed.length === 0) {
    return (
      <div className="flex justify-center items-center mt-20">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="text-black text-2xl flex justify-center">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;