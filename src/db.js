import { collection } from "@firebase/firestore";
import { db } from "./firebase";
console.log(db);

//real-time listener
db.collection("bookings").onSnapshot((snapshot) => {
    console.log(snapshot.docChanges());
})
