import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { NavLink } from "react-router-dom";
import {
  required,
  maxLength4,
  maxLength20,
  number
} from "../../../helpers/validate";
import RenderField from "../../forms/renders/RenderField";
import RenderSelect from "../../forms/renders/RenderSelect";
import RenderDate from "../../forms/renders/RenderDate";
import { clientCategories } from "../../../helpers/selects/clientCategories";
import {
  NextBtn,
  BackBtn,
  CancelBtn,
  SaveBtn
} from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import { employeers } from "../../../helpers/selects/employeers";
import InputRadio from "../../forms/renders/InputRadio";
import RenderImage from "../../forms/renders/RenderImage";

class BillingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "0",
      fetch: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      tab: event.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clientData && this.state.fetch) {
      if (nextProps.clientData.customer_billing) {
        if (nextProps.clientData.customer_billing.billing_type) {
          this.setState({
            tab: nextProps.clientData.customer_billing.billing_type,
            fetch: false
          });
        }
      }
    }
  }

  render() {
    const {
      submitting,
      clientData,
      specialistData,
      handleFormField,
      isEditing,
      handleSubmitError
    } = this.props;
    const { tab } = this.state;
    let { avatar } = specialistData || clientData || false;

    const tabs = [
      {
        billingTab: "paypal",
        render: () => {
          let disabled = tab == 0 ? false : true;

          return (
            <Grid.Column mobile={16} computer={16}>
              <InputField
                name="account_number"
                label="Account number"
                type="number"
                handleFormField={handleFormField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
              <InputField
                name="password"
                label="Password"
                handleFormField={handleFormField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
            </Grid.Column>
          );
        }
      },
      {
        billingTab: "credit_card",
        render: () => {
          let disabled = tab == 1 ? false : true;

          return (
            <Grid.Column mobile={16} computer={16}>
              <InputField
                name="card_name"
                label="Card name"
                handleFormField={handleFormField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
              <InputField
                name="card_number"
                label="Card number"
                type="number"
                handleFormField={handleFormField}
                validate={[required, maxLength20]}
                disabled={disabled}
                isRequired
              />

              <Grid>
                <Grid.Row>
                  <Grid.Column computer={8}>
                    <Field
                      name="expiry_date"
                      label="Expiry date"
                      component={RenderDate}
                      // handleFormField={handleFormField}
                      initData={
                        clientData && clientData.customer_billing
                          ? clientData.customer_billing.expiry_date
                          : null
                      }
                      handleEtaForm={this.props.handleEtaForm}
                      validate={[required]}
                      disabled={disabled}
                      isRequired
                    />
                  </Grid.Column>
                  <Grid.Column computer={8}>
                    <InputField
                      name="ccv"
                      label="CVV"
                      type="number"
                      handleFormField={handleFormField}
                      validate={[required, maxLength4]}
                      disabled={disabled}
                      isRequired
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          );
        }
      },
      {
        billingTab: "accounts",
        render: () => {
          let disabled = tab == 2 ? false : true;

          return (
            <Grid.Column mobile={16} computer={16}>
              <InputField
                name="account_details"
                label="Account details"
                handleFormField={handleFormField}
                validate={[required]}
                disabled={disabled}
                isRequired
              />
            </Grid.Column>
          );
        }
      }
    ];

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column computer={3}>
            {/* { !avatar && <p>Upload your photo</p>} */}
            <Field
              name="person"
              component={RenderImage}
              type="file"
              avatar={avatar}
              placeholder="Choose your photo"
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={10}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={2} />
                <Grid.Column computer={4}>
                  <InputRadio
                    name="billing_type"
                    placeholder="Paypal"
                    value={0}
                    // checked={true}
                    onChange={this.handleChange}
                    checked={this.state.tab == 0}
                  />
                </Grid.Column>
                <Grid.Column computer={4}>
                  <InputRadio
                    name="billing_type"
                    value={1}
                    placeholder="Credit card"
                    onChange={this.handleChange}
                    checked={this.state.tab == 1}
                  />
                </Grid.Column>
                <Grid.Column computer={4}>
                  <InputRadio
                    name="billing_type"
                    value={2}
                    placeholder="Accounts"
                    onChange={this.handleChange}
                    checked={this.state.tab == 2}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>{tabs[tab].render()}</Grid.Row>
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
                  onClick={handleSubmitError}
                  primary
                  updatebtn="true"
                >
                  <span>Save</span>
                </SaveBtn>
              ) : (
                <NextBtn
                  type="submit"
                  disabled={submitting}
                  onClick={handleSubmitError}
                  primary
                >
                  <span>Next Step</span>
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
