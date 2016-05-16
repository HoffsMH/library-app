import Ember from 'ember';

export default Ember.Controller.extend({
  emailAddress: '',
  message: '',
  responseMessage: '',

  validEmail: Ember.computed('emailAddress', function() {
    return this.get('emailAddress').match(/^.+@.+\..+$/);
  }),
  validMessage: Ember.computed.gte('messageCharCount', 5),
  validForm: Ember.computed.and('validEmail' , 'validMessage'),

  messageCharCount: Ember.computed('message', function() {
    return this.get('message').length;
  }),


  isDisabled: Ember.computed.not('validForm'),

  actions: {
    saveContact() {
      const email = this.get('emailAddress');
      const message = this.get('message');

      const newContact = this.store.createRecord('contact', {
        email: email,
        message: message
      });

      newContact.save().then((response) => {
        this.set('responseMessage', `We got your message and we'll get in touch soon. ${response.get("email")}`);
        this.set('emailAddress', '');
        this.set('message', '');
      });

    },
    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.set('responseMessage', '');
    }
  }
});
