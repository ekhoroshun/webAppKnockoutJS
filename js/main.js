/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Elena Khoroshun Student ID: 101908168 Date: 24 January 2018
*
*
********************************************************************************/ 


$(document).ready(function(){
    
$('#data').html('web422');

 $("a").on("click", function(event){
        event.preventDefault();   
}),

$('#teams-menu').on("click", function(){
        $.ajax({
        url: "https://hidden-dawn-99445.herokuapp.com/teams", // This only works if the Teams API is running locally - change this url to your Heroku API (/employees) to use your API on Heroku
        type: "GET",
        //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
        contentType: "application/json"

    })
    .done(function(teams){
  
    $('#data').empty();
    $('#data').append("<h3> Teams </h3>")
    $('#data').append(JSON.stringify(teams));
    })
    .fail(function(err){
        console.log("failed with" + err);
    })
})
});


$('#employees-menu').on("click", function(){
    $.ajax({
        url: "https://hidden-dawn-99445.herokuapp.com/employees",
        type: "GET",
        contentType: "aplication/json"
    })
     .done(function(employees){
    

    $('#data').empty();
    $('#data').append("<h3> Employees </h3>")
    $('#data').append(JSON.stringify(employees));
    })
    .fail(function(err){
        console.log("failed with" + err);
    })

})


$('#projects-menu').on("click", function(){
    $.ajax({
        url: "https://hidden-dawn-99445.herokuapp.com/projects",
        type: "GET",
        contentType: "aplication/json"
    })
     .done(function(projects){
    

    $('#data').empty();
    $('#data').append("<h3> Projects </h3>")
    $('#data').append(JSON.stringify(projects));
    })
    .fail(function(err){
        console.log("failed with" + err);
    })

})

$('#positions-menu').on("click", function(){

    $.ajax({
        url: "https://hidden-dawn-99445.herokuapp.com/positions",
        type: "GET",
        contentType: "aplication/json"
    })
     .done(function(positions){
    

    $('#data').empty();
    $('#data').append("<h3> Positions </h3>")
    $('#data').append(JSON.stringify(positions));
    })
    .fail(function(err){
        console.log("failed with" + err);
    })

})