import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Favrestaurant from './favRestaurant';

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
            <Favrestaurant key={restaurant._id} restaurant={restaurant} user={this.props.currentUser}/>
        ));
    }

    render(){
        return(
            <div>
                {this.props.currentUser ?
                    <div className = "fav-container">
                        <h1>Favorites</h1>
                        <ul id="showFavs">
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

