import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  isSectionActiveAt,
  TIME_BOUND_SECTIONS,
  type TimeBoundSectionId,
} from "../../shared/time-bound-sections";

/** The tag a product can carry, shared by the catalog and admin schemas. */
export const TimeBoundSectionIdType = new GraphQLEnumType({
  name: "TimeBoundSectionId",
  values: Object.fromEntries(
    TIME_BOUND_SECTIONS.map((section) => [section.id, { value: section.id }]),
  ) as Record<TimeBoundSectionId, { value: TimeBoundSectionId }>,
});

const TimeBoundSectionType = new GraphQLObjectType({
  name: "TimeBoundSection",
  fields: {
    id: { type: new GraphQLNonNull(TimeBoundSectionIdType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    window: { type: new GraphQLNonNull(GraphQLString) },
    startHour: { type: new GraphQLNonNull(GraphQLInt) },
    endHour: { type: new GraphQLNonNull(GraphQLInt) },
    /** Whether the section's window covers the server's current hour. */
    isNow: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export const catalogQueries = {
  timeBoundSections: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TimeBoundSectionType))),
    resolve: () => {
      const hour = new Date().getHours();
      return TIME_BOUND_SECTIONS.map((section) => ({
        ...section,
        isNow: isSectionActiveAt(section, hour),
      }));
    },
  },
};
