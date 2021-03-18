//Listen to the click on the Get Button
document.querySelector('#get-infos')
.addEventListener('click', () => {
    getPlaces();
});

//Listen to the Keypress on the Input
document.querySelector('#input-zip')
.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        getPlaces();        
    }
});

//Delete places
let deletePlace = document.querySelector('body');
deletePlace.addEventListener('click', (event) => {
    if (event.target.className == 'delete') {
        document.querySelector('#result > article').remove()
        inputZip.value = '';
    }
});

//Get zip code value from the input
let inputZip = document.querySelector('#input-zip');

const getPlaces = () => {

    //Check if the input is empty
    if (inputZip.value === '') {
        return;    
    }

    //Make the request
    fetch(`http://api.zippopotam.us/US/${inputZip.value}`)
    .then( res => {
        if (res.status != 200) {
            let errorMsg = document.querySelector('#error-msg');

            errorMsg.classList.remove('none');
            inputZip.value = '';

            setTimeout(() => {
                errorMsg.classList.add('none');
            }, 3000);

            throw Error(res.statusText);
        } else {
            return res.json();
        }
    })
    .then( infos => { 
        let output = '';
        infos.places.forEach(place => {
            //Show location infos
            output += 
            `
                <article class="message is-primary mt-3">
                    <div class="message-header px-6">
                    <p>Location Infos</p>
                    <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body px-6">
                    <ul>
                        <li> <strong>Country : </strong> ${infos.country}</li>
                        <li> <strong>City : </strong> ${place['place name']}</li>
                        <li> <strong>State : </strong> ${place['state']}</li>
                        <li> <strong>Longitude : </strong> ${place['longitude']}</li>
                        <li> <strong>Latitude : </strong> ${place['latitude']}</li>
                    </ul>
                    </div>
                </article>
            `
        });
        //Insert into result div
        document.querySelector('#result').innerHTML = output;
    })
    .catch(err => { console.log(err); })
}
