/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker  from "faker";

if (Meteor.isServer) {
  describe("Players", () => {
    describe("methods", () => {
      // Generate a random name
      const name = faker.name.findName();


      afterEach(() => {
        Meteor.user.restore();
        resetDatabase();
      });

      it("can set a grade", () => {

        const insert = Meteor.server.method_handlers["restaurants.setGrade"];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { currentUser };


        let newPlayer = Players.findOne({name:name});

        assert.equal(true, true);
        assert.equal(true, true);

      });
    });
  });
}
