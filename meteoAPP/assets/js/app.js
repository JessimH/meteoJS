window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let degreeSection = document.querySelector(".degree-section");
    let degreeSpan = document.querySelector('.degree-section span');
    let dateSection = document.querySelector('.date-section');
    let dmy = document.querySelector('.dmy');
    let hour = document.querySelector('.hour');
    let d = new Date();
    let date = d.getDate() + ' / ' + (d.getMonth() + 1) + ' / ' + d.getFullYear();
    let hours = d.getHours() + " : " + d.getMinutes();



    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(UserPosition => {

            long = UserPosition.coords.longitude;
            lat = UserPosition.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/996853e74facf0a45488c2b50dfd159e/${lat},${long}`;

            dmy.textContent = date;
            hour.textContent = hours;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    let celsuis = (temperature - 32) * 5 / 9;
                    let far = temperature;

                    setIcon(icon, document.querySelector('.icon'));

                    degreeSection.addEventListener('click', () => {
                        if (degreeSpan.textContent === "°C") {
                            degreeSpan.textContent = "F";
                            temperatureDegree.textContent = far;
                        } else {
                            degreeSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsuis);
                        }
                    })
                })
        });
    }

    function setIcon(icon, iconId) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});