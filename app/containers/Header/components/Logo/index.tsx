import * as React from 'react';
import { Link } from 'react-router';

import * as css from './style.scss';

interface Props{};
interface State{};

class Logo extends React.Component<Props, State> {
  render() {
    return (
      <h1 className={css.logo}>
        <Link to="/">PyJobs</Link>
      </h1>
    );
  }
}

export default Logo;