// EMAIL SENDING
export const sendEmails = () => {
    var name = $(".name");
    var email = $(".email");
    var body = $(".body");

    console.log("NAME: " + name.val());
    console.log("EMAIL: " + email.val());
    console.log("MESSAGE: " + body.val());

    $(".contact-form").submit(function(e) {
        e.preventDefault();
    });

    if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(body)) {
        $.ajax({
        url: 'lib/php/sendEmail.php',
        method: 'POST',
        dataType: 'json',
        data: {
            name: name.val(),
            email: email.val(),
            body: body.val()
        }, success: function (response) {
            console.log("submitted to url. " + response);
            $('.contact-form')[0].reset();
            $('.sent-notification').text("Message Sent Successfully.");
        }
        });
    } 
}

function isNotEmpty(caller) {
    if (caller.val() == "") {
        caller.css('border', '1px solid red');
        return false;
    } else
        caller.css('border', '');
    
    return true;
}