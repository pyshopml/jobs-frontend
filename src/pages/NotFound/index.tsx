import * as React from 'react';

//import css from './style.scss';

interface Props {}
interface State {};

class NotFound extends React.Component<Props, State> {
  render() {
    return(
      <div>
        <h1>404 Not Found</h1>
      </div>
    )
  }
};


export default NotFound;