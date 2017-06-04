import * as React from 'react';
import * as classNames from 'classnames';
import { FormSelect, FormLabel, Checkbox, FormField, Glyph } from 'elemental';

import TextField from 'components/TextField';

import * as css from './style.scss';

interface Props{
  keywords: {id: number, value: string}[];
  onChange?: (keywords: {id: number, value: string}[]) => any;
  possibleKeywords: string[];
  className?: string;
  autocompleteLength: number;
  autocompleteStartsWith: number;
}

class KeywordsField extends React.Component<Props, null>{
  addKeyword = () => {
    const { keywords  } = this.props;

    const newKeywords = keywords.slice();
    newKeywords.push({value: '', id: Date.now()});

    this.onChange(newKeywords);
  }
  removeKeyword = (index: number) => {
    const { keywords } = this.props;

    const newKeywords = keywords.slice();
    newKeywords.splice(index, 1);
    this.onChange(newKeywords);
  }
  updateKeywordValue = (index: number, value: string) => {
    const { keywords } = this.props;

    const newKeywords = keywords.slice();
    newKeywords[index] = {...newKeywords[index], value};
    this.onChange(newKeywords);
  }
  onChange = (keywords) => {
    if(this.props.onChange){
      this.props.onChange(keywords)
    }
  }
  renderKeywords = () => {
    const {
      keywords, possibleKeywords,
      autocompleteLength, autocompleteStartsWith
    } = this.props;

    return (
      keywords.map((item, index) => (
        <FormField className={css.keywordsFormField} key={item.id}>
          <TextField value={ keywords[index].value }
                     autocomplete={possibleKeywords}
                     autocompleteLength={autocompleteLength}
                     autocompleteStartsWith={autocompleteStartsWith}
                     onChange={(value) => this.updateKeywordValue(index, value)}
                     className={css.keywordField}/>
          <a className={css.removeKeyword} href=""
             onClick={ (e) => { e.preventDefault(); this.removeKeyword(index) } }
          >
            <Glyph icon="x" />
          </a>
        </FormField>
      ))
    )
  }
  rootClass = () => {
    return classNames(this.props.className)
  }
  render(){
    return (
      <div className={this.rootClass()}>
        <div className={css.keywordsWrap}>
          {this.renderKeywords()}
        </div>
        <a href="" className={css.addKeyword}
           onClick={ (e) => { e.preventDefault(); this.addKeyword()} }
        >Добавить</a>
      </div>
    )
  }
}

export default KeywordsField;