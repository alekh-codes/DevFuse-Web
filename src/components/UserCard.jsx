const UserCard = ({user}) =>{
    return(
        <div className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={user.imagUrl}
      alt= {user.firstName}
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{user.firstName + " " + user.lastName === "" ? "" : user.lastName}</h2>
    <p>{user.about}</p>
    <div className="card-actions flex justify-between">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-primary">Interested</button>
    </div>
  </div>
</div>
    )
}
export default UserCard