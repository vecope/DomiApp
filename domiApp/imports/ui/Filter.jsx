import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Restaurant from './Restaurant';

export default class Filter extends Component{

    constructor(props){
        super(props);

        this.state = {
            filtered:[]
        };

        this.handleSearch = this.handleSearch.bind(this);
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

    renderFiltered(){
        return this.state.filtered.map((restaurant) => (
            <Restaurant key={restaurant._id} restaurant={restaurant} user={this.props.currentUser} />
        ));
    }

    render(){
        return(
            <div>
                <form className="filter-restaurant" onSubmit={this.handleSearch} >
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
            </div>
        )
    }
}

Filter.propTypes = {
    restaurants: PropTypes.array.isRequired
};