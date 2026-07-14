
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8CVg0DMArdrinszAk3rl0RvPUOzGgZ28",
  authDomain: "crudweb-7a442.firebaseapp.com",
  projectId: "crudweb-7a442",
  storageBucket: "crudweb-7a442.firebasestorage.app",
  messagingSenderId: "142487126118",
  appId: "1:142487126118:web:2bdb8a3d100d8e6834eda7",
  measurementId: "G-488P2W21WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const notif = document.querySelector('.notify');


async function addData() {

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  const refDoc = await addDoc(collection(db, "smit"), {
    name: name,
    email: email
  });
  notif.innerHTML = `Data added ${refDoc.id}`;
  notif.classList.add("show");
  setTimeout(() => {
  notif.classList.remove("show");
}, 2000);

await getData();

}

let submit = document.querySelector('#add_data');
submit.addEventListener('click', addData);



// Read All Data from firestore

async function getData() {
  const getUser = await getDocs(collection(db, "smit"));
  let html = '';
  getUser.forEach((item) => {
    let data = item.data();

    html += `
  <tr>
    <td>${data.name}</td>
    <td>${data.email}</td>
    <td>
      <button class="delete-btn" onclick="deletedata('${item.id}')">
        Delete
      </button>
    </td>
    <td>
      <button class="edit-btn" onclick="updatedoc('${item.id}')">Update</button>
    </td>
  </tr>`;
  });
  document.querySelector('.table table').innerHTML = html
}
getData();


// Ubdate data
let currentId = null;
window.updatedoc = async function (id) {
  const update = await getDoc(doc(db,"smit", id));
  const data = update.data();
  document.querySelector('#name').value = data.name;
  document.querySelector('#email').value = data.email;
  currentId = id;
  
  // button Handling
  let updateBtn = document.getElementById('update_data');
  updateBtn.classList.remove('hide');
  submit.classList.add('hide');

  updateBtn.addEventListener('click', async function() {
    let newname = document.querySelector('#name').value
    let newemial= document.querySelector('#email').value

    if(newname !== null && newemial !== null){
      await updateDoc(doc(db,"smit", currentId),{
        name: newname,
        email: newemial
      })
    }
    notif.innerHTML = "Data Updated";
    notif.classList.add('show');
    setTimeout(() => {
      notif.classList.remove("show");
    }, 2000);
    getData();
  })
}


// Delete Data
window.deletedata = async function (id) {
  await deleteDoc(doc(db, "smit", id));
  notif.innerHTML = `Data Deleted`;
  notif.classList.add("show");
  setTimeout(() => {
    notif.classList.remove("show");
  }, 2000);
  await getData();
}
