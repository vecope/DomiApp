import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Restaurants } from '../api/restaurants.jsx';

import RestaurantList from './RestaurantList';
import Filter from './Filter';
import Favs from './Favs';

import { Meteor } from 'meteor/meteor';

// App component - represents the whole app
class App extends Component {


    constructor(props){
        super(props);

        this.state = {
            currentlyViewing : 0,
            filtered:[]
        };

        this.selectList = this.selectList.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.selectFavorites = this.selectFavorites.bind(this);
    }

    selectList(){
        this.setState({
            currentlyViewing: 0
        });
    }

    selectFilter(){
        this.setState({
            currentlyViewing: 1
        });
    }

    selectFavorites(){
        console.log("2");
        this.setState({
            currentlyViewing: 2
        });
    }

    render() {
        return (
            <div className="container">
                <div className="opt-btn-cont">
                    <button className="OptBtn" onClick={this.selectList}>Restaurants list</button>
                    <button className="OptBtn" onClick={this.selectFilter}>Filters</button>
                    <button className="OptBtn" onClick={this.selectFavorites}>Favorites</button>
                </div>
                {this.state.currentlyViewing === 0?
                    <RestaurantList restaurants={this.props.restaurants} user={this.props.currentUser}/> : ""
                }
                {this.state.currentlyViewing === 1?
                    <Filter restaurants={this.props.restaurants} currentUser={this.props.currentUser}/> : ""
                }
                {this.state.currentlyViewing === 2?
                    <Favs currentUser={this.props.currentUser} favorites={this.props.favorites}/> : ""
                }
            </div>
        );
    }
}

App.propTypes = {
    restaurants: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    users: PropTypes.array.isRequired,
    favorites: PropTypes.array
};

export default createContainer(() => {

    Meteor.subscribe('restaurants');
    Meteor.subscribe('users');

    return {
        restaurants: Restaurants.find({}, { sort: { promedio: -1 } }).fetch(),
        currentUser: Meteor.user(),
        users: Meteor.users.find().fetch(),
        favorites: Restaurants.find({favs: Meteor.userId()}).fetch()
    };
}, App);