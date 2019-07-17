import React, { Component } from 'react'
import { Button, Form, FormGroup,  Input } from 'reactstrap';
import './Movies.css'
import axios from 'axios'
import { Card, CardImg,CardBody,CardTitle,CardDeck,Row,Col,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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

    Details = id =>{
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
        <div>
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
            
                
                <CardDeck >
                    {this.state.search.map(item =>
                       
                                <Card >
                                    <CardImg top width="20%" src={item.Poster} alt="Card image cap" />
                                    <CardBody>
                                    <CardTitle key={item.imdbID}>{item.Title}</CardTitle>
                                    <Button outline color="success" size="sm" onClick={this.Details.bind(this,item.imdbID)} >Details</Button>
                                    </CardBody>
                                </Card>
         
                    )}
                    </CardDeck>


            
            <Modal isOpen={this.state.modal} toggle={this.Details} className={this.props.className}>
                <ModalHeader toggle={this.Details}>{this.state.details.Title}</ModalHeader>
                <ModalBody>
                     <Col>
                        <div>
                            <p> {this.state.details.Plot}</p>
                            <p> {this.state.details.Year}</p>
                            <p> {this.state.details.Rated}</p>
                            <p> {this.state.details.Released}</p>
                            <p> {this.state.details.Runtime}</p>
                            <p> {this.state.details.Genre}</p>
                            <p> {this.state.details.Director}</p>
                            <p> {this.state.details.Writer}</p>
                            <p> {this.state.details.Writer}</p>
                        </div> 
                     </Col>
                   
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.Details}>OK</Button>{' '}
                    <Button color="secondary" onClick={this.Details}>Cancel</Button>
                </ModalFooter>
             </Modal>
                    
            </div>
        )
    }
}



