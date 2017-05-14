import * as React from 'react';
import { Card } from 'elemental';
import { connect } from 'react-redux';

import Vacancy from 'models/Vacancy';
import { INewVacancy } from 'interfaces';
import Form from './components/Form';
import {createVacancy, handleCancel, loadCategories, loadKeywords} from './actions';
import selectors from './selectors';

import * as css from './style.scss';

interface Props {
  createdVacancy: Vacancy;
  createVacancy(vacancy: INewVacancy);
  handleCancel();
  loadCategories(): void;
  loadKeywords(): void;
  availableCategories: {title: string, id: number, parent: number}[];
  possibleKeywords: string[];
};

interface State {};

class NewVacancy extends React.Component<Props, State> {
  onFormSubmit = (vacancy: INewVacancy) => {
    this.props.createVacancy(vacancy)
  };
  componentDidMount() {
    this.props.loadCategories();
    this.props.loadKeywords();
  }
  render() {
    return (
      <Card className={css.newVacancy}>
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
  createVacancy: (vacancy: INewVacancy) => dispatch(createVacancy(vacancy)),
  handleCancel: () => dispatch(handleCancel()),
  loadCategories: () => dispatch(loadCategories()),
  loadKeywords: () => dispatch(loadKeywords())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewVacancy);