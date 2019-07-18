import React, { Component } from 'react'
import { Button,Col,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class MovieDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
             
        }
        this.Details = this.Details.bind(this)
    }
    
    Details = ()=>{
        this.props.onDetails()
    }
    render() {
        const {Plot,Year,Rated,Released,Runtime,Genre,Director,Writer,Title} = this.props.details
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.Details} className={this.props.className}>
                <ModalHeader toggle={this.Details}>{Title}</ModalHeader>
                <ModalBody>
                     <Col>
                        <div>
                            <p> {Plot}</p>
                            <p> {Year}</p>
                            <p> {Rated}</p>
                            <p> {Released}</p>
                            <p> {Runtime}</p>
                            <p> {Genre}</p>
                            <p> {Director}</p>
                            <p> {Writer}</p>
                            <p> {Writer}</p>
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
