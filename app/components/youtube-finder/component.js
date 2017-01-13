import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeVideo() {
      let url = this.get('url');
      let ytid = url.split('=')[1];
      this.sendAction('changeVideo', ytid);
    }
  }
});
