import {useFetch} from "./modules/fetchTools.js";

window.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postId = urlParams.get('postId')

    if (!postId) {
        // gérer mieux l'erreur
        alert("merci de sélectionner un post / http://localhost/S2_PHP/profile.html?postId=3 par exemple");
    }

    // All clothes in selector
    let selector = document.querySelector('.clothesSelector')
    useFetch('http://localhost/S2_PHP/api/clothing/', 'GET')
        .then(response => {
            if (response) {
                for (let i = 0; i < response.length; i++) {
                    let opt = document.createElement('option');
                    opt.appendChild( document.createTextNode(response[i].type + " / " + response[i].color ) );
                    opt.value = response[i].id;
                    selector.appendChild(opt);
                }
            }
        })

    // get info of the post
    useFetch('/S2_PHP/api/post/' + postId, 'GET')
        .then(response => {
            document.querySelector('.dynamic-picture').src = '/S2_PHP/api' + response.picture
            document.querySelector('.clothe-legend p').innerHTML = response.description
        })

    // Display the clothes list
    let clothesList = document.querySelector('.clothesList')
    useFetch('/S2_PHP/api/clothing/getFromPost/' + postId, 'GET')
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                let li = document.createElement('li');
                li.appendChild( document.createTextNode(response[i].type ) );
                clothesList.appendChild(li);
            }
        })

    // Display the tags
    let tagsList = document.querySelector('.tagsList')

    // Link a clothe to a post
    let linkForm = document.querySelector('.link-clothing')
    linkForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const form = Object.fromEntries(formData);

        if (!sessionStorage.getItem('fashion_token')) {
            alert("you must login")
            return;
        }

        useFetch('http://localhost/S2_PHP/api/contains', 'POST', {
            idPost: postId,
            idClothing: form.clothes
        }).then(response => {
            if (response) {
                // refresh clothes list
            }
        })
    });
});
