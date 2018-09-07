import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Field } from "redux-form";
import { Grid } from "semantic-ui-react";
import { createTextMask } from "redux-form-input-masks";

import ImageUploader from "@UI/inputs/ImageUploader";
import InputField from "@UI/inputs/InputField";
import RenderRadio from "@UI/inputs/Radio";

import { CancelBtn, BackBtn, SaveBtn, NextBtn } from "@styled/DVButton";

const BillingsForm = ({
  handleSubmit,
  submitting,
  activeTab,
  avatar,
  isEditing,
  handleChange
}) => {
  const creditCardMask = createTextMask({
    pattern: "9999 9999 9999 9999",
    guide: false,
    allowEmpty: true
  });

  const tabs = [
    {
      billingTab: "credit_card",
      render: () => {
        let disabled = +activeTab === 0 ? false : true;

        return (
          <Grid.Row>
            <Grid.Column mobile={8} computer={8}>
              <Field
                name="card_name"
                label="Name on card"
                component={InputField}
                disabled={disabled}
              />
            </Grid.Column>
            <Grid.Column mobile={8} computer={8}>
              <Field
                name="card_number"
                label="Card number"
                component={InputField}
                disabled={disabled}
                {...creditCardMask}
              />
            </Grid.Column>
          </Grid.Row>
        );
      }
    },
    {
      billingTab: "direct_payment",
      render: () => {
        let disabled = +activeTab === 1 ? false : true;

        return (
          <Grid.Row>
            <Grid.Column mobile={16} computer={16}>
              <Field
                name="correspondent_bank"
                label="Correspondent Bank"
                component={InputField}
                disabled={disabled}
              />
              <Field
                name="beneficiary_bank"
                label="Beneficiary Bank"
                component={InputField}
                disabled={disabled}
              />
              <Field
                name="beneficiary_name"
                label="Beneficiary Name"
                component={InputField}
                disabled={disabled}
              />
              <Field
                name="iban"
                label="IBAN"
                component={InputField}
                disabled={disabled}
              />
              <Field
                name="swift_code"
                label="Swift code"
                component={InputField}
                disabled={disabled}
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
    <Form onSubmit={handleSubmit}>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={3}>
            <Field
              name="person"
              type="file"
              placeholder="Choose your photo"
              component={ImageUploader}
              avatar={avatar}
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
                    onChange={handleChange}
                    checked={+activeTab === 0}
                  />
                </Grid.Column>
                <Grid.Column computer={5}>
                  <Field
                    name="billing_type"
                    type="radio"
                    label="Direct Payment"
                    value={1}
                    component={RenderRadio}
                    onChange={handleChange}
                    checked={+activeTab === 1}
                  />
                </Grid.Column>
              </Grid.Row>
              {tabs[activeTab].render()}
            </Grid>
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <div className="navigation-wrap">
              {isEditing ? (
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

              {isEditing ? (
                <SaveBtn
                  type="submit"
                  disabled={submitting}
                  primary
                  updatebtn="true"
                >
                  <span>Save</span>
                </SaveBtn>
              ) : (
                <NextBtn type="submit" disabled={submitting} primary>
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
