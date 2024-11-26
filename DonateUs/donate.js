import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, setDoc, getDoc, doc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCKcgP3X7orqbwNINh8GdsCAgPzthBLC-4",
    authDomain: "ammayapan-7a98e.firebaseapp.com",
    projectId: "ammayapan-7a98e",
    storageBucket: "ammayapan-7a98e.appspot.com",
    messagingSenderId: "127501600744",
    appId: "1:127501600744:web:ae067b4ba94e5d583c865d",
    measurementId: "G-L8HH53Z5G8"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore();

const docRef = doc(db, "Donate", "Impact")

async function getAllDocumentsFromCollection(collectionPath) {
    try {
        // Get a reference to the collection
        const querySnapshot = await getDocs(collection(db, collectionPath));
        remove_elements()

        // Iterate over all documents in the collection
        var index = 0
        querySnapshot.forEach((doc) => {
            console.log(`Document ID: ${doc.id}`);
            console.log('Document data:', doc.data());
            const curr_document_data = doc.data();
            add_row(index, curr_document_data.Currency, curr_document_data.Price, curr_document_data.Description)
            index += 1
        });
    } catch (error) {
        console.error('Error retrieving documents:', error);
    }
}


function add_row(impact_num, impact_currency, impact_price, impact_description) {
    document.querySelector('#impacts').insertAdjacentHTML(
        'afterbegin',
        `<div class="impact_container" id="impact_${impact_num}" onclick="on_impact_selected(${impact_num})">
                            <div class="impact_radio_btn">
                                <div class="radio_circle" id="impact_radio_${impact_num}"></div>
                            </div>
                            <div class="impact_details" id="impact_details_${impact_num}">
                                <h3>${impact_currency}</h3>
                                <h3>${impact_price}</h3>
                                <p>${impact_description}</p>
                            </div>
                        </div>`
    )
}

function remove_elements() {
    document.getElementById('impacts').innerHTML = "";
}

let current_impact_option = null

function on_impact_selected(impact_num) {
    const impacts = document.querySelectorAll(".impact_container")
    impacts.forEach(impact => {
        impact.classList.remove("impact_selected");
    });
    const impact = document.getElementById(`impact_${impact_num}`)
    impact.classList.add("impact_selected")


    const impact_details = document.querySelectorAll(".impact_details")
    impact_details.forEach(impact_detail => {
        impact_detail.classList.remove("impact_details_selected");
    });
    const impact_detail = document.getElementById(`impact_details_${impact_num}`)
    impact_detail.classList.add("impact_details_selected")


    const impact_radios = document.querySelectorAll(".radio_circle")
    impact_radios.forEach(impact_radio => {
        impact_radio.classList.remove("radio_circle_selected");
    });
    const impact_radio = document.getElementById(`impact_radio_${impact_num}`)
    impact_radio.classList.add("radio_circle_selected")
}

let current_effort_option = null;

function on_effort_selected(curr_effort) {
    // Populate from Database
    const curr_collection = `Donate/Impact/${curr_effort}`
    getAllDocumentsFromCollection(curr_collection);

    if (current_effort_option) {
        current_effort_option.classList.remove('button_selected');
    }
    current_effort_option = event.target;
    current_effort_option.classList.add('button_selected');

    // var parent_container = document.getElementById("parent_container")
    var impact_container = document.getElementById("impact_container")

    impact_container.classList.remove("hide_content")
}

function on_faq_expanded(faq_num) {
    var selected_faq = document.getElementById(`faq_${faq_num}`)
    var selected_btn = document.getElementById(`expand_btn_${faq_num}`)

    const items = selected_faq.classList["value"].split(" ")

    // console.log("selected_faq.classList")

    if (items.includes("faq_selected")) {
        selected_faq.classList.remove("faq_selected")
        selected_btn.innerHTML = '+'
    }
    else {
        selected_faq.classList.add("faq_selected")
        selected_btn.innerHTML = '-'
    }

    // console.log(selected_faq.classList)
}

let current_dedicate_option = null;

function on_dedicate_selected() {
    if (current_dedicate_option) {
        current_dedicate_option.classList.remove('button_selected');
    }
    current_dedicate_option = event.target;
    current_dedicate_option.classList.add('button_selected');

    // var parent_container = document.getElementById("parent_container")

    // parent_container.style.height = '600px'

    var effort_container = document.getElementById("effort_container")
    effort_container.classList.remove("hide_content")
}

window.on_faq_expanded = on_faq_expanded;
window.on_effort_selected = on_effort_selected
window.on_dedicate_selected = on_dedicate_selected
window.on_impact_selected = on_impact_selected