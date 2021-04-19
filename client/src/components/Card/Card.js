const MyCard = ({ posts }) => {
  return(
    <div>
      <h3>title: {posts.title}</h3>
      <h4>Author: {posts.author.username}</h4>
      <p>{posts.body}</p>
      <p>Tags: {posts.tags}</p>
      <p>crowns: {posts.crowns}</p>
    </div>
  )
}
 export default MyCard