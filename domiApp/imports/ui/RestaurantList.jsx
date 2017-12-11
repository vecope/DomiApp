import React, {Component} from 'react';
import PropTypes from 'prop-types';

import RestaurantListItem from './RestaurantListItem';

export default class RestaurantList extends Component{

    constructor(props){
        super(props);
        // this.state={
        //     //Anything that actually goes into the class' state
        // }
    }

    renderRestaurants() {
        return this.props.restaurants.map((restaurant) => (
            <RestaurantListItem key={restaurant._id} restaurant={restaurant} user={this.props.user}/>
        ));
    }

    render(){
        return(
            <div>
                <div className="res-list">
                    <ul className="restaurants-list">
                        {this.renderRestaurants()}
                    </ul>
                </div>
            </div>
        )
    }
}


RestaurantList.propTypes = {
    restaurants: PropTypes.array.isRequired
};
