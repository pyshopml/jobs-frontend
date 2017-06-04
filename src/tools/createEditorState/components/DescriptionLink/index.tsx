import * as React from 'react';

interface Props{
  contentState: any;
  entityKey: any;
};
interface State{};


class DescriptionLink extends React.Component<Props, State>{
  render(){
    const {url} = this.props.contentState.getEntity(this.props.entityKey).getData();
    return (
      <a href={url}>
        {this.props.children}
      </a>
    );
  }
}

export default DescriptionLink;