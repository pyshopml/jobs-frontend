import React, { Component } from 'react';
import css from './style.scss'

interface Props{};
interface State{};

class PostsListSearchBar extends Component<Props, State> {
  render() {
    return (
       <div className={css.searchBar}>
         <input type="text" placeholder="Поиск.."/>
       </div>
    );
  }
}

export default PostsListSearchBar;