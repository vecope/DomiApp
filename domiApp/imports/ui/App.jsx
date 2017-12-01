import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Restaurants } from '../api/restaurants.jsx';
import Restaurant from './Restaurant.jsx';

import { Meteor } from 'meteor/meteor';

// App component - represents the whole app
class App extends Component {


    constructor(props){
        super(props);

        this.state = {
            filtered:[]
        }

    }

    handleSearch(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        console.log(text);



        let filtr = this.props.restaurants.filter((restaurant)=>(
            restaurant.nombre.toLowerCase() == text.toLowerCase()
        ));

        this.setState({
            filtered:filtr
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    showFavorites(){
        var f = document.getElementById('showFavs');
        f.style.display = "initial";
    }


    renderRestaurants() {
        return this.props.restaurants.map((restaurant) => (
            <Restaurant key={restaurant._id} restaurant={restaurant} user={this.props.currentUser}/>
        ));
    }

    renderFiltered(){

        return this.state.filtered.map((restaurant) => (
            <Restaurant key={restaurant._id} restaurant={restaurant} user={this.props.currentUser} />
        ));
    }

    renderFavorites(){
        return this.props.favorites.map((restaurant) => (
            <Restaurant key={restaurant._id} restaurant={restaurant} user={this.props.currentUser}/>
        ));
    }

    render() {
        return (
            <div className="container">

                <header>
                    <h1>Restaurant list</h1>
                </header>

                {this.props.currentUser ? console.log(Meteor.user().services.facebook.gender): console.log('aun no encuentra el username')}


                <ul>
                    {this.renderRestaurants()}
                </ul>


                <form className="filter-restaurant" onSubmit={this.handleSearch.bind(this)} >
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Type to find restaurants"
                    />
                </form>
                <p>Results</p>

                <ul>
                    {this.renderFiltered()}
                </ul>

                {this.props.currentUser ?

                    <div>

                        <p>Favorites</p>
                        <button onClick={this.showFavorites.bind(this)}>Show Favorites</button>
                        <ul id="showFavs" style={{display: "none"}}>
                            {this.renderFavorites()}
                        </ul>

                    </div>: ''
                }

            </div>
        );
    }
}

App.propTypes = {
    restaurants: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    favorites: PropTypes.array
};

export default createContainer(() => {
    return {
        restaurants: Restaurants.find({}, { sort: { promedio: -1 } }).fetch(),
        currentUser: Meteor.user(),
        favorites: Restaurants.find({favs: Meteor.userId()}).fetch()
    };
}, App);