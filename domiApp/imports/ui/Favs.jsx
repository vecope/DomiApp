import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Restaurant from './Restaurant';
import {Meteor} from "meteor/meteor";

export default class Favs extends Component{

    constructor(props){
        super(props);

        this.showFavorites = this.showFavorites.bind(this);
    }

    showFavorites(){
        var f = document.getElementById('showFavs');
        f.style.display = "initial";
    }

    renderFavorites(){
        console.log("rend2");
        console.log(this.props.favorites.length);
        return this.props.favorites.map((restaurant) => (
            <Restaurant key={restaurant._id} restaurant={restaurant} user={this.props.currentUser}/>
        ));
    }

    render(){
        return(
            <div>
                {this.props.currentUser ?

                    <div>
                        <p>Favorites</p>
                        <button onClick={this.showFavorites}>Show Favorites</button>
                        <ul id="showFavs" style={{display: "none"}}>
                            {this.renderFavorites()}
                        </ul>
                    </div>: ''
                }
            </div>
        )
    }
}

Favs.propTypes = {
    favorites: PropTypes.array.isRequired
};

