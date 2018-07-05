import React, { Component } from "react";
import { Field } from "redux-form";
import { NavLink } from "react-router-dom";
import {
  required,
  date,
  maxLength80,
  minLength2
} from "../../helpers/validate";
import RenderDate from "./renders/RenderDate";
import RenderTextArea from "./renders/RenderTextArea";
import RenderText from "./renders/RenderText";
import RenderFile from "./renders/RenderFile";
import RenderField from "./renders/RenderField";
import {
  DvBlueButton,
  DvButtonRed
} from "../../styleComponents/layout/DvButton";
import { getUserRole } from "../../helpers/functions";
import { formatCurrency } from "../../helpers/validate";
import { CUSTOMER, S_REDGUY } from "../../constants/user";

class EditEpicForm extends Component {
  render() {
    const {
      submitting,
      projectId,
      epicName,
      handleSubmit,
      eta,
      deleteEpic,
      costs
    } = this.props;

    const hasPermission =
      getUserRole() === CUSTOMER || getUserRole() === S_REDGUY;

    return (
      <div className="module">
        <section className="module-aside">
          <div className="module-info">
            <Field
              name="eta"
              component={RenderDate}
              type="date"
              label="ETA"
              placeholder="Due date"
              className="estimate inline-in-module"
              validate={[required, date]}
              initData={eta}
              handleEtaForm={this.props.handleEtaForm}
              disabled={!hasPermission}
              isRequired
            />

            <div className="module-costs">
              <label>Total costs:</label>
              <span>
                <i className="fas fa-dollar-sign" /> {formatCurrency(costs)}
              </span>
            </div>
          </div>

          <div className="module-info">
            <div className="label">Attached files:</div>
            <Field
              name="attached_files"
              type="file"
              component={RenderFile}
              onSelfSubmit={handleSubmit}
              disabled={!hasPermission}
              dropzone
            />
          </div>

          {hasPermission && (
            <div className="controls">
              <DvButtonRed
                type="button"
                className="dv-red"
                onClick={() => deleteEpic()}
              >
                Delete module
              </DvButtonRed>
            </div>
          )}
        </section>

        <section className="module-main">
          <div className="module-title">
            {epicName ? epicName : "Edit module"}
          </div>

          <Field
            name="name"
            component={RenderText}
            label="Module name"
            placeholder={
              hasPermission ? "Type your module name here" : "No module name"
            }
            className="transparent"
            disabled={!hasPermission}
            onSelfSubmit={handleSubmit}
            validate={[required, minLength2, maxLength80]}
            isRequired
          />

          <Field
            name="description"
            component={RenderText}
            label="Brief / Description"
            placeholder={
              hasPermission ? "Type your description here" : "No description"
            }
            className="transparent"
            disabled={!hasPermission}
            onSelfSubmit={handleSubmit}
            validate={[required]}
            isRequired
          />

          <Field
            name="user_story"
            component={RenderText}
            label="User story"
            placeholder={
              hasPermission ? "Type your user story here" : "No user story"
            }
            className="transparent"
            disabled={!hasPermission}
            onSelfSubmit={handleSubmit}
            large
          />

          <Field
            name="criteria"
            component={RenderText}
            label="Acceptance criteria"
            placeholder={
              hasPermission
                ? "Type your acceptance criteria here"
                : "No acceptance criteria"
            }
            className="transparent"
            disabled={!hasPermission}
            onSelfSubmit={handleSubmit}
            large
          />

          <Field
            name="requirements"
            component={RenderText}
            label="Business Requirements"
            placeholder={
              hasPermission
                ? "Type your business requirements here"
                : "No business requirements"
            }
            className="transparent"
            disabled={!hasPermission}
            onSelfSubmit={handleSubmit}
            large
          />

          <Field
            name="solution"
            component={RenderText}
            label="Solution design"
            placeholder={
              hasPermission
                ? "Type your solution design here"
                : "No solution design"
            }
            className="transparent"
            disabled={!hasPermission}
            onSelfSubmit={handleSubmit}
            large
          />

          <Field
            name="rules"
            component={RenderText}
            label="Business Rules"
            placeholder={
              hasPermission
                ? "Type your business rules here"
                : "No business rules"
            }
            className="transparent"
            disabled={!hasPermission}
            onSelfSubmit={handleSubmit}
          />
        </section>
      </div>
    );
  }
}

export default EditEpicForm;
