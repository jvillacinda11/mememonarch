import { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap'
// import User from '../../utils/User'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Posting from '../../components/Posting'

function Search() {
  //          Search User byusername

  // axios.get(`/api/searchUsers/byUsername/do`)
  // .then(({data : user}) => console.log(user))

  //          Search post by author id 

  // axios.get(`/api/searchPosts/byAuthor/60775be7beea745604e315b2`)
  // .then(({data :posts}) => console.log(posts))

  const [titleState, setTitleState] = 
  useState({
    title: '',
    titlePosts: []
  })

  const [tagState, setTagState] =
    useState({
      tag: '',
      tagPosts: []
    })

  const [resultsState, setResultsState] =
    useState({
      // item: '',
      results : []
    })
 

  const handleTitleInputChange = ({target}) => {
    setTitleState({ ...titleState, [target.name]: target.value})
  }

  const handleTagInputChange = ({target}) => {
    setTagState({ ...tagState, [target.name]: target.value})
  }  

  const handleSearchTitle = event =>{
    event.preventDefault()
    if(titleState.title){
    axios.get(`/api/searchPosts/byTitle/${titleState.title}`)
    //change the content after then
      .then(({data : titlePosts}) => {
        console.log(titlePosts)
        setTitleState({...titleState, title: '' })
        setResultsState({...titleState, results: titlePosts})
      })
      .catch(err => console.log(err))
    }
  }

  const handleSearchTag = event =>{
    event.preventDefault()
    if(tagState.tag){
    axios.get(`/api/searchPosts/byTag/${tagState.tag}`)
    //change the content after "then"
    .then(({data: tagPosts}) => {
      console.log(tagPosts)
      setTagState({ ...tagState, tag: ''})
      setResultsState({ ...tagState, results: tagPosts })
      // console.log(tagState.tagPosts)
    })
    .catch(err => console.log(err))
    }
  }

  return(
   <>
   {/* this is going to be the search by title form */}
   <Row className= 'searchBox'>
  <Form inline onSubmit = {handleSearchTitle}>
  <Container className ="center">
  <h4>Search by Title</h4>
    <Row xs ="4">
      <Col md='12' xs='12' className='inputLine'>
      <FormGroup className= "mb-2 mr-sm-2 mb-sm-0">
        <Label htmlFor= "title" className= "mr-sm-2"></Label>
        <Input
        type = 'text'
        name = 'title'
        value = {titleState.title}
        onChange = {handleTitleInputChange}
        ></Input>
      </FormGroup>
      </Col>
      <Col md='12' xs='12'>
       <Button onClick = {handleSearchTitle}>Search</Button> 
      </Col>
    </Row>
    
  </Container>
   </Form>

      <Form inline onSubmit={handleSearchTag}>
        <Container className="center">
          <h4>Search by Tag</h4>
          <Row xs="4">
            <Col md='12' xs='12' className='inputLine'>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label htmlFor="tag" className="mr-sm-2"></Label>
                <Input
                  type='text'
                  name='tag'
                  value={tagState.tag}
                  onChange={handleTagInputChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col md='12' xs='12'>
              <Button onClick ={handleSearchTag}>Search</Button>
            </Col>
          </Row>
          
        </Container>
      </Form>
      </Row>
      <Container>
      <Row>
      {
        resultsState.results.length
              ? resultsState.results.map((results, i) => <Posting 
              key={i}
               id={results._id}
               title={results.title}
               username={results.author.username}
               body={results.body}
               crowns={results.crowns}
               images={results.images}
               tags={results.tags}
               authid = {results.author._id}
               profilePage= {false}
               otherprofilepage={false}
               uploadpage={false}
               />)
          : null
      }

      </Row>
      </Container>
   </>
  )

}

export default Search;

// good reference https://github.com/oze4/react-navbar-search-with-routing
