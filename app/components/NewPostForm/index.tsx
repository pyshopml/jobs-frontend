import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DescriptionEditor from '../DescriptionEditor';


import css from './style.scss';

interface Props{};
interface State{};


class NewPostForm extends React.Component<Props, State>{
  render(){
    return(
      <form action="">
        <TextField hintText="Заголовок.."
                   fullWidth={true}
                   inputStyle={{padding: '0 10px'}}
                   hintStyle={{left: '10px', transition: 'none'}}/>
        <DescriptionEditor/>
        <div className={css.buttonsWrap}>
          <RaisedButton href="#" label="Очистить" />
          <RaisedButton type="submit" label="Создать" />
        </div>
      </form>
    )
  }
}

export default NewPostForm;
