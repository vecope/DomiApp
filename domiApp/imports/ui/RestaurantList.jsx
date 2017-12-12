import React, {Component} from 'react';
import PropTypes from 'prop-types';

import RestaurantListItem from './RestaurantListItem';

import Pagination from 'react-js-pagination';

export default class RestaurantList extends Component{

    constructor(props){
        super(props);
        this.state = {
            activePage: 1
        };
    }

    renderRestaurants() {
        var inicial = this.state.activePage;
        var actual = this.props.restaurants.slice((inicial*4)-4, (inicial*4));
        console.log(this.props.restaurants);
        console.log(actual);
        return actual.map((restaurant) => (
            <RestaurantListItem key={restaurant._id} restaurant={restaurant} user={this.props.user}/>
        ));
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    renderPagination(){
        return(
          <div className="pagination">
              <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={4}
                  totalItemsCount={this.props.restaurants.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
              />
          </div>
        );
    }

    render(){
        return(
            <div>
                <div className="res-list">
                    <ul className="restaurants-list">
                        {this.renderRestaurants()}
                    </ul>
                    {this.renderPagination()}
                </div>
            </div>
        )
    }
}


RestaurantList.propTypes = {
    restaurants: PropTypes.array.isRequired
};
