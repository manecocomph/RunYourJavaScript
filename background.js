chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    'url': chrome.extension.getURL('home.html')
  }, function(tab) {
    // Tab opened.
    //console.log("in background js");
  });
});
