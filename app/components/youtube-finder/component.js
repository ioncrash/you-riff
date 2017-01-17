import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeVideo() {
      let url = this.get('url');
      if (url.includes('=')) {
        let ytid = url.split('=')[1];
        this.sendAction('changeVideo', ytid);
      } else {
        this.sendAction('changeVideo', null, "Sorry, that doesn't look like a valid YouTube url. Please try something with an = in it");
      }

    }
  }
});
