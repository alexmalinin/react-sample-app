import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  updateSpecialistBillings,
  showSpecialistData
} from "../../../actions/actions";
import { Message } from "semantic-ui-react";
import { S_Message } from "../../../styleComponents/layout/S_Message";
import { run } from "../../../helpers/scrollToElement";
import SpecialistBillingForm from "../forms/SpecialistBillingForm";
import { getAllUrlParams } from "../../../helpers/functions";

class SpecialistsMyBillings extends Component {
  constructor() {
    super();

    this.state = {
      renderMessage: false,
      renderErrorMessage: false,
      nextStep: false,
      isEditing: false
    };
  }

  componentWillMount() {
    this.props.showSpecialistData();

    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  collectData(values) {
    const {
      billing_type,
      company_name,
      manager,
      bank_account_details,
      swift_code
    } = values;
    console.log("qwe 456", billing_type);

    if (billing_type == "1") {
      return { company_name, manager };
    }
    return { bank_account_details, swift_code };
  }

  render() {
    const { renderMessage, renderErrorMessage, isEditing } = this.state;

    return (
      <div>
        <S_Message positive data-show={renderMessage}>
          <Message.Header>Success!</Message.Header>
          <p>Form updated</p>
        </S_Message>
        <S_Message negative data-show={renderErrorMessage}>
          <Message.Header>Error!</Message.Header>
          <p>Something went wrong, please try again</p>
        </S_Message>
        {/* <DvTitleSmall>My Billings</DvTitleSmall> */}

        <SpecialistBillingForm
          swichTab={this.swichTab}
          data={this.props.specialistData}
          isEditing={isEditing}
          handleFormValueChange={this.props.handleFormValueChange}
          onChange={this.change}
          onSubmit={this.submit}
        />
        {this.state.nextStep && <Redirect to="about" />}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData) {
      if (nextProps.specialistData.successUpdateId) {
        run(0)();
        this.showMessage("success");
      } else if (nextProps.specialistData.errorUpdateId) {
        run(0)();
        this.showMessage();
      }
    }
  }

  showMessage = status => {
    setTimeout(() => {
      return this.setState({
        renderMessage: false,
        renderErrorMessage: false,
        nextStep: true
      });
    }, 1500);

    status === "success"
      ? this.setState({
          renderMessage: true
        })
      : this.setState({
          renderErrorMessage: true
        });
  };

  change = values => {
    if (!values.hasOwnProperty("billing_type")) {
      values.billing_type = 0;
    }
    const data = this.collectData(values);
    this.props.calculatePagePercent("billingPercent", data);
  };

  submit = values => {
    this.props.updateSpecialistBillings(values);
  };
}

export default connect(({ specialistData }) => ({ specialistData }), {
  updateSpecialistBillings,
  showSpecialistData
})(SpecialistsMyBillings);
