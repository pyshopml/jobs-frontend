import * as React from 'react';
import { Button } from 'elemental';
import { ContentState, EditorState} from 'draft-js';
import { FormSelect, FormLabel, Checkbox, FormField, Form as ElementalForm, FormRow, Glyph } from 'elemental';

import TextField from 'components/TextField';
import KeywordsField from 'components/KeywordsField';
import DropdownField from 'components/DropdownField';

import DescriptionEditor from '../DescriptionEditor';
import { INewPost } from 'interfaces';

import createEditorState from 'tools/createEditorState';

import * as css from './style.scss';

interface Props {
  createPost(post: INewPost),
  onSubmit(post: INewPost)
};

interface State {
  fields: {
    title: string,
    description: EditorState,
    salary_min: string,
    salary_max: string,
    location: {
      country: string,
      city: string
    },
    busyness: number,
    remote_work: boolean,
    keywords: {value: string, id: number}[],
    category: number,
  }
};

class Form extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        title: '',
        salary_min: '',
        salary_max: '',
        location: {
          country: '',
          city: '',
        },
        busyness: null,
        remote_work: false,
        keywords: [],
        category: null,
        description: createEditorState()
      }
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { fields: { description, keywords, salary_max, salary_min }, fields } = this.state;

    const data = {
      ...fields,
      description: description.getCurrentContent().getPlainText(),
      salary_max: +salary_max,
      salary_min: +salary_min,
      keywords: this.parseKeywords(keywords),
    };
    console.log(data);
    this.props.onSubmit(data)
  }

  updateField = (name: string, value) => {
    const { fields } = this.state;

    this.setState({fields: { ...fields, [name]: value}});
  }
  updateLocationField = (name: string, value) => {
    const { fields: { location }, fields } = this.state;

    this.setState({fields: { ...fields, location: {...location, [name]: value} }});
  }
  clearFields = () => {
    const description = EditorState.push(
      this.state.fields.description,
      ContentState.createFromText(''),
      "adjust-depth"
    );
    this.setState({ fields: {
      title: '',
      salary_min: '',
      salary_max: '',
      location: {
        country: '',
        city: '',
      },
      busyness: null,
      remote_work: false,
      keywords: [],
      category: null,
      description
    } });
  }
  isFieldsValid = () => {
    return true;
  }

  parseKeywords = (keywords: {value: string, id: number}[]): string[] => {
    const result = [];
    keywords.forEach(function(item){
      result.push(item.value);
    })
    return result
  }
  render() {
    const { fields: {
      title,
      salary_min,
      salary_max,
      location: { country, city },
      description,
      category,
      busyness,
      remote_work,
      keywords
    } } = this.state;

    return(
      <ElementalForm>
        <FormField>
          <FormLabel className={css.fieldRequired}>Название вакансии</FormLabel>
          <TextField name="title"
                     value={ title }
                     onChange={(evt) => this.updateField(evt.target.name, evt.target.value)}/>
        </FormField>
        <FormField>
          <FormLabel className={css.fieldRequired}>Описание</FormLabel>
          <DescriptionEditor editorState={ description }
                             onChange={
                               (state) => this.updateField("description", state)
                             }
          />
        </FormField>

        <FormField>
          <FormLabel>Вознаграждение</FormLabel>
          <FormRow>
            <FormField>
              <FormLabel>От</FormLabel>
              <TextField name="salary_min"
                         type="number"
                         value={ salary_min }
                         onChange={(evt) => this.updateField(evt.target.name, evt.target.value)}/>
            </FormField>
            <FormField>
              <FormLabel>До</FormLabel>
              <TextField name="salary_max"
                         type="number"
                         value={ salary_max }
                         onChange={(evt) => this.updateField(evt.target.name, evt.target.value)}/>
            </FormField>
          </FormRow>
        </FormField>

        <FormField>
          <FormLabel>Категория</FormLabel>
          <DropdownField value={ category }
                      placeholder="Выберете"
                      onChange={(option) => this.updateField('category', option.value)}
                      options={[{label: 'category0', value: 0}, {label: 'category1', value: 1}]}/>
        </FormField>

        <FormRow>
          <FormField>
            <FormLabel>Страна</FormLabel>
            <TextField name="country"
                       value={ country }
                       onChange={(evt) => this.updateLocationField(evt.target.name, evt.target.value)}/>
          </FormField>
          <FormField>
            <FormLabel>Город</FormLabel>
            <TextField name="city"
                       value={ city }
                       onChange={(evt) => this.updateLocationField(evt.target.name, evt.target.value)}/>
          </FormField>
        </FormRow>

        <FormField>
          <FormLabel>Тип занятости</FormLabel>
          <DropdownField value={ busyness }
                      placeholder="Выберете"
                      onChange={(option) => this.updateField('busyness', option.value)}
                      options={[
                        {label: 'Полный рабочий день', value: 0},
                        {label: 'Частичная занятость', value: 1},
                        {label: 'Проект', value: 2}
                      ]}/>
        </FormField>

        <FormField>
          <FormLabel>Удалённая работа</FormLabel>
          <Checkbox label="Рассматривается"
                    name="remote_work"
                    checked={ remote_work }
                    onChange={(evt) => this.updateField(evt.target.name, evt.target.checked)}/>
        </FormField>

        <FormField>
          <FormLabel>Ключевые слова</FormLabel>
          <KeywordsField keywords={keywords}
                         onChange={(keywords) => this.updateField('keywords', keywords)}/>
        </FormField>

        <div className={ css.controls }>
          <Button type="hollow-primary" onClick={this.clearFields}>
            Очистить
          </Button>
          <Button type="primary"
                  onClick={this.handleSubmit}
                  disabled={!this.isFieldsValid()}
                  submit
          >
            Создать
          </Button>
        </div>
      </ElementalForm>
    )
  }
}

export default Form;
