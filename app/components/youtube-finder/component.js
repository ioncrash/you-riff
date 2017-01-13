import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeVideo() {
      console.log('in changeVideo, url: ', this.get('url'));
    }
  }
});
