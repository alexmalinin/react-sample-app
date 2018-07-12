import React from "react";
import { NavLink } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { IMAGE_PORT, BLANK_AVATAR } from "../../../constants/constants";

const RenderProfile = ({
  data,
  data: { skills, communications },
  services,
  company,
  billings,
  educationsExperience,
  workExperience,
  editCondition
}) => {
  const renderInfo = data => {
    if (!data) return null;

    const { title, subtitle, link, fields } = data;

    const half = fields && Math.ceil(fields.length / 2),
      columnA = fields.slice(0, half),
      columnB = fields.slice(half);

    return (
      <div className="profile-info">
        <div className="profile-header">
          <div className="pfofile-title">{title}</div>
          {link &&
            editCondition && (
              <NavLink to={link}>
                <div className="dv-btn">
                  <i className="fas fa-edit" />
                </div>
              </NavLink>
            )}
        </div>
        <div className="profile-content">
          {subtitle && <div className="profile-subtitle">{subtitle}</div>}
          <div className="profile-row">
            <div className="profile-column">
              {columnA &&
                columnA.map((item, index) => {
                  return (
                    <div key={index} className="profile-item">
                      <div className="profile-label">{item.label}</div>
                      <span className="profile-description">{item.value}</span>
                    </div>
                  );
                })}
            </div>

            <div className="profile-column">
              {columnB &&
                columnB.map((item, index) => {
                  return (
                    <div key={index} className="profile-item">
                      <div className="profile-label">{item.label}</div>
                      <span className="profile-description">{item.value}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExperience = (data, index) => {
    if (!data) return null;

    return (
      <div key={data.id} className="profile-content">
        <div className="profile-block">
          <div className="">{data.name}</div>
          <div className="">{data.position || data.degree}</div>
          <span>{`${data.started_at} - ${data.finished_at}`}</span>
        </div>

        <div className="profile-label">{data.description}</div>
      </div>
    );
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column computer={6}>
          <div className="profile-aside">
            <div className="profile-info">
              <div className="profile-image">
                <div className="image-wrapper">
                  <img
                    src={data.avatar ? IMAGE_PORT + data.avatar : BLANK_AVATAR}
                    alt="avatar"
                  />
                </div>

                <div className="profile-name">{data.name}</div>
                <div className="profile-label">{data.position}</div>
                {editCondition && (
                  <NavLink to="/profile/info?edit">
                    <div className="dv-btn edit-btn">
                      <i className="fas fa-edit" />
                    </div>
                  </NavLink>
                )}
              </div>

              <div className="profile-content">
                <div className="profile-subtitle">Contact onformation</div>

                <div className="profile-item">
                  <div className="profile-label">Phone number:</div>
                  <span className="profile-description">
                    {data.phone || "No phone number"}
                  </span>
                </div>

                <div className="profile-item">
                  <div className="profile-label">Email address:</div>
                  <span className="profile-description">{data.email}</span>
                </div>

                <div className="profile-item">
                  <div className="profile-label">Address:</div>
                  <span className="profile-description">
                    {data.address || "No address"}
                  </span>
                </div>
              </div>

              {data.experience && (
                <div className="profile-content">
                  <div className="profile-subtitle">
                    Professional experience
                  </div>
                  <span className="profile-label">{data.experience}</span>
                </div>
              )}

              {data.description && (
                <div className="profile-content">
                  <div className="profile-subtitle">Description</div>
                  <span className="profile-label">{data.description}</span>
                </div>
              )}

              {skills &&
                skills.length > 0 && (
                  <div className="profile-content">
                    <div className="profile-subtitle">Skills</div>
                    <div className="profile-skills">
                      {skills.map((skill, index) => (
                        <span key={index}>{skill.name}</span>
                      ))}
                    </div>
                  </div>
                )}

              {communications &&
                !!Object.keys(communications).length && (
                  <div className="profile-content">
                    <div className="profile-subtitle">Communications</div>
                    <div className="profile-communications">
                      {Object.keys(communications).map((key, index) => (
                        <span key={index}>{key}</span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </Grid.Column>
        <Grid.Column computer={10}>
          <div className="profile-main">
            {renderInfo(services)}
            {renderInfo(company)}
            {renderInfo(billings)}

            {educationsExperience &&
              educationsExperience.length > 0 && (
                <div className="profile-info">
                  <div className="profile-header">
                    <div className="pfofile-title">Educations</div>

                    {editCondition && (
                      <NavLink to="/profile/info?hash=education&edit">
                        <div className="dv-btn edit-btn">
                          <i className="fas fa-edit" />
                        </div>
                      </NavLink>
                    )}
                  </div>
                  {educationsExperience.map(item => renderExperience(item))}
                </div>
              )}

            {workExperience &&
              workExperience.length > 0 && (
                <div className="profile-info">
                  <div className="profile-header">
                    <div className="pfofile-title">Experience</div>
                    {editCondition && (
                      <NavLink to="/profile/info?hash=experience&edit">
                        <div className="dv-btn edit-btn">
                          <i className="fas fa-edit" />
                        </div>
                      </NavLink>
                    )}
                  </div>
                  {workExperience.map(item => renderExperience(item))}
                </div>
              )}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RenderProfile;
