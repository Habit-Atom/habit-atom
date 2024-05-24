chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if (request.action === 'storeToken') {
            storeToken(request.token)
            sendResponse({ status: 'success' });
        }
    }
);

function storeToken(token) {
  chrome.storage.local.set({ jwtToken: token }, function() {
    console.log('Token is stored.');
  });
}