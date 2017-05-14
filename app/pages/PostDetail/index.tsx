import * as React from 'react';
import { ContentState, EditorState } from 'draft-js';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import createEditorState from 'tools/createEditorState';
import TextEditor from 'components/TextEditor';
import { loadPost } from './actions';
import Vacancy from 'models/Vacancy'

import selectors from './selectors';

import * as css from './style.scss';
import * as vacancyItemCss from "../Vacancies/components/VacancyItem/style.scss";


interface Props {
  openedPost: Vacancy;
  loadPost(id: number);
  isLoading: boolean;
  params: {
    id: string
  }
}

interface State {};

class PostDetail extends React.Component<Props, State> {
  editorState: EditorState = null;    

  componentDidMount(){
    this.props.loadPost(+this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.params.id != nextProps.params.id)
      this.props.loadPost(+nextProps.params.id);
  }

  renderKeywords = () => {
    const { openedPost: {keywords} } = this.props;

    return keywords.map((keyword, i) => <span key={i} className={vacancyItemCss.keyword}>{keyword}</span>)
  }

  renderCategories = () => {
    const { openedPost: {category} } = this.props;

    return category.map((category, i) =>
      <span key={i} className={vacancyItemCss.category}>{category.title}</span>).reverse()
  }

  renderLoading(){
    return(
      <CircularProgress />
    )
  }

  getEditorState = () => {
    if(!this.editorState) {
      this.editorState = createEditorState(
        ContentState.createFromText(this.props.openedPost.description)
      )
    }
    return this.editorState
  }

  render() {
    if(this.props.isLoading)
      return this.renderLoading();

    const {
      title,
      created_on,
      salary_text,
      keywords,
      busyness_text,
      location_text
    } = this.props.openedPost;

    return (
      <article>
        <section className={`${css.header} ${css.container}`}>
          <div className={vacancyItemCss.info}>
            <h1 className={vacancyItemCss.title}>{title}</h1>
            <div className={vacancyItemCss.categories}>{this.renderCategories()}</div>
            {keywords.length > 0 ? <div className={vacancyItemCss.keywords}>{this.renderKeywords()}</div> : null}
            {busyness_text ? <span className={vacancyItemCss.busyness}>{busyness_text}</span> : null}
            {location_text ? <span className={vacancyItemCss.location}>{location_text}</span> : null}
            {salary_text ? <span className={vacancyItemCss.salary}>{salary_text}</span> : null}
          </div>
          <span className={vacancyItemCss.date}>{created_on}</span>
        </section>

        <section className={css.container}>
          <h2 className={css.title}>Описание вакансии</h2>
          <TextEditor editorState={this.getEditorState()}
                      onChange={null}
                      readOnly
          />
        </section>
      </article>
    );
  }
};

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPost: (id: number) => dispatch(loadPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);