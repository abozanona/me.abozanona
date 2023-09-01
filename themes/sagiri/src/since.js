function show_date_time () {
  window.setTimeout(function () {
    show_date_time();
  }, 1000);
  var BirthDay = new Date(window.CONFIG.since);
  var today = new Date();
  var timeold = (today.getTime() - BirthDay.getTime());
  var msPerDay = 24 * 60 * 60 * 1000;

  var e_daysold = timeold / msPerDay;
  var yearsold = Math.floor(e_daysold / 365)
  e_daysold = e_daysold % 365;
  var daysold = Math.floor(e_daysold);
  var e_hrsold = (e_daysold - daysold) * 24;
  var hrsold = Math.floor(e_hrsold);
  var e_minsold = (e_hrsold - hrsold) * 60;
  var minsold = Math.floor((e_hrsold - hrsold) * 60);
  var seconds = Math.floor((e_minsold - minsold) * 60);
  $('#since').html(yearsold + " year " + daysold + " day " + hrsold + " hur " + minsold + " mnt " + seconds + " sec");
}
show_date_time();
