const MyCard = ({ posts }) => {
  return(
    <div>
      <h1>title: {posts.title}</h1>
      <h3>{posts.body}</h3>
    </div>
  )
}
 export default MyCard