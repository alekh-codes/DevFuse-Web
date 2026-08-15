
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-40 flex flex-col justify-center items-center text-white">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-xl mt-4">
        Something went wrong!
      </p>

      <button
        onClick={() => navigate("/profile")}
        className="mt-6 px-6 py-2 rounded-lg bg-white text-black"
      >
        Go Home
      </button>
    </div>
  );
};

export default Error;