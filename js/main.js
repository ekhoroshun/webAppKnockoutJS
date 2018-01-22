$(document).ready(function(){
   
    $(".dropdown-menu").on("click", "#teams-menu", function(event){
        event.preventDefault();
    
      
    $.ajax({
        url: "https://hidden-dawn-99445.herokuapp.com/teams", // This only works if the Teams API is running locally - change this url to your Heroku API (/employees) to use your API on Heroku
        type: "GET",
        //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
        contentType: "application/json"

    })
    .done(function(teams){

    var $data = $("data");

    $data.empty();
    $data.append("<h3> Teams </h3>")
    $data.append(JSON.stringify(teams));
    
    })

    .fail(function(err){
        console.log("failed with" + err);
    })
})
})