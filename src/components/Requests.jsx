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
  const [toastMessage,setToastMessage] = useState("");
  const [showToast,setShowToast] = useState(false);
  const [bgColor,setBgColor] = useState("");
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
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
      if(status === "accepted"){
        setToastMessage("Request accepted!");
          setShowToast(true);
        setTimeout(() => {
          setShowToast(false)
        }, 2000);
      }
      if(status === "rejected"){
        setToastMessage("Request rejected!");
        setShowToast(true);
          setBgColor("bg-red-500")
        setTimeout(() => {
          setShowToast(false)
        }, 2000);
      }
    } catch (err) {
      if (err.status === 400) {
        navigate("/error")
      }
    }
  };

  const requestRemove = (id) =>{
    setTimeout(() => {
      dispatch(removeRequest(id));
    }, 2000);
  }

  if (!requests) return;



  return (
    <div className="flex justify-center">
      {
        requests.length === 0 ? (<h1 className="text-xl mt-20 font-bold text-white">No requests found!</h1>) : (
           <div className="shadow-xl bg-[#464343] rounded-xl p-2 m-20">
        <h1 className="text-xl font-medium">Requests</h1>
        <hr className="mt-2 opacity-40" />
        {requests.map((request) => {
          const { _id, firstName, lastName, imagUrl, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center justify-between m-5 border-2 shadow-md border-gray-400/20 p-2 rounded-xl"
            >
              <div className="flex">
                <div className="">
                  <img
                    src={imagUrl}
                    className="h-20 w-20 rounded-full"
                    alt=""
                  />
                </div>
                <div className="m-3">
                  <p className="font-bold text-xl">
                    {lastName ? firstName + " " + lastName : firstName}
                  </p>
                  <p className="text-gray-300/60">{about}</p>
                </div>
              </div>
              <div className="mx-4 flex ">
                <button
                  onClick={() => {
                    reviewRequest("accepted", request._id)
                    requestRemove(request._id)
                }}
                  className="p-2 mx-2 text-2xl border-2 border-gray-500/80 hover:bg-green-400 transition-colors duration-500 ease-in-out hover:text-black cursor-pointer rounded-full"
                >
                  <RiCheckLine />
                </button>
                <button
                  onClick={() => {
                    reviewRequest("rejected", request._id)
                    requestRemove(request._id)
                }}
                  className="p-2 mx-2 text-2xl border-2 border-gray-500/80 hover:bg-red-400 transition-colors duration-500 ease-in-out hover:text-black cursor-pointer rounded-full"
                >
                  <RiCloseLine />
                </button>
              </div>
            </div>
          );
        })}
      </div>
        )
      }
      {
            showToast && (
                 <div className="toast toast-top  toast-end mt-10">
          <div className={`alert alert-info border-none ${bgColor}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
             )
        } 
      
        
          
    </div>
  );
};

export default Requests;
