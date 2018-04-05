import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { NavLink } from 'react-router-dom';
import { required } from '../../../helpers/validate';
import RenderField from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { SaveBtn } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import GridColumn, { Grid } from 'semantic-ui-react';
import RenderTextArea from '../../forms/renders/RenderTextArea';
import { employeers } from '../../../helpers/selects/employeers';
import RenderFile from '../../forms/renders/RenderFile';
import StyledModuleLink from '../../../styleComponents/StyledModuleLink';

class ModuleForm extends Component {

  render() {
    const { submitting, clientData} = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column computer={16}>

            <StyledModuleLink className="moduleNumber">
                <NavLink to="board">Module number </NavLink>
            </StyledModuleLink>

          </Grid.Column>
          <Grid.Column computer={8}>

            <Field name="description" component={RenderTextArea} label="Brief / Description *" className="area" padded/>

          </Grid.Column>
          <Grid.Column computer={8}>

            <Grid>
              <Grid.Column computer={6}>
                <Field name="status" component={RenderSelect} label="status" small/>
              </Grid.Column>
              <Grid.Column computer={10}>
              <Field 
              name="file" 
              type="file"
              component={RenderFile} 
              label="Attach files"
              className="area"
              padded
            />
              </Grid.Column>
            </Grid>

            

            

          </Grid.Column>
        {/* </Grid.Row>

        <Grid.Row> */}
          <Grid.Column computer={8}>

            <Field name="user_story" component={RenderTextArea} label="User Story *" className="area" large padded/>

          </Grid.Column>
          <Grid.Column computer={8}>

            <Field name="criteria" component={RenderTextArea} label="Acceptance criteria" className="area" large padded/>

          </Grid.Column>
        {/* </Grid.Row>

        <Grid.Row> */}
          <Grid.Column computer={8}>

            <Field name="requirements" component={RenderTextArea} label="Business Requirements" className="area" large padded/>

          </Grid.Column>
          <Grid.Column computer={8}>

            <Field name="solution" component={RenderTextArea} label="Solution design" className="area" large padded/>            

          </Grid.Column>
        {/* </Grid.Row>

        <Grid.Row> */}
          <Grid.Column computer={8}>

            <Field name="rules" component={RenderTextArea} label="Business Rules" className="area" padded/>

          </Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }
}

export default ModuleForm;
