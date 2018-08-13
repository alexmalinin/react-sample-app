import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Field } from "redux-form";
import { Grid } from "semantic-ui-react";

import ImageUploader from "@UI/inputs/ImageUploader";
import InputField from "@UI/inputs/InputField";
import RenderRadio from "@UI/inputs/Radio";

import { CancelBtn, BackBtn, SaveBtn, NextBtn } from "@styled/DVButton";

import { required } from "@views/utils/validate";

const BillingsForm = props => {
  const tabs = [
    {
      billingTab: "credit_card",
      render: () => {
        let disabled = props.activeTab == 0 ? false : true;

        return (
          <Grid.Row>
            <Grid.Column mobile={8} computer={8}>
              <Field
                name="card_name"
                label="Name on card"
                component={InputField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
            </Grid.Column>
            <Grid.Column mobile={8} computer={8}>
              <Field
                name="card_number"
                label="Card number"
                component={InputField}
                // type="number"
                validate={[required]}
                disabled={disabled}
                isRequired
                creditCard
              />
            </Grid.Column>
          </Grid.Row>
        );
      }
    },
    {
      billingTab: "direct_payment",
      render: () => {
        let disabled = props.activeTab == 1 ? false : true;

        return (
          <Grid.Row>
            <Grid.Column mobile={16} computer={16}>
              <Field
                name="correspondent_bank"
                label="Correspondent Bank"
                component={InputField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
              <Field
                name="beneficiary_bank"
                label="Beneficiary Bank"
                component={InputField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
              <Field
                name="beneficiary_name"
                label="Beneficiary Name"
                component={InputField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
              <Field
                name="iban"
                label="IBAN"
                component={InputField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
              <Field
                name="swift_code"
                label="Swift code"
                component={InputField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
              <Field
                name="purpose_of_payment"
                label="Purpose of payment"
                component={InputField}
                disabled={disabled}
              />
              <Field
                name="beneficiary_account"
                label="Beneficiary Account"
                component={InputField}
                disabled={disabled}
              />
            </Grid.Column>
          </Grid.Row>
        );
      }
    }
  ];

  return (
    <Form onSubmit={props.handleSubmit}>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={3}>
            <Field
              name="person"
              type="file"
              placeholder="Choose your photo"
              component={ImageUploader}
              avatar={props.avatar}
              // disabled
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={10}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={3} />
                <Grid.Column computer={5}>
                  <Field
                    name="billing_type"
                    type="radio"
                    label="Credit Card"
                    component={RenderRadio}
                    value={0}
                    onChange={props.handleChange}
                    checked={props.activeTab == 0}
                  />
                </Grid.Column>
                <Grid.Column computer={5}>
                  <Field
                    name="billing_type"
                    type="radio"
                    label="Direct Payment"
                    value={1}
                    component={RenderRadio}
                    onChange={props.handleChange}
                    checked={props.activeTab == 1}
                  />
                </Grid.Column>
              </Grid.Row>
              {tabs[props.activeTab].render()}
            </Grid>
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <div className="navigation-wrap">
              {props.isEditing ? (
                <NavLink exact to="/dashboard/about">
                  <CancelBtn primary>
                    <span>Cancel</span>
                  </CancelBtn>
                </NavLink>
              ) : (
                <NavLink exact to="/profile/company">
                  <BackBtn primary>
                    <span>Back</span>
                  </BackBtn>
                </NavLink>
              )}

              {props.isEditing ? (
                <SaveBtn
                  type="submit"
                  disabled={props.submitting}
                  primary
                  updatebtn="true"
                >
                  <span>Save</span>
                </SaveBtn>
              ) : (
                <NextBtn type="submit" disabled={props.submitting} primary>
                  <span>Submit</span>
                </NextBtn>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default BillingsForm;
