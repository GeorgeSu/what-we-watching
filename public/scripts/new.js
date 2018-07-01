$(document).ready(function() {
    var privateLobby = $("#privateLobby");
    var publicLobby = $("#publicLobby");
    var passwordForm = $("#lobbyPassword");
    
    init();
    
    function init() {
        addLobbyPrivacyRadioListeners();
    }
    
    function addLobbyPrivacyRadioListeners() {
        privateLobby.change(function() {
            if (privateLobby.is(':checked')) {
                requirePassword();
            }
        })
        
        publicLobby.change(function() {
            if (publicLobby.is(':checked')) {
                optionalPassword();
            }
        })
    }
    
    function requirePassword() {
        passwordForm.attr("required", true);
    }
    
    function optionalPassword() {
        passwordForm.attr("required", false);
    }
});