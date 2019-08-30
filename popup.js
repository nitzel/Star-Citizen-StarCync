const bulkOptionsInput = '#bulkOptionsInput';

function followORG() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*"}, function(tabs) {
        
            var activeTab = tabs[0];
            chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
                chrome.tabs.sendMessage(activeTab.id, { "action": 1 });
            });
    });
}

function unfollowORG() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {
        
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
            chrome.tabs.sendMessage(activeTab.id, { "action": 2 });
        });
    });
}

function saveToChromeSync() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {
        
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
            chrome.tabs.sendMessage(activeTab.id, { "action": 3 });
        });
    });
}

function loadFromChromeSync() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {
        
        var activeTab = tabs[0];
        chrome.storage.sync.get('contacts', function (r) {
            var gotContacts;
            gotContacts = r['contacts'];
            if (!gotContacts) {gotContacts = 0}
                chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
                    chrome.tabs.sendMessage(activeTab.id, { "action": 4, "list": gotContacts });
                });
        });
    });
}

function eraseALL() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {
        
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
            chrome.tabs.sendMessage(activeTab.id, { "action": 5 });
        });
    });
}

function eraseBackup() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {
        
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
            chrome.tabs.sendMessage(activeTab.id, { "action": 6 });
        });
    });
}
function addfromList() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {

        var addList = $(bulkOptionsInput).value;
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
            chrome.tabs.sendMessage(activeTab.id, { "action": 7, "list": addList });
        });
    });
}
function removefromList() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {

        var remList = $(bulkOptionsInput).value;
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
            chrome.tabs.sendMessage(activeTab.id, { "action": 8, "list": remList });
        });
    });
}
function saveToTextFile() {
    chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
            chrome.tabs.sendMessage(activeTab.id, { "action": 9 });
        });
    });
}

function loadData() {
    document.forms['backupFileForm'].elements['backupFileInput'].onchange = function (evt) {
        if (!window.FileReader) return; // Browser is not compatible

        var reader = new FileReader();

        reader.onload = function (evt) {
            if (evt.target.readyState != 2) return;
            if (evt.target.error) {
                alert('Error while reading file');
                return;
            }

            filecontent = evt.target.result;
            function restoreFromtext(results) {
                chrome.tabs.query({ url: "https://robertsspaceindustries.com/*" }, function (tabs) {
                    
                    var addList = results;
                    var activeTab = tabs[0];
                    chrome.tabs.executeScript(activeTab.id, { file: 'content_script.js' }, function () {
                        chrome.tabs.sendMessage(activeTab.id, { "action": 7, "list": addList });
                    });
                });
            }
            restoreFromtext(evt.target.result);
            document.forms['backupFileForm'].elements['text'].value = evt.target.result;
        };

        reader.readAsText(evt.target.files[0]);
    };
}


$('#btnFollowOrg').click(followORG);
$('#btnUnfollowOrg').click(unfollowORG);

$('#btnToggleBulkOptions').click(() => $("#bulkOptions").toggle());
$('#btnAddBulk').click(addfromList)
$('#btnRemoveBulk').click(removefromList)

$('#btnToggleBackupOptions').click(() => $("#backupOptions").toggle())
$('#backupFileInput').click(loadData)
$('#btnSaveToFile').click(saveToTextFile)
$('#btnSaveToChromeSync').click(saveToChromeSync);
$('#btnRestoreFromChromeSync').click(loadFromChromeSync);

$('#btnToggleDestructiveOptions').click(() => $("#destructiveOptions").toggle())
$('#eraseALL').click(eraseALL);
$('#eraseBackup').click(eraseBackup); 