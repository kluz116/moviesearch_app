import React, { Component } from 'react'
import SearchMovie from './SearchMovie';
import NavBar from './NavBar';

export default class Movie extends Component {
    render() {
        return (
            <div>
                  <NavBar></NavBar>
                  <SearchMovie></SearchMovie>
            </div>
        )
    }
}
