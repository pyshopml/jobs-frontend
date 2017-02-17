import React, { Component } from 'react';

import IPost from '../../interfaces/ipost';

import PostsListSearchBar from '../PostsListSearchBar';
import PostsListHeader from '../PostsListHeader';
import Post from '../Post';


interface Props{
  posts: IPost[]
};
interface State{};

class Home extends Component<Props, State> {
  allPosts = () => {
    return this.props.posts.map((post, index)=> {
      return <Post key={post.id} post={post}/>
    })
  };
  render() {
    return (
      <div>
        <PostsListSearchBar/>
        <PostsListHeader resultLength={this.props.posts.length}/>
        {
          this.allPosts()
        }
      </div>
    );
  }
}

export default Home;