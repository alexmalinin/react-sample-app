import React, { Component } from "react";
import { Field } from "redux-form";
import { NavLink } from "react-router-dom";
import {
  required,
  date,
  maxLength80,
  minLength2
} from "../../../helpers/validate";
import RenderDate from "../../forms/renders/RenderDate";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import RenderFile from "../../forms/renders/RenderFile";
import RenderField from "../../forms/renders/RenderField";
import { DvBlueButton } from "../../../styleComponents/layout/DvButton";

class ModuleForm extends Component {
  render() {
    const { submitting, projectId } = this.props;

    return (
      <div className="module">
        <section className="module-aside">
          <div className="module-info">
            <Field
              name="eta"
              component={RenderDate}
              type="date"
              label="ETA:"
              placeholder="Due date"
              className="estimate inline-in-module"
              validate={[date]}
              handleEtaForm={this.props.handleEtaForm}
            />
          </div>

          <div className="module-info">
            <Field
              name="attached_files"
              type="file"
              component={RenderFile}
              label="Attach files:"
              dropzone
            />
          </div>
        </section>

        <section className="module-main">
          <div className="module-title">Create module</div>

          <Field
            name="name"
            component={RenderField}
            label="Module name"
            placeholder="Type your module name here"
            validate={[required, minLength2, maxLength80]}
            isRequired
          />

          <Field
            name="description"
            component={RenderTextArea}
            label="Brief / Description"
            placeholder="Type your description here"
            validate={[required]}
            isRequired
          />

          <Field
            name="user_story"
            component={RenderTextArea}
            label="User Story"
            placeholder="Type your user Story here"
            large
          />

          <Field
            name="criteria"
            component={RenderTextArea}
            label="Acceptance criteria"
            placeholder="Type your acceptance criteria here"
            large
          />

          <Field
            name="requirements"
            component={RenderTextArea}
            label="Business Requirements"
            placeholder="Type your business requirements here"
            large
          />

          <Field
            name="solution"
            component={RenderTextArea}
            label="Solution design"
            placeholder="Type your solution design here"
            large
          />

          <Field
            name="rules"
            component={RenderTextArea}
            label="Business Rules"
            placeholder="Type your business rules here"
          />

          <div className="controls">
            <DvBlueButton
              type="submit"
              className="dv-blue"
              disabled={submitting}
            >
              Create
            </DvBlueButton>

            <NavLink exact to={`/dashboard/project/${projectId}`}>
              <DvBlueButton className="dv-blue inverted transparent">
                Cancel
              </DvBlueButton>
            </NavLink>
          </div>
        </section>
      </div>
    );
  }
}

export default ModuleForm;
