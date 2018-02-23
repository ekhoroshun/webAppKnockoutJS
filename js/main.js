/*********************************************************************************
* WEB422 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Elena Khoroshun Student ID: 101908168 Date: 22 February 2018
*
********************************************************************************/ 



var viewModel = {
    teams: ko.observableArray([]),
    employees: ko.observableArray([]),
    projects: ko.observableArray([]),
    saveTeam: function() {

        var currentTeam = this;

        $.ajax({
            url: "https://hidden-dawn-99445.herokuapp.com/team/" + currentTeam._id(),
            type: "PUT",
            data: JSON.stringify ( 
                {
                    "Projects": currentTeam.Projects(), 
                    "Employees": currentTeam.Employees(), 
                    "TeamLead": currentTeam.TeamLead() 
                }
            ),
            contentType: "application/json"
        })
        .done(function (data) {
            showGenericModal("Success", "[" 
            + currentTeam.TeamName() 
            + "] Updated Successfully");
        })
        .fail(function (err) {
            console.log("err", err)
            showGenericModal("Error", "Error updating the team information.");
        });
 
    }

};

// function saveTeam () {
//     console.log('ok');
//     var currentTeam = this;
    
//     $.ajax({
//         url: "https://hidden-dawn-99445.herokuapp.com/team" + currentTeam._id(),
//         type: "PUT",
//         data: JSON.stringify ( 
//             {
//                 "Projects": currentTeam.Projects(), 
//                 "Employees": currentTeam.Employees(), 
//                 "TeamLead": currentTeam.TeamLead() 
//             }
//         ),
//         contentType: "application/json"
//     })
//     .done(function (data) {
//         showGenericModal("Success", "[" 
//         + currentTeam.TeamName() 
//         + "] Updated Successfully");
//     })
//     .fail(function (err) {
//         showGenericModal("Error", "Error updating the team information.");
//     });
// }


function  initializeTeams(){
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "https://hidden-dawn-99445.herokuapp.com/teams-raw",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
             viewModel.teams = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function (err) {
            reject("Unable to show Teams Data");
        });
    });
}

function initializeEmployees() {
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "https://hidden-dawn-99445.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            viewModel.employees = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function (err) {
            reject("Unable to show Teams Data");
        });
    });
}


function initializeProjects () {
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "https://hidden-dawn-99445.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
         viewModel.projects = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function (err) {
            reject("Unable to show Teams Data");
        });
    });

}



function showGenericModal(title, message)
{ 
    
    
    $("#myModalTitle").empty();
    $("#myModalMessage").empty();
  
    $("#myModalTitle").text(title);
    $("#myModalMessage").html(message);

    $('#genericModal').modal('show');

}

$(document).ready(function(){

    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function () {
        ko.applyBindings(viewModel);
        $("select.multiple").multipleSelect({ filter: true });
        $("select.single").multipleSelect({ single: true, filter: true });
    }
)
    .catch(function(err){
        showGenericModal("Error",err);
   });


})


