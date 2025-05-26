A tiny, zero-dependency jQuery plugin for declarative, per-field form validation. Drop it on any site to:

- Enforce **required** fields  
- Enforce **minimum length**  
- Validate as **email** or **South African phone**  
- Plug in your own **custom validators**  
- Automatically toggle **error** / **valid** classes  
- Show a single, customizable form-level error message

---

## 📦 Installation

### Download

1. **Copy** `simple-form-validator.js` into your project (e.g. `js/plugins/`).
2. **Include** it **after** jQuery in your page:

   ```html
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   <script src="js/plugins/simple-form-validator.js"></script>
   ```

## 🚀 Usage
Mark up your form with name attributes:

```html
<form id="contactForm">
  <input name="email" type="email" placeholder="Your email">
  <input name="phone" type="text" placeholder="SA phone number">
  <textarea name="message" placeholder="Your message"></textarea>
  <button type="submit">Send</button>
</form>
```

Initialize the plugin with your field rules:

```js
jQuery(function(){
  jQuery('#contactForm').simpleFormValidator({
    fields: {
      email:   { required: true, type: 'email' },
      phone:   { required: true, type: 'phone' },
      message: { required: true, minLength: 10 }
    },
    // — optional overrides —
    // errorClass: 'my-error',
    // validClass: 'my-valid',
    // errorMessage: 'Oops—something needs fixing!',
  });
});
```

That’s it!

The plugin hooks into the form’s native submit event.

Invalid fields get the errorClass; valid ones get the validClass.

A single form-level message is injected (and removed) automatically.

Tip: If you really need to trigger validation on a button click, you can still do:

```js
$('#myForm-submit').on('click', function(e){
  e.preventDefault();
  $('#contactForm').submit();
});
```

## ⚙️ Configuration Options
| Option | Type |	Default | Description |
|---|---|---|---|
| fields | Object	{}	Map of fieldName → rules (see below)
| errorClass | String | 'field-error' | CSS class applied to invalid inputs |
| validClass | String | 'field-valid' | CSS class applied to valid inputs |
| errorContainerId | String | 'form-error' | id attribute for the injected form-level error wrapper |
| errorMessage | String | 'Please correct the errors in the form.' | Default text shown in the form-level error wrapper |
| onShowError | Function($form) | built-in | Callback when form is invalid — receives the jQuery form instance |
| onHideError | Function($form) | built-in | Callback when form becomes valid — removes or hides the error wrapper |

### Field Rule Properties
- required: true|false
- minLength: Number
- type: 'email' \| 'phone'
  - 'email' uses a basic /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ regex
  - 'phone' uses a South African phone format (10 digits, starts with 0, prefixes 06/07/08)
- validator: Function(value) → Boolean
  - Supply your own function for bespoke checks

## 🛠️ Custom Validators
If you need to enforce something special:

```js
$('#signupForm').simpleFormValidator({
  fields: {
    username: {
      required: true,
      validator: function(val){
        // only lowercase & numbers
        return /^[a-z0-9]+$/.test(val);
      }
    }
  }
});
```

## 🤝 Contributing
- Fork this repo
- Add your feature or fix
- Submit a PR
- All improvements welcome—tests, docs, bugfixes, new rules, etc.

## 📄 License
MIT License © [Ashton Willey]



