const UserCard = ({user}) =>{
  const {firstName, lastName,about,imagUrl,age,gender,skills} = user;
    return(
        <div className="p-6 flex flex-col justify-center items-center w-100 bg-[#464343] rounded-xl shadow-xl text-center ">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#7df9ff] shadow-[0_0_15px_rgba(125,249,255,0.3)] mb-4">
              <img
                src={imagUrl}
                alt={firstName}
                className="w-full h-full object-fit"
              />
              
            </div>

            <h1 className="text-2xl text-white font-bold tracking-wide">
              {lastName ? `${firstName} ${lastName}` : firstName}
            </h1>

            <p className="text-sm text-zinc-400 mt-1 capitalize font-medium">
              {gender} {gender && age ? "·" : ""} {age}
            </p>

            <p className="text-sm text-zinc-300 mt-4 leading-relaxed max-w-xs">
              {about}
            </p>

            <div className="mt-5 w-full">
              <h3 className="text-xs uppercase font-semibold text-zinc-400 mb-2 tracking-wider">
                Skills & Interests
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full text bg-zinc-900/80 text-[#0ff7f7] border-2 border-zinc-400 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm mt-7 flex gap-5 ">
              <button className="cursor-pointer bg-red-500 p-2 text-white border-white border-2 rounded-xl">Ignore</button>
              <button className="cursor-pointer bg-blue-500 p-2 text-white border-white border-2 rounded-xl">Interested</button>

            </div>
          </div>
    )
}
export default UserCard