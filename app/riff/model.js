import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  flagged: DS.attr('boolean'),
  stamp: DS.attr('number'),
  video: DS.belongsTo('video'),
  user: DS.belongsTo('user')
});
