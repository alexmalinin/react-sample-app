import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Field } from "redux-form";
import { required } from "../../../helpers/validate";
import {
  NextBtn,
  BackBtn,
  CancelBtn,
  SaveBtn
} from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import InputRadio from "../../forms/renders/InputRadio";
import RenderImage from "../../forms/renders/RenderImage";

class BillingForm extends Component {
  state = {
    tab: 0,
    fetch: true
  };

  handleChange = event => {
    this.setState({
      tab: event.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData && this.state.fetch) {
      if (nextProps.specialistData.billing) {
        if (nextProps.specialistData.billing.billing_type) {
          this.setState({
            tab: nextProps.specialistData.billing.billing_type,
            fetch: false
          });
        }
      } else {
        this.props.change("billing_type", 0);
      }
    }
  }

  render() {
    const {
      submitting,
      clientData,
      specialistData,
      handleFormField,
      isEditing
    } = this.props;
    const { tab } = this.state;
    let { avatar } = specialistData || clientData || false;

    const tabs = [
      {
        billingTab: "credit_card",
        render: () => {
          let disabled = tab == 0 ? false : true;

          return (
            <Grid.Row>
              <Grid.Column mobile={8} computer={8}>
                <InputField
                  name="card_name"
                  label="Name on card"
                  handleFormField={handleFormField}
                  validate={[required]}
                  disabled={disabled}
                  isRequired
                />
              </Grid.Column>
              <Grid.Column mobile={8} computer={8}>
                <InputField
                  name="card_number"
                  label="Card number"
                  // type="number"
                  handleFormField={handleFormField}
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
          let disabled = tab == 1 ? false : true;
          return (
            <Grid.Row>
              <Grid.Column mobile={16} computer={16}>
                <InputField
                  name="correspondent_bank"
                  label="Correspondent Bank"
                  validate={[required]}
                  disabled={disabled}
                  isRequired
                />
                <InputField
                  name="beneficiary_bank"
                  label="Beneficiary Bank"
                  validate={[required]}
                  disabled={disabled}
                  isRequired
                />
                <InputField
                  name="beneficiary_name"
                  label="Beneficiary Name"
                  validate={[required]}
                  disabled={disabled}
                  isRequired
                />
                <InputField
                  name="iban"
                  label="IBAN"
                  validate={[required]}
                  disabled={disabled}
                  isRequired
                />
                <InputField
                  name="swift_code"
                  label="Swift code"
                  validate={[required]}
                  disabled={disabled}
                  isRequired
                />
                <InputField
                  name="purpose_of_payment"
                  label="Purpose of payment"
                  disabled={disabled}
                />
                <InputField
                  name="beneficiary_account"
                  label="Beneficiary Account"
                  disabled={disabled}
                />
              </Grid.Column>
            </Grid.Row>
          );
        }
      }
    ];

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={3}>
            {!avatar && <p>Upload your photo</p>}
            <Field
              name="person"
              component={RenderImage}
              type="file"
              avatar={avatar}
              disabled
              placeholder="Choose your photo"
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={10}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={3} />
                <Grid.Column computer={5}>
                  <InputRadio
                    name="billing_type"
                    placeholder="Credit Card"
                    value={0}
                    onChange={this.handleChange}
                    checked={this.state.tab == 0}
                  />
                </Grid.Column>
                <Grid.Column computer={5}>
                  <InputRadio
                    name="billing_type"
                    value={1}
                    placeholder="Direct Payment"
                    onChange={this.handleChange}
                    checked={this.state.tab == 1}
                  />
                </Grid.Column>
              </Grid.Row>
              {tabs[tab].render()}
            </Grid>
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <div className="navigation-wrap">
              {isEditing ? (
                <NavLink exact to="/dashboard/about">
                  <CancelBtn disabled={submitting} primary>
                    <span>Cancel</span>
                  </CancelBtn>
                </NavLink>
              ) : (
                <NavLink exact to="/dashboard/company">
                  <BackBtn disabled={submitting} primary>
                    <span>Back</span>
                  </BackBtn>
                </NavLink>
              )}

              {isEditing ? (
                <SaveBtn
                  type="submit"
                  disabled={submitting}
                  onClick={this.props.handleSubmitError}
                  primary
                  updatebtn="true"
                >
                  <span>Save</span>
                </SaveBtn>
              ) : (
                <NextBtn
                  type="submit"
                  disabled={submitting}
                  onClick={this.props.handleSubmitError}
                  primary
                >
                  <span>Submit</span>
                </NextBtn>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BillingForm;
