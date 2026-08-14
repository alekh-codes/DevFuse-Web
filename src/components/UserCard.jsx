const UserCard = ({user}) =>{
  const {firstName, lastName,about,imagUrl,age,gender} = user;
    return(
        <div className="card bg-[#464343] w-96 shadow-lg ">
  <figure className="px-10 pt-10 relative group">
    <img
      src={imagUrl}
      alt= {firstName}
      className="rounded-xl h-50 w-full object-cover" />
    
    <div className="absolute bottom-0 left-10 right-10 bg-black/60 text-white p-2 rounded-b-xl flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out backdrop-blur-sm">
      <p className="text-sm font-medium"><span className="text-xl font-medium">{gender} | </span>{age}</p>
    </div>
  </figure>
  
  <div className="card-body text-white">
    <div className="ml-5">      
    <h2 className="card-title">{lastName ? `${firstName} ${lastName}` : firstName}</h2>
    <p className="">{about}</p>
    </div>
    <div className="card-actions flex justify-evenly w-full mt-7">
      <button title="ignore" className="btn bg-red-500/60 rounded-xl border-none">Ignore</button>
      <button title="interested" className="btn bg-blue-600  rounded-xl border-none">Interested</button>
    </div>
  </div>
</div>
    )
}
export default UserCard