if (!NexT.utils.isMobile()) {
    const apFixed = new APlayer({
      element: document.getElementById('aplayer-fixed'),
      mutex: true,
      theme: '#97dffd',
      order: 'random',
      lrcType: 3,
      fixed: true,
    });
    $.ajax({
      url: 'https://cdn.jsdelivr.net/gh/abozanona/abozanona.me/assets/playlest.json?v=0.0.78', //TODO: Read from theme settings
      success: function (list) {
        apFixed.list.add(list);
      }
    });
  }