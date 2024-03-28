$(function () {

    console.log("Esta función del navegador está pensada para desarrolladores.\n" +
        "Si alguien te indicó que copiaras y pegaras algo aquí para\n" +
        "habilitar una función o para \"hackear\" la cuenta de alguien,\n" +
        "se trata de un fraude. Si lo haces, esta persona podrá \n" +
        "acceder a tu cuenta.\n" +
        "\n" +
        "Sitio desarrollado por https://bigproject.dev/");

    if(getCookie("is_cookie_compliance_accepted")){
        $("#cookie-notification").addClass("d-none").removeClass("d-block");
    }else{
        $("#cookie-notification").addClass("d-block").removeClass("d-none");
    }


    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }


    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    $('body').on('click', '.btn-close-cookie-notification', function(){
        setCookie('is_cookie_compliance_accepted', true, 3000);
        $(this).parent().fadeOut(250);
        $("#cookie-notification").addClass("d-none").removeClass("d-block");
    });

    $("#btn-adquirir").click(adquirir);

});

function adquirir() {
    var terms = 0;
    if ($("#terms").is(':checked')) {
        terms = 1;
    }
    var message = "";
    var parametros = {
        tbp: 1,
        names: $("#first_name").val(),
        apellidos: $("#last_name").val(),
        tel: $("#phone").val(),
        identification: "-",
        email: "-",
        city: "-",
        direccion: "-"
    };

    
    if ($("#first_name").val() === "" ||
        $("#last_name").val() === "" ||
        $("#phone").val() === "") {
        message = "Por favor completa tus datos.";
        Swal.fire({
            title: 'DT ASSIST',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Listo'
        });
    } else {
        const regex = new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$');
        if (!regex.test($("#phone").val())) {
            message = "El número celular parece ser invalido.";
        }
        if (message != "") {
            Swal.fire({
                title: 'DT ASSIST',
                text: message,
                icon: 'warning',
                confirmButtonText: 'Listo'
            });
        } else {
            
            $.ajax({
                method: "POST",
                dataType: "json",
                url: 'controllers/customer.controller.php',
                data: parametros
            })
                .done(function (response) {
                    if (response.estado == '200') {
                                $("#first_name").val("");
                                $("#last_name").val("");
                                $("#phone").val("");
                                
                        Swal.fire({
                                  title: 'DT ASSIST',
                                  text: "Excelente, en breve una asesora se contactará contigo ",
                                  icon: 'success',
                                  showCancelButton: false, // There won't be any cancel button
                                  showConfirmButton: false // There won't be any confirm button
                                });
                    }
                });
        }
    }
}

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function mailValido(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function cedulaValidad(cedula) {
    var cad = cedula;
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }
        total = total % 10 ? 10 - total % 10 : 0;
        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    }
}