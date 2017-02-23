import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DescriptionEditor from '../DescriptionEditor';
import IPost from '../../interfaces/ipost';

import css from './style.scss';

interface Props {
  createPost(post: IPost),
  handleCancel(),
};

interface State { 
  title: string,
};


class NewPostForm extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      title: '',

    }

    this.hanldeSubmit = this.hanldeSubmit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  hanldeSubmit(evt) {
    evt.preventDefault();
    console.log(this.state);
  }

  updateTitle(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title } = this.state;

    return(
      <form action="">
        <RaisedButton 
          href="#" 
          secondary={true} 
          label="Назад" 
          className={ css.backButton }
          onClick={ this.props.handleCancel }
        />

        <TextField hintText="Заголовок.."
                   name="title"
                   value={ title }
                   fullWidth={ true }
                   onChange={this.updateTitle}
                   inputStyle={{padding: '0 10px'}}
                   hintStyle={{left: '10px', transition: 'none'}} />

        <DescriptionEditor />
        
        <div className={ css.controls }>
          <RaisedButton href="#" label="Очистить" />
          <RaisedButton type="submit" label="Создать" primary={true} onClick={ this.hanldeSubmit } />
        </div>
      </form>
    )
  }
}

export default NewPostForm;
