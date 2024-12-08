import _ from "lodash";
import cleanDeep from "clean-deep";

interface Action {
  parametersSchema?: any;
  parameters: Record<string, any>;
  conditions: Record<string, any> | null;
}

interface Body {
  actions?: Action[];
}

export const sanitizeBody = (body: Body): Body => {
  const cleanedBody = cleanDeep(body) as Body;

  const actions = cleanedBody.actions || [];

  cleanedBody.actions = actions.map(action => {
    const item = _.omit(action, [
      "parametersSchema",
      "conditions.includePorType",
      "conditions.includeFndType",
      "conditions.includePolType",
      "conditions.includePodType",
    ]);

    item.parameters = _.isEmpty(item.parameters) ? {} : item.parameters;
    item.conditions = _.isEmpty(item.conditions) ? null : item.conditions;

    return item as Action;
  });

  return cleanedBody;
};
