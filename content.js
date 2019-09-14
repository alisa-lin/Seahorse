import "github-tweak"
import "linkedin-tweak"


(function() {

})


function get_current_tab() {
    return chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
    });
}

function delegate_tweaks(url) 