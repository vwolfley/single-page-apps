// document.getElementById('loadWeatherApp').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default link behavior

//     // Hide the nav div
//     document.getElementById('mainNav').style.display = 'none';

//     // Load the content of the weather app's index.html into the main div
//     fetch('./weather/index.html')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to load content');
//             }
//             return response.text();
//         })
//         .then(html => {
//             // Insert the fetched HTML content into the main div
//             document.getElementById('content').innerHTML = html;
//         })
//         .catch(error => {
//             console.error('Error loading the content:', error);
//         });
// });
