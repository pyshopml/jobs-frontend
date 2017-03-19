import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import css from './style.scss';

const AddPostButton = () => {
  return (
    <Link to='/vacancies/new'>
      <section className={css.addButton}>
        <FontAwesome name="plus" className={css.icon} />
      </section>
    </Link>
  );
}

export default AddPostButton;