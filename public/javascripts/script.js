// Constants

// State

// Cached Element References

const input = document.querySelector('input[type="text"]'); // using an attribute selector syntax
const main = document.querySelector('main');
// Event Listeners
document.querySelector('form').addEventListener('submit', handleGetData);
// Functions

// Using fetch to make HTTP request from the browser to the OMDB web server
async function handleGetData(event) {
    event.preventDefault(); // turn off default behavior of form submission
    const searchTerm = input.value; // gather user input
    if(!searchTerm) return; // if no input provided; do not fetch

    try {
        const response = await fetch('/get-movie/?t=' + searchTerm)

        const data = await response.json(); // process JSON body into a JS object
        
        if(data.Response === 'False') {
            alert('Not Found');
        } else {
            render(data); // passing data to render function
        }
        
        input.value = ""; // reset the form input element
    } catch (error) {
        // if something fails with the request, we notify the user
        alert('Sorry, something went wrong');
        console.log(error);
    }
}


function render(data) {
    main.innerHTML = `
        <img src="${data.Poster} alt="${data.Title}" />
        <h3>Title: ${data.Title}</h3>
        <p>Year: ${data.Year}</p>
        <p>Rating: ${data.Rated}</p>
    `;
}