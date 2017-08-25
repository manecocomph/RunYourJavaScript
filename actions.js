function addOneMore(scriptUrl) {
  if (scriptUrl) {
    console.log(scriptUrl);
    $("#actions").append("<input type='text' value='" + scriptUrl + "'/><button name='runScriptBtn'>Start</button>");
  } else {
    $("#actions").append("<input type='text'/><button name='runScriptBtn'>Start</button>");
  }

  $("#actions input[type='text']").unbind("focusout");
  $("#actions input[type='text']").focusout(function(){
    scriptUrlInputFocusout($(this));
  });

  $("#actions button[name='runScriptBtn']").unbind("click");
  $("#actions button[name='runScriptBtn']").click(function(){
    var scriptUrl = $(this).prev().val();
      $.get(scriptUrl, null, null, "text")
        .done(function(remoteCode) {
          try {
            eval(remoteCode);
          } catch (err) {
            alert("failed to execute script from: " + scriptUrl);
            console.error("failed to execute script from: " + scriptUrl);
          }
        })
        .fail(function(jqXhr, textStatus) {
          alert(textStatus + ": failed to get script from - " + scriptUrl);
          console.error(textStatus + ": failed to get script from - " + scriptUrl);
      })
  });
}

function scriptUrlInputFocusout(that) {
  if (!that.val()) {
    //console.log("value is empty");
  } else {
    //console.log("value is not empty");
    if (!that.next().next().is("input")) {
      addOneMore();
    }
	}
}

function updateScriptUrlCache() {
  var curScriptUrls = $("#actions input[type='text']").map(function() {return $(this).val();}).get().join();
  window.localStorage.setItem("_fyjs_script_urls", curScriptUrls);
}

//use cached script URLs to popup
var cachedScriptUrls = window.localStorage.getItem("_fyjs_script_urls");
if (cachedScriptUrls) {
  cachedScriptUrls.split(",").forEach(function(ele){
    if (ele && ele.length > 0) {
      console.log(ele);
      addOneMore(ele);
    }
  })
}
addOneMore();

$("#actions input[type='text']").focusout(function() {
  scriptUrlInputFocusout($(this));
  updateScriptUrlCache();
});
