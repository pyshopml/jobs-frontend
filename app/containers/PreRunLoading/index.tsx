import * as React from 'react'
import { connect } from 'react-redux';
import selectors from './selectors'

interface Props {
  IsAuthStateRestoring: boolean
};

class PreRunLoading extends React.Component<Props, null> {
  isLoading = () => {
    return this.props.IsAuthStateRestoring
  };
  renderLoading = () => {
    return(
      <span>Loading</span>
    )
  };
  render(){
    return(
      <div style={{flex: 1}}>
        {this.isLoading() ? this.renderLoading() : this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => selectors(state);

export default connect(mapStateToProps)(PreRunLoading);