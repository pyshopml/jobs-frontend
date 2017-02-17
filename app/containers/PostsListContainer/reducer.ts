import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_POSTS_FAILURE
} from './constants';

import IPost from '../../interfaces/ipost'

class InitialModel{
  public allPosts: IPost[];
  constructor(options: { allPosts: IPost[] }){
    this.allPosts = options.allPosts
  }
}

const initialModel = new InitialModel({
  allPosts: [{
    id: 1,
    url: "http://d8d2a038.ngrok.io/vacancies/1/",
    user: "none",
    title: "Python/Django backend developer",
    description: "We need you!!",
    created_on: new Date(),
    modified_on: new Date(),
    keywords: []
  }]
})

export default (state = initialModel, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return state;

    case LOAD_POSTS_SUCCEEDED:
      return Object.assign({}, state, { allPosts: action.posts });

    default:
      return state;
  }
}