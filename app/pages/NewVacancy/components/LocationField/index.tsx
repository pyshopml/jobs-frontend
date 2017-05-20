import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import * as css from './style.scss';


interface State{
  locations: {name: string, all_names: string[]}[];
  openAutocomplete: boolean;
}

class LocationsField extends React.Component<any, State>{
  constructor(props){
    super(props);
    this.state = {
      locations: [],
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
    if(this.props.onChange) this.props.onChange(value);

    if(this.props.locations){
      this.setState({
        locations: this.filterAutocomplete(value),
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
      locations: this.filterAutocomplete(autocompleteVal),
    })
    this.hideAutocomplete()

  }
  filterAutocomplete = (value: string) => {
    const { locations, autocompleteLength } = this.props;

    let result = locations.filter( (location) => {
      const locationNameLow = location.name.toLowerCase();
      const valueLow = value.toLowerCase();
      const altNames = location.alt_names;
      if(locationNameLow.indexOf(valueLow) == 0) return true;

      for (let i = 0; i < altNames.length; i++){
        const name = altNames[i].toLowerCase();
        if(name.indexOf(valueLow) == 0) return true;
      }
      return false;
    });

    if(autocompleteLength){
      result = result.slice(0, autocompleteLength)
    }
    return result;
  }
  rootClass = () => {
    return classNames(css.root, this.props.className)
  }
  renderAutocomplete = () => {
    const { locations, openAutocomplete } = this.state;
    if(!openAutocomplete || !this.props.value) return null;
    return locations.map( (location, i) => (
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