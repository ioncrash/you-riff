import Ember from 'ember';

export default Ember.Component.extend({
  currentTime: 0,

  isDisplayed: Ember.computed('currentTime', 'stamp', function() {
    return this.get('riff').get('stamp') < this.get('currentTime');
  }),
});
