import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import debounce from 'tools/debounce';

import * as css from './style.scss';

interface State{
  openAutocomplete: boolean;
}

class LocationsField extends React.Component<any, State>{
  constructor(props){
    super(props);
    this.loadLocations = debounce(props.loadLocations, 500);
    this.state = {
      openAutocomplete: false
    }
  }
  refs: {
    root: HTMLDivElement
  }
  loadLocations;

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
    const { autocompleteStartsWith } = this.props;
    const { openAutocomplete } = this.state;

    if(this.props.onChange) this.props.onChange(value);

    if(value.length >= autocompleteStartsWith){
      this.loadLocations(value);
      if(!openAutocomplete) this.showAutocomplete()
    }else{
      this.hideAutocomplete()
    }
  }
  onAutocompleteClick = (e) => {
    const value = e.target.getAttribute('data-value');
    this.onAutocompleteChoise(value)
  }
  onAutocompleteChoise = (autocompleteVal) => {
    if(this.props.onChange) this.props.onChange(autocompleteVal);

    this.hideAutocomplete()
  }
  rootClass = () => {
    return classNames(css.root, this.props.className)
  }
  renderAutocomplete = () => {
    const { openAutocomplete } = this.state;
    const { locations, autocompleteLength } = this.props;
    if(!openAutocomplete) return null;
    return locations.slice(0, autocompleteLength).map( (location, i) => (
      <li data-value={location.name} onClick={this.onAutocompleteClick}
          className={css.autocompleteItem} key={i}>
        {location.name}
      </li>
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

export default LocationsField;