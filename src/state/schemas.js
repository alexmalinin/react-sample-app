import { schema } from "normalizr";

export const specialist = new schema.Entity("specialists");

export const channel = new schema.Entity("channels", {
  specialists: [specialist]
});

export const channels = new schema.Entity(
  "channels",
  {
    channels: [channel],
    specialists: [specialist]
  },
  {
    processStrategy: entity => {
      entity.specialists.reverse();
      return entity;
    }
  }
);

export const team = new schema.Entity("teams", {
  channels: [channel],
  specialists: [specialist]
});

export const teams = new schema.Entity("teams", {
  teams: [team]
});

export const epic = new schema.Entity("epics", {
  specialists: [specialist]
});

export const project = new schema.Entity("projects", {
  epics: [epic],
  team: team
});
