import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { SaveBtn } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import { Grid } from 'semantic-ui-react';
import RenderTextArea from '../../forms/renders/RenderTextArea';
import { employeers } from '../../../helpers/selects/employeers';
import RenderImage from '../../forms/renders/RenderImage';

class ProjectForm extends Component {

  render() {
    const { submitting, clientData} = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column computer={12}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={10}>
                  <InputField
                    name="name"
                    label="Project name"
                  />

                  <Field name="description" component={RenderTextArea} label="Brief / Description *"/>

                  <Field name="user_story" component={RenderTextArea} label="User Story *"/>
                  <Field name="requirements" component={RenderTextArea} label="Business Requirements"/>
                  <Field name="rules" component={RenderTextArea} label="Business Rules"/>

                </Grid.Column>

                <Grid.Column computer={6}>

                  <Field name="criteria" component={RenderTextArea} label="Acceptance criteria"/>
                  <Field name="solution" component={RenderTextArea} label="Solution design"/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Grid.Column>
          <Grid.Row>
            <Grid.Column computer={3}>
              <SaveBtn type="submit"
                       disabled={submitting}
                       content=''
                       primary
              >
                <span>next step</span>
              </SaveBtn>
            </Grid.Column>
          </Grid.Row>

        </Grid.Row>

      </Grid>

    )
  }
}

export default ProjectForm;
