import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import * as css from './style.scss';;

class AddPostButton extends React.Component<null, null> {
  render() {
    return (
      <Link to='/vacancies/new'>
        <section className={css.addButton}>
          <FontAwesome name="plus" className={css.icon} />
        </section>
      </Link>
    );
  }
}

export default AddPostButton;