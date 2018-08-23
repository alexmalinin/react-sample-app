import React from "react";
import { NavLink } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { IMAGE_PORT, BLANK_AVATAR } from "@utilities";

const About = ({
  data,
  data: { skills, communications },
  services,
  educationsExperience,
  workExperience,
  editCondition
}) => {
  const renderInfo = data => {
    if (!data) return;

    const { title, subtitle, link, fields } = data;

    return (
      <div className="profile-info">
        <div className="profile-content">
          <div className="profile-header profile-subtitle">
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
              {fields &&
                fields.map((item, index) => {
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
    if (!data) return;

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
        <Grid.Column computer={16}>
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
                <div className="profile-subtitle">Contact information</div>

                <div className="profile-row">
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
              </div>

              {((skills && !!skills.length) || communications) && (
                <div className="profile-content">
                  <div className="profile-subtitle">&nbsp;</div>
                  <span className="profile-row">
                    {skills &&
                      skills.length > 0 && (
                        <div className="profile-item profile-skills">
                          <div className="profile-label">Skills</div>
                          {skills.map((skill, index) => (
                            <span key={index}>{skill.name}</span>
                          ))}
                        </div>
                      )}

                    {communications &&
                      !!Object.keys(communications).length && (
                        <div className="profile-item profile-communications">
                          <div className="profile-label">Communications</div>
                          {Object.keys(communications).map((key, index) => (
                            <span key={index}>{key}</span>
                          ))}
                        </div>
                      )}
                  </span>
                </div>
              )}

              {data.description && (
                <div className="profile-content profile-client-description">
                  <div className="profile-subtitle">Description</div>
                  <span className="profile-description">
                    {data.description}
                  </span>
                </div>
              )}

              {data.experience && (
                <div className="profile-content profile-experience">
                  <div className="profile-subtitle">
                    Professional experience
                  </div>
                  <span className="profile-descrtiption">
                    {data.experience}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Grid.Column>
        <Grid.Column computer={16}>
          <div className="profile-main">{renderInfo(services)}</div>
        </Grid.Column>
        <Grid.Column computer={8}>
          {educationsExperience &&
            educationsExperience.length > 0 && (
              <div className="profile-info profile-half">
                <div className="profile-content">
                  <div className="profile-header profile-subtitle">
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
              </div>
            )}
        </Grid.Column>
        <Grid.Column computer={8}>
          {workExperience &&
            workExperience.length > 0 && (
              <div className="profile-info profile-half">
                <div className="profile-content">
                  <div className="profile-header profile-subtitle">
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
              </div>
            )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default About;
