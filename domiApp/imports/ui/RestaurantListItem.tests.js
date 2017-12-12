import React from "react";
import { shallow } from "enzyme";
import { chai } from "meteor/practicalmeteor:chai";
import RestaurantListItem from "./RestaurantListItem";


describe("Controls", () => {
  it("should render", () => {

    const ListItem = shallow(<Controls onMove={this.onMove}></Controls>);
    chai.assert(RestaurantListItem.hasClass("list-item"));
    chai.assert(RestaurantListItem.find("input").length, 10);
  });
});
