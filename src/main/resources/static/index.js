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

    // e-post:sjekke om den inneholder @
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

    // TELEFONNUMMER
    const telefonRegex = /^\d{8}$/;
    if (!telefonRegex.test(enBillett.telefonnr) || enBillett.telefonnr === "") {
        $("#telefonnrFeil").html("Skriv inn et gyldig telefonnummer på 8 siffer");
        feilmelding = true;
    } else {
        $("#telefonnrFeil").html("");
    }

    // FORNAVN
    const fornavnRegex = /^[a-zA-ZæøåÆØÅ\s-]+$/;
    if (!fornavnRegex.test(enBillett.fornavn) || enBillett.fornavn === "") {
        $("#fornavnFeil").html("Skriv inn et gyldig fornavn");
        feilmelding = true;
    } else {
        $("#fornavnFeil").html("");
    }

    // ETTERNAVN
    const etternavnRegex = /^[a-zA-ZæøåÆØÅ\s-]+$/;
    if (!etternavnRegex.test(enBillett.etternavn) || enBillett.etternavn === "") {
        $("#etternavnFeil").html("Skriv inn et gyldig etternavn");
        feilmelding = true;
    } else {
        $("#etternavnFeil").html("");
    }

    // E-POST
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enBillett.epost) || enBillett.epost === "") {
        $("#epostFeil").html("Skriv inn en gyldig e-post");
        feilmelding = true;
    } else {
        $("#epostFeil").html("");
    }


    // hvis feilmeldingen er false vil all input nullstilles:
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