(function() {
    $('#datepicker').datepicker({
      firstDay: 1,
      showOtherMonths: false,
      changeMonth: true,
      changeYear: true,
      dateFormat: 'dd.mm.yy',
      showButtonPanel: true,
      closeText: 'Cancel'
    });
  
    $('#datepicker').click(function() {
      return $('.ui-datepicker').addClass('active');
    });
  
  }).call(this);
  