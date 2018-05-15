var config = {
    apiKey: "AIzaSyCMQlDonA48ANrk0PNnq5pW8V-OgMTf3yI",
    authDomain: "traintime-2a11c.firebaseapp.com",
    databaseURL: "https://traintime-2a11c.firebaseio.com",
    projectId: "traintime-2a11c",
    storageBucket: "",
    messagingSenderId: "490100063112"
};
firebase.initializeApp(config);

var database = firebase.database();

$('body').on('click', '#add-train', function(event) {
    event.preventDefault();

    var name = $('#name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var first = $('#first-input').val().trim();
    var freq = $('#frequency-input').val().trim();

    var newTrain = {
        Name: name,
        Destination: destination,
        First: first,
        Frequency: freq,
    };

    database.ref().push(newTrain);

    $('#name-input').val('');
    $('#destination-input').val('');
    $('#first-input').val('');
    $('#frequency-input').val('');

});

// Add something below about prevchildkey
database.ref().on('child_added', function(childSnapshot) {
    
    var name = childSnapshot.val().Name;
    var destination = childSnapshot.val().Destination;
    var first = childSnapshot.val().First;
    var firstFormat = "HH:mm";
    var convertedFirst = moment(first, firstFormat).subtract(1, "years");
    console.log("First train: " + convertedFirst);
    var first12 = moment(convertedFirst).format("hh:mm a");
    var freq = childSnapshot.val().Frequency;
    console.log("Frequency: " + freq);
    var currentTime = moment();
    console.log("Current time: " + currentTime);
    var timeDiff = moment().diff(moment(convertedFirst), "minutes");
    console.log("Time difference: " + timeDiff);
    var remainder = timeDiff % freq;
    console.log("Remainder: " + remainder);
    var minAway = freq - remainder;
    console.log("Minutes until next train: " + minAway);
    var nextArrival = moment().add(minAway, "minutes");
    console.log("Next arrival: " + nextArrival);
    var nextArrivalConverted = moment(nextArrival).format("hh:mm a");

    // var colFirstConverted = moment.unix(colFirst).format("MMM Do, YYYY hh:mm:ss"    );
    // console.log(colFirstConverted);

    // Do calculation heres for colMin, etc.

    $('#train-table > tbody').append('<tr><td>' + name + '</td><td>' + destination + '</td><td>' + freq + '</td><td>' + nextArrivalConverted + '</td><td>' + minAway + '</td></tr>')
})