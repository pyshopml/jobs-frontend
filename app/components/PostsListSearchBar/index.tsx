import * as React from 'react';
import * as css from './style.scss';

interface Props{};
interface State{};

class PostsListSearchBar extends React.Component<Props, State> {
  render() {
    return (
       <div className={css.searchBar}>
         <input type="text" placeholder="Поиск.."/>
       </div>
    );
  }
}

export default PostsListSearchBar;