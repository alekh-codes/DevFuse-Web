import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addRequests, removeRequest } from "@/utils/requestSlice";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [noRequests, setNoRequests] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(requestId));
      if (status === "accepted") {
        setToastMessage("Request accepted!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      }
      if (status === "rejected") {
        setToastMessage("Request rejected!");
        setShowToast(true);
        setBgColor("bg-red-500");
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      }
    } catch (err) {
      if (err.status === 400) {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNoRequests(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!requests) {
    return (
      <div className="text-xl text-center mt-20 font-bold text-white">
        {!noRequests ? (
          <>
            <span>DevFuse</span>
            <span className="loading loading-infinity text-4xl loading-xl"></span>
          </>
        ) : (
          <div className="mt-4">No requests found</div>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center mx-5 mt-10">
      <div className="shadow-[0_0_22px_22px_rgba(0,0,0,0.3)] bg-zinc-950/80 rounded-xl p-3 w-full max-w-xl">
        <h1 className="text-xl font-medium">Requests</h1>
        <hr className="mt-2 opacity-40" />

        {requests.length === 0 ? (
          <div className="text-center py-6 text-gray-400">No requests found</div>
        ) : (
          requests.map((request) => {
            if (!request.fromUserId) return null;
            const { _id, firstName, lastName, imagUrl, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row items-center justify-between m-3 sm:m-5 border-2 shadow-md border-gray-400/20 p-3 rounded-xl gap-4"
              >
                <div className="flex items-center justify-start gap-3 w-full sm:w-auto min-w-0">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0">
                    <img
                      src={`${BASE_URL}${imagUrl}`}
                      className="h-full w-full rounded-full object-cover"
                      alt={firstName}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[16px] md:text-xl truncate">
                      {lastName ? firstName + " " + lastName : firstName}
                    </p>
                    <p className="text-gray-300/60 text-sm sm:text-base line-clamp-1">{about}</p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="p-2 text-xl sm:text-2xl border-2 border-gray-500/80 hover:bg-green-400 transition-colors duration-500 ease-in-out hover:text-black cursor-pointer rounded-full"
                  >
                    <RiCheckLine />
                  </button>
                  <button
                    onClick={() => reviewRequest("rejected", request._id)}
                    className="p-2 text-xl sm:text-2xl border-2 border-gray-500/80 hover:bg-red-400 transition-colors duration-500 ease-in-out hover:text-black cursor-pointer rounded-full"
                  >
                    <RiCloseLine />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showToast && (
        <div className="toast toast-top toast-end mt-14">
          <div className={`alert alert-info border-none ${bgColor}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;