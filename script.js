$(document).ready(function(){

    console.log('Ready')

    //  Fetch the current date and update it in the DOM
    var date = new Date();
    var month = date.toLocaleString('default', { month: 'long' });
    var day = date.getDate();
    var year = date.getFullYear();
    $('#date').text(month + ' ' + day + ', ' + year);

    //  write an event, when Submit button is clicked
    $('#submit').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'customer_review' : text_value}
        console.log(input_text)

        //  ajax request
        $.ajax({

            //  type of web request
            type : 'POST',

            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  if everything is successful, run this function
            success : function(result){

                // extract prediction and emoticon url from result
                let prediction = result.sentiment
                let emoticon_url = result.emoticon_url

                //  update the DOM elements
                $('#prediction').text(prediction);
                $('#emoticon').attr('src', emoticon_url);

                //  show them
                $('#result').show();
            },

            //  if any error, run this function
            error : function(result){

                console.log(result)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})
