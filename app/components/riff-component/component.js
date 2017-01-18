import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  user: Ember.computed.alias('auth.credentials.email'),

  isUser: Ember.computed('user', 'riff.user.email', function() {
    return this.get('riff.user.email') === this.get('user');
  }),

  currentTime: 0,
  stampTime: Ember.computed('stamp', function() {
    let d = Number(this.get('riff.stamp'));
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? ":" : "") : "";
    return hDisplay + mDisplay + sDisplay;
  }),

  isDisplayed: Ember.computed('currentTime', 'stamp', function() {
    return this.get('riff').get('stamp') < this.get('currentTime');
  }),
});
