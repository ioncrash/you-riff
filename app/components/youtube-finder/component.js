import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeVideo() {
      let url = this.get('url');
      let equalIndex = url.indexOf('=');
      console.log("the equal is at ", equalIndex);
    }
  }
});
