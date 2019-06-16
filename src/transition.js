import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import cx from 'classnames';
import Item01 from './components/Item01';
import Item02 from './components/Item02';
import Item03 from './components/Item03';
import './transition.css';

class Base extends Component {
  render() {
    return (
      <Router>
        <Route component={App} />
      </Router>
    );
  }
}

class App extends Component {
  state = {
    showBalloon: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      showBalloon: !prevState.showBalloon,
    }));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ showBalloon: false });
    }
  }

  render() {
    const { location } = this.props;
    return (
      <div className="container">
        <button
          className={cx('toggler', {
            'toggler--active': this.state.showBalloon,
          })}
          onClick={this.toggle}
        >
          Items:
        </button>
        <CSSTransition
          in={this.state.showBalloon}
          timeout={350}
          classNames="balloon"
          unmountOnExit
        >
          <div className="menu">
            <ul className="list">
              <li className="list-item">
                <Link to="/">Item01</Link>
              </li>
              <li className="list-item">
                <Link to="/item02">Item02</Link>
              </li>
              <li className="list-item">
                <Link to="/item03">Item03</Link>
              </li>
            </ul>
          </div>
        </CSSTransition>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="swipe"
            timeout={500}
          >
            <div className="swipe-container">
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  component={Item01}
                />
                <Route
                  exact
                  path="/item02"
                  component={Item02}
                />
                <Route
                  exact
                  path="/item03"
                  component={Item03}
                />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default Base;

