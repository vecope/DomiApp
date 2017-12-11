import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Restaurant extends Component {

    constructor(props){
        super(props);
        this.state={
            refe:"https://www.facebook.com/"+ "LaWaira/"
        }
    }

    handleClick(event){

        event.preventDefault();
        var f = event.target.title;
        var res = f.split(" ");

        var grad = res[2];
        console.log(res);
        console.log(res[2]);


        console.log(this.props.restaurant._id);

        Meteor.call('restaurants.setGrade', this.props.restaurant._id, grad, function(error, result){

            if (!error || error.err!="already voted" && result!=undefined) {
                alert("Vote send!");

            } else {
                alert("You've already voted this restaurant");
            }
        });

    }

    markFavorite(event){

        event.preventDefault();

        Meteor.call('users.setFav', this.props.restaurant._id,function(error, result){
            if(error){
                alert("You've already marked this restaurant as favorite");
            }else{
                alert("marked as favorite!");
            }
        });

    }

    render() {
        return (
            <div>
                <li>{this.props.restaurant.nombre}
                    <p>Dir:{this.props.restaurant.direccion}</p>
                    <p>Tel:{this.props.restaurant.numero}</p>
                    <p>Descripcion:{this.props.restaurant.descripcion}</p>
                    <a href={this.props.restaurant.sitio} target="_blank">Visit web site</a>
                    <img className="list-image"
                         src={this.props.restaurant.imagen}
                         alt={"Imagen del restaurante "+this.props.restaurant.nombre}/>
                    <p>Points:{this.props.restaurant.promedio}</p>
                    {this.props.user?
                        <button className="fav" id="favButton" onClick={this.markFavorite.bind(this)}
                                style={{display:"initial"}}>
                            &nbsp;
                            Favorite</button>
                        :
                        <button className="fav" id="favButton" onClick={this.markFavorite.bind(this)}
                                style={{display:"none"}}>
                            &nbsp;
                            Favorite</button>
                    }

                    {this.props.user ?
                        <div className="col-md-5 px-1" id="stars">
                            <fieldset className="rating" onClick={this.handleClick.bind(this)} id="campo">
                                <input type="radio" id="star5" name="rating" value="5"/><label className="full" htmlFor="star5" title="Awesome - 5 stars" ref="5"></label>
                                <input type="radio" id="star4half" name="rating" value="4.5"/><label className="half" htmlFor="star4half" title="PrettyGood - 4.5 stars"></label>
                                <input type="radio" id="star4" name="rating" value="4"/><label className="full" htmlFor="star4" title="PrettyGood - 4 stars"></label>
                                <input type="radio" id="star3half" name="rating" value="3.5"/><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                                <input type="radio" id="star3" name="rating" value="3"/><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
                                <input type="radio" id="star2half" name="rating" value="2.5"/><label className="half" htmlFor="star2half" title="KindaBad - 2.5 stars"></label>
                                <input type="radio" id="star2" name="rating" value="2"/><label className="full" htmlFor="star2" title="KindaBad - 2 stars"></label>
                                <input type="radio" id="star1half" name="rating" value="1.5"/><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                                <input type="radio" id="star1" name="rating" value="1"/><label className="full" htmlFor="star1" title="SucksBigTime - 1 star"></label>
                                <input type="radio" id="starhalf" name="rating" value="0.5"/><label className="half" htmlFor="starhalf" title="SucksBigTime - 0.5 stars"></label>
                            </fieldset>
                        </div> : ''
                    }
                    {console.log("refe"+this.state.refe)}
                </li>
            </div>

        );
    }
}

Restaurant.propTypes = {

    restaurant: PropTypes.object.isRequired
};
