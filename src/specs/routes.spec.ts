import * as expect from "expect";
import * as React from "react";
import { mount, shallow } from "enzyme";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import routes from "../routes";

describe("Router", () => {
  it("history should use pushState", () => {
    expect(routes.props.history).toBe(browserHistory);
  });

  it("should route to the Search component on /", () => {
    // TODO: How do I test this?
  });

  it("should route to the Search component on /search/:query", () => {
    // TODO: How do I test this?
  });

  it("should route to the Definition component on /define/:word", () => {
    // TODO: How do I test this?
  });

  it("should route to the Definition component on /define/:word/:index", () => {
    // TODO: How do I test this?
  });
});