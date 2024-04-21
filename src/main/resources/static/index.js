let utBillett;

function kjopBillett() {

    // lage et objekt enBillett
    const enBillett = {
        antall: $("#antall").val(),
        film: $("#film").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    // validering av input

    // splitter e-post for å sjekke om den inneholder @
    let epostGyldig = $("#epost").html = enBillett.epost.split("@");
    let feilmelding = false;

    // ANTALL
    if ((isNaN(enBillett.antall) || enBillett.antall <= 0) || enBillett.antall === null) {
        $("#ikkeTall").html("Feil i antall. Må være et tall på 1 eller høyere");
        feilmelding = true;
    } else {
        $("#ikkeTall").html(null);
    }

    // FILM
    if (enBillett.film === "feilFilm") {
        $("#ikkeValgtFilm").html("Må velge en film");
        feilmelding = true;
    } else {
        $("#ikkeValgtFilm").html("");
    }

    // FORNAVN
    if (!isNaN(enBillett.fornavn) || enBillett.fornavn === "") {
        $("#fornavnFeil").html("Må skrive noe inn i fornavn");
        feilmelding = true;
    } else if (enBillett.fornavn.length < 2) { //(fornavnLengde.length < 2)
        $("#fornavnFeil").html("Fornavn for kort");
        feilmelding = true;
    } else {
        $("#fornavnFeil").html("");
    }

    //ETTERNAVN
    if (!isNaN(enBillett.etternavn) || enBillett.etternavn === "") {
        $("#etternavnFeil").html("Må skrive noe inn i etternavn");
        feilmelding = true;
    } else if (enBillett.etternavn.length < 2) {
        $("#etternavnFeil").html("Etternavn for kort");
        feilmelding = true;
    } else {
        $("#etternavnFeil").html("");
    }

    // TELEFONNR
    if (isNaN(enBillett.telefonnr) || enBillett.telefonnr === "" || enBillett.telefonnr.length != 8) {
        $("#telefonnrFeil").html("Telefonnummer må inneholde 8 tall");
        feilmelding = true;
    } else {
        $("#telefonnrFeil").html("");
    }

    // E-POST
    if (!isNaN(enBillett.epost) || enBillett.epost === "") {
        $("#epostFeil").html("Må skrive noe inn i e-post");
        feilmelding = true;
    } else if (enBillett.epost.length < 6 || epostGyldig.length != 2) {
        $("#epostFeil").html("E-post er for kort eller mangler @");
        feilmelding = true;
    } else {
        $("#epostFeil").html("");
    }

    // hvis feilmeldingen ikke er true vil all input nullstilles:
    if (feilmelding === false) {
        $("#antall").val("");
        $("#film").val($("#feilFilm").val());
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    } else {
        return;
    }
    // Hvis feltene er tomme vil den ikke skrive ut billetten, hvis det er fylt inn riktig skriver den ut en billett:
    if (enBillett.antall === "" && enBillett.film === "feilFilm" && enBillett.etternavn === "" &&
        enBillett.telefonnr === "" && enBillett.epost === "") {
        return;
    } else {
        $.post("/lagBillett", enBillett, function () {
            hentAlle();
        });
    }
}

function skrivUt(alleBillettene) {

    // Tabellen over billettene:
    utBillett =
        "<table class='table table-striped'><tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Telefonnummer</th>" +
        "<th>E-post</th>" +
        "</tr>";

    for (let enBillett of alleBillettene) {
        utBillett += "<tr>" +
            "<td>" + enBillett.film + "</td>" +
            "<td>" + enBillett.antall + "</td>" +
            "<td>" + enBillett.fornavn + "</td>" +
            "<td>" + enBillett.etternavn + "</td>" +
            "<td>" + enBillett.telefonnr + "</td>" +
            "<td>" + enBillett.epost + "</td>" +
            "</tr>";
    }
    utBillett += "</table>";
    $("#billetter").html(utBillett);
}

function hentAlle() {
    $.get("/hentAlle", function (data) {
        skrivUt(data);
    });
}

function slettAlleBilletter() {
    $.post("/slettAlle", function () {
        hentAlle();
    });
}