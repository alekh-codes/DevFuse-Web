import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { StarsBackground } from "./components/stars";

const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Feed = lazy(() => import("./components/Feed"));
const ProfileCard = lazy(() => import("./components/ProfileCard"));
const Profile = lazy(() => import("./components/Profile"));
const Error = lazy(() => import("./components/Error"));
const Connections = lazy(() => import("./components/Connections"));
const Requests = lazy(() => import("./components/Requests"));
const EditPassword = lazy(() => import("./components/EditPassword"));
function App() {
  return (
    <StarsBackground pointerEvents={false}>

      <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
         <Suspense fallback={<div className="flex justify-center items-center font-medium text-3xl h-screen">
          <div className="flex items-center justify-center gap-3">
            <span>DevFuse</span>
            <span className="loading loading-infinity text-4xl loading-xl"></span>
          </div>
         </div>}>
           <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Feed/>} />
              <Route path="/profile" element={<ProfileCard/>} />
              <Route path="/profile/edit" element={<Profile/>} />
              <Route path="/error" element={<Error/>} />
              <Route path="/connections" element={<Connections/>} />
              <Route path="/requests/received" element={<Requests/>} />
              <Route path="/edit/password" element={<EditPassword/>} />

            </Route>
          </Routes>
         </Suspense>
        </BrowserRouter>
      </Provider>
    </>
    </StarsBackground>
  );
}

export default App;
