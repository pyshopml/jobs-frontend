import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import * as css from './style.scss';


interface State{
  openAutocomplete: boolean;
}

class TextField extends React.Component<any, State>{
  constructor(props){
    super(props);
    this.state = {
      openAutocomplete: false
    }
  }
  refs: {
    root: HTMLDivElement
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onOutsideClick)
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
    const { type, autocompleteStartsWith } = this.props;
    if(type == 'number'){
      if(!this.isValueNumber(value)) return;
    }
    if(this.props.onChange) this.props.onChange(value);
    if(autocompleteStartsWith && value.length >= autocompleteStartsWith) this.showAutocomplete()
    else this.hideAutocomplete()
  }
  onAutocompleteClick = (e) => {
    const value = e.target.getAttribute('data-value');
    this.onAutocompleteChoise(value)
  }
  onAutocompleteChoise = (autocompleteVal) => {
    if(this.props.onChange) this.props.onChange(autocompleteVal);

    this.hideAutocomplete()
  }
  filterAutocomplete = (autocomplete) => {
    const { value, autocompleteLength } = this.props;

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
    const { openAutocomplete } = this.state;
    const { autocomplete } = this.props;

    if(!openAutocomplete) return null;

    return this.filterAutocomplete(autocomplete).map( (string, i) => (
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
        {this.props.autocomplete ?
          <ul className={css.autocompleteWrap}>
            {this.renderAutocomplete()}
          </ul> : null
        }
      </div>
    )
  }
}

export default TextField;