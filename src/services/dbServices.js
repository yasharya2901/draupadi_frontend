import { app } from "../firebase/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";


const db = getFirestore(app);

const saveData = async (data, uid) => {
    try {
        const save = await setDoc(doc(db, "users", uid), data);
        return {
            status: 'success',
            message: 'Data saved successfully',
        }
    } catch (error) {
        console.error('Error saving data:', error);
        return {
            status: 'error',
            message: 'Error saving data. Please try again.',
        }
    }

}

export default saveData;