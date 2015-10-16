$(function (f) {
  function showElement(e) {
    e.preventDefault();
    var elemId = this.getAttribute('data-elem-show');
    f('#' + elemId).fadeIn();
  }

  function hideElement(e) {
    e.preventDefault();
    var elemId = this.getAttribute('data-elem-hide');
    f('#' + elemId).fadeOut();
  }

  function validateForm(form) {
    $inputs = form.find('.requires-validation');
    $inputs.each(function (i, elem) {
      elem = $(elem);
      var validation = elem.attr('data-validate');
      elem.parent().removeClass('invalid');
      if (validation && (elem[0].required || elem.val().trim().length > 0)) {
        var validationRegex = new RegExp(validation);
        if (!validationRegex.test(elem.val())) {
          elem.parent().addClass('invalid');
        }
      }
    });

    return form.find('.invalid').length === 0;
  }

  function submitForm(e) {
    e.preventDefault();

    var elem = $(this);
    if (validateForm(elem)) {
      var data = elem.serialize();
      console.log(data);
      userFilledMatchingForm();
    }
  }

  function focusChildren() {
    this.children[0].focus();
  }

  function userFilledMatchingForm() {
    f.cookie('matching-form', 'filled', { expires: 365, path: '/' });
  }

  function shouldDisplayBanner() {
    if (f.cookie('matching-form') === 'filled') {
      f('#matching-banner').hide();
    }
  }

  function init() {
    f('.show-elem').click(showElement);
    f('.hide-elem').click(hideElement);
    f('.matching-form-form').submit(submitForm);
    f('.form-match-name, .form-match-handle, .form-question').click(focusChildren);
    shouldDisplayBanner();
  }

  init();
});
