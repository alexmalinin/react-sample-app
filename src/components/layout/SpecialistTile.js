import React, { Component } from "react";
import { StyledSpecialist } from "../../styleComponents/layout/StyledAssignDropdown";
import { IMAGE_PORT } from "../../constans/constans";
import { Grid } from "semantic-ui-react";

export default class SpecialistTile extends Component {
  remove = () => {
    const {
      remove,
      specialist: { id }
    } = this.props;
    remove(id);
  };
  render() {
    const { specialist } = this.props;
    return (
      <StyledSpecialist>
        <Grid padded="horizontally">
          <Grid.Row>
            <Grid.Column computer={10}>
              <img
                src={
                  specialist.avatar.url
                    ? IMAGE_PORT + specialist.avatar.url
                    : "/images/uploadImg.png"
                }
                alt={specialist.first_name + " " + specialist.last_name}
              />
              <p>{specialist.first_name + " " + specialist.last_name}</p>
            </Grid.Column>
            <Grid.Column computer={4}>
              {/* <CostField
                name="cost"
                label="Cost"
                onBlur={this.makeFloat}
                padded
              /> */}
            </Grid.Column>
            <button type="button" onClick={this.remove} />
          </Grid.Row>
        </Grid>
      </StyledSpecialist>
    );
  }
}
