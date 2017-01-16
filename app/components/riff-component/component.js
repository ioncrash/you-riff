import Ember from 'ember';

export default Ember.Component.extend({
  currentTime: 0,
  stamp: Ember.computed('riff', function() {return this.get('riff').get('stamp')}),

  isDisplayed: Ember.computed('currentTime', 'stamp', function() {
    return this.get('riff').get('stamp') < this.get('currentTime');
  }),
});
