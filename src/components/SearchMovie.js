import React, { Component } from 'react'
import { Button, Form, FormGroup,  Input } from 'reactstrap';
import './Movies.css'
import axios from 'axios'
import { Card, CardImg,CardBody,CardTitle,Container,Row,Col,CardColumns } from 'reactstrap';
import MovieDetails from './MovieDetails';


export default class SearchMovie extends Component {

         constructor(props) {
             super(props)
         
             this.state = {
                   movie :'',
                   search :[],
                   details :{},  
                   modal: false
                  
             }
         }
         
 
   searchHandler = event =>{
       this.setState({
           movie: event.target.value
       })
   }

    onSubmitHandler = event=>{
        event.preventDefault()
        axios.get('http://www.omdbapi.com/?s='+this.state.movie+'&apikey=95632709')
        .then(response =>{
            this.setState({
                search : response.data.Search
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    onDetails = id =>{
        axios.get('http://www.omdbapi.com/?i='+id+'&apikey=95632709')
        .then(response =>{
            this.setState(prevState =>({
                details : response.data,
                modal: !prevState.modal
               
            }))
        })
        .catch(error =>{
            console.log(error)
        })
    }


    render() {
        return (
        <Container>
            <Row>
                 <Col>
            
                    <Form inline onSubmit={this.onSubmitHandler} className="App-Movie" >
                        <FormGroup className="mb-4 mr-sm-4 mb-sm-0" >
                        <Input type="text" value={this.state.movie} onChange={this.searchHandler} placeholder="Search for a movie!!" />
                        </FormGroup>
                        <Button type='submit' outline color="success" size="sm" >Search</Button>
                    </Form>
               </Col>
            </Row>
            <Row>
                 <Col>
                <CardColumns >
                    {this.state.search.map(item =>
                                <Card body outline color="success" >
                                    <CardImg top width="100%" src={item.Poster} alt="Card image cap" />
                                    <CardBody>
                                    <CardTitle key={item.imdbID}>{item.Title}</CardTitle>
                                    <Button outline color="success" size="sm" onClick={this.onDetails.bind(this,item.imdbID)} >Details</Button>
                                    </CardBody>
                                </Card>
         
                    )}
                 </CardColumns>
                 </Col>
            </Row>

               <MovieDetails modal = {this.state.modal} details ={this.state.details} onDetails = {this.onDetails}/>                  
            </Container>
        )
    }
}



