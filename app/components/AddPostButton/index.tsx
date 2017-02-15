import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import css from './style.scss';

const AddPostButton = () => {
  return (
    <Link to='/add_post'>
      <section className={css.addButton}>
        <FontAwesome name="plus" className={css.icon} />
      </section>
    </Link>
  );
}

export default AddPostButton;