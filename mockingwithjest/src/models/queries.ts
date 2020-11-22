import moment from 'moment';

const insertChangelog = (item: any, changeType: string) => {
  const { awsRegion, resourceType, resourceId, configurationItemCaptureTime, accountId } = item;
  return `INSERT INTO \`changelog\` \
  ( \`resource_type\`, \`resource_id\`, \`resource_history_id\`, \`change_timestamp\`, \
  \`region\`, \`change_type\`, \`aws_account_id\`, \`diff\`, \`matched_resource_id\`, \
  \`configuration_state_id\`)\
  \
  VALUES( \'${resourceType}\', \'${resourceId}\', resource_history_id , \'${moment(
    configurationItemCaptureTime
  ).format('YYYY-MM-DD hh:mm:ss')}\', \
  \'${awsRegion}\', \'${changeType}\', 0, \
  \'{}\', NULL, NULL);`;
};

const createChangelog =
  'INSERT INTO aws_config.changelog (resource_type, resource_id, resource_history_id, change_timestamp, region, change_type, aws_account_id, diff, matched_resource_id, configuration_state_id) VALUES(:resourceType, :resourceId, :resource_history_id, :change_timestamp, :region, :change_type, :aws_account_id, :diff, :matched_resource_id, :configuration_state_id)';

export { insertChangelog, createChangelog };

// const createChangelog = `INSERT INTO
// aws_config.changelog
// (resource_type, resource_id, resource_history_id*, change_timestamp,
// region, change_type, aws_account_id, diff, matched_resource_id*,
// configuration_state_id)
// VALUES(:resourceType, :resourceId, :resource_history_id, :change_timestamp,
// :region, :change_type, :aws_account_id, :diff, :matched_resource_id,
// :configuration_state_id)`;
