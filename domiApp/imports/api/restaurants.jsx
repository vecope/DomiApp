import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Restaurants = new Mongo.Collection('restaurants');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('restaurants', function restaurantsPublication() {
        return Restaurants.find();
    });

    Meteor.publish('users', function usersPublication() {
        return Meteor.users.find();
    });
}

Meteor.methods({

    'restaurants.setGrade'(restId, grade) {
        //check(restId, String);
        check(grade, String);

        var a = Number(grade);

        var cond = {likers: this.userId, _id: restId};

        if (Restaurants.find(cond).fetch().length === 0) {

            Restaurants.update(restId, {$push: {"grades": a}});
            var lista = Restaurants.findOne({_id:restId}).grades;
            var contador=0;
            var acumulado=0;

            for(var i=0; i<lista.length;i++){
                acumulado+=lista[i];
                contador++;
            }

            var avg = acumulado/contador;

            Restaurants.update(restId, { $set: { promedio: avg } });

            Restaurants.update(restId, {$push: {"likers": this.userId}});

        } else {
            throw Error("already voted");
        }

    },

    'users.setFav'(restId) {


        var cond = {favs: this.userId, _id: restId};

        if (Restaurants.find(cond).fetch().length === 0) {
            Meteor.users.update(this.userId, { $push: { "favs": restId } });
            Restaurants.update(restId, {$push: {"favs": this.userId}} )
        }
        else{
            throw Error("already marked as favorite");
        }


    }
});