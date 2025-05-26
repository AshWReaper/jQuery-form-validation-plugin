/*!
 * simple-form-validator.js
 * A tiny jQuery plugin for declarative form validation
 * Developed by Gridlink.co.za
 * licenced under MIT licence.
 */
;(function($){
  // Default settings
  var defaults = {
    fields: {},                  // e.g. { email: { required: true, type: 'email' }, phone: { type: 'phone' }}
    errorClass: 'field-error',   // applied to invalid inputs
    validClass: 'field-valid',   // applied to valid inputs
    errorContainerId: 'form-error',
    errorMessage: 'Please correct the errors in the form.',
    onShowError: function($form) {
      // default: inject a generic error message after the form
      if (!$('#' + this.errorContainerId).length) {
        $form.after(
          '<div id="' + this.errorContainerId + '"><span>' +
          this.errorMessage +
          '</span></div>'
        );
      }
    },
    onHideError: function($form) {
      $('#' + this.errorContainerId).remove();
    }
  };

  // Helper: basic email regex
  function isEmail(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  // Helper: South African phone validator
  function isPhoneSA(phone) {
    if (!phone) return false;
    var cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10 || cleaned.charAt(0) !== '0') return false;
    var prefix = cleaned.substring(0, 2);
    return ['06','07','08'].indexOf(prefix) !== -1;
  }

  $.fn.simpleFormValidator = function(options) {
    var settings = $.extend(true, {}, defaults, options);

    return this.each(function(){
      var $form = $(this);

      // On form submit
      $form.on('submit.simpleFormValidator', function(e){
        var formIsValid = true;

        // Validate each field per the rules
        $.each(settings.fields, function(name, rules){
          var $field = $form.find('[name="' + name + '"]');
          var val    = $.trim($field.val());
          var ok     = true;

          // required
          if (rules.required && !val) {
            ok = false;
          }
          // minLength
          if (ok && rules.minLength && val.length < rules.minLength) {
            ok = false;
          }
          // built-in types
          if (ok && rules.type === 'email' && !isEmail(val)) {
            ok = false;
          }
          if (ok && rules.type === 'phone' && !isPhoneSA(val)) {
            ok = false;
          }
          // custom validator fn
          if (ok && typeof rules.validator === 'function' && !rules.validator(val)) {
            ok = false;
          }

          if (!ok) {
            formIsValid = false;
            $field.addClass(settings.errorClass).removeClass(settings.validClass);
          } else {
            $field.removeClass(settings.errorClass).addClass(settings.validClass);
          }
        });

        // If invalid, prevent submit & show error
        if (!formIsValid) {
          e.preventDefault();
          settings.onShowError.call(settings, $form);
        } else {
          settings.onHideError.call(settings, $form);
        }
      });
    });
  };
})(jQuery);
