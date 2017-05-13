import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import * as css from './style.scss';


interface State{
  autocompleteStrings: string[];
  openAutocomplete: boolean;
}

class TextField extends React.Component<any, State>{
  constructor(props){
    super(props);
    this.state = {
      autocompleteStrings: [],
      openAutocomplete: false
    }
  }
  refs: {
    root: HTMLDivElement
  }

  showAutocomplete = () => {
    this.setState({openAutocomplete: true})
    document.addEventListener('click', this.onOutsideClick)
  }
  hideAutocomplete = () => {
    this.setState({openAutocomplete: false})
    document.removeEventListener('click', this.onOutsideClick)
  }

  onOutsideClick = (evt) => {
    const area = ReactDOM.findDOMNode(this.refs.root);
    if (!area.contains(evt.target)) this.hideAutocomplete()

  }

  onChange = (value) => {
    if(this.props.type == 'number'){
      if(!this.isValueNumber(value)) return;
    }
    if(this.props.onChange) this.props.onChange(value);

    if(this.props.autocomplete){
      this.setState({
        autocompleteStrings: this.filterAutocomplete(value),
      })
      if(!this.state.openAutocomplete) this.showAutocomplete()
    }
  }
  onAutocompleteClick = (e) => {
    const value = e.target.getAttribute('data-value');
    this.onAutocompleteChoise(value)
  }
  onAutocompleteChoise = (autocompleteVal) => {
    if(this.props.onChange) this.props.onChange(autocompleteVal);

    this.setState({
      autocompleteStrings: this.filterAutocomplete(autocompleteVal),
    })
    this.hideAutocomplete()

  }
  filterAutocomplete = (value: string) => {
    const { autocomplete, autocompleteLength } = this.props;

    let result = autocomplete.filter( (item) => item.toLowerCase().indexOf(value.toLowerCase()) == 0);
    if(autocompleteLength){
      result = result.slice(0, autocompleteLength)
    }
    return result;
  }
  isValueNumber(value){
    return !isNaN(value)
  }
  rootClass = () => {
    return classNames(css.root, this.props.className)
  }
  renderAutocomplete = () => {
    const { autocompleteStrings, openAutocomplete } = this.state;
    if(!openAutocomplete || !this.props.value) return null;
    return autocompleteStrings.map( (string, i) => (
      <li data-value={string} onClick={this.onAutocompleteClick} className={css.autocompleteItem} key={i}>{string}</li>
    ))
  }
  render(){
    return(
      <div ref="root" className={this.rootClass()}>
        <input value={this.props.value}
               autoComplete={this.props.autoComplete}
               className={css.input}
               onChange={(e) => this.onChange(e.target.value)}
               type="text" />
        <ul className={css.autocompleteWrap}>
          {this.renderAutocomplete()}
        </ul>
      </div>
    )
  }
}

export default TextField;