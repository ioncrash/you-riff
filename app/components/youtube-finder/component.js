import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeVideo() {
      let url = this.get('url');
      console.log(url.split('=')[1]);
    }
  }
});
