import DS from 'ember-data';

export default DS.Model.extend({
  ytid: DS.attr('string'),
  // riffs: DS.hasMany('riff')
});
