import React, { Component } from 'react';

//import css from './style.scss';

interface Props {}
interface State {};

class NotFound extends Component<Props, State> {
  render() {
    return(
      <div>
        <h1>404 Not Found</h1>
      </div>
    )
  }
};


export default NotFound;