import * as React from 'react';
import { Card } from 'elemental';
import { connect } from 'react-redux';

import Vacancy from 'models/Vacancy';
import { INewVacancy } from 'interfaces';
import Form from './components/Form';
import {createPost, handleCancel, loadCategories, loadKeywords} from './actions';
import selectors from './selectors';

import * as css from './style.scss';

interface Props {
  createdPost: Vacancy;
  createPost(post: INewVacancy);
  handleCancel();
  loadCategories(): void;
  loadKeywords(): void;
  availableCategories: {title: string, id: number, parent: number}[];
  possibleKeywords: string[];
};

interface State {};

class NewPost extends React.Component<Props, State> {
  onFormSubmit = (post: INewVacancy) => {
    this.props.createPost(post)
  };
  componentDidMount() {
    this.props.loadCategories();
    this.props.loadKeywords();
  }
  render() {
    return (
      <Card className={css.newPost}>
        <h1 className={css.title}>
          Новая вакансия
        </h1>
        <Form onSubmit={this.onFormSubmit} { ...this.props } />
      </Card>
    );
  }
};

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  createPost: (post: INewVacancy) => dispatch(createPost(post)),
  handleCancel: () => dispatch(handleCancel()),
  loadCategories: () => dispatch(loadCategories()),
  loadKeywords: () => dispatch(loadKeywords())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);