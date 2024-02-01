import { db, auth } from '../db';
import { GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import { store } from '../store';
import { collection, where, getDocs, query, updateDoc } from 'firebase/firestore';
import { setParticipantDetails, setLogoutParticipant } from '../slices/ParticipantSlice';
export const handleSignIn = async (dispatch, messageApi, navigate) => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.clear()
        const { email } = result.user;
        const existTeam = await getDocs(query(collection(db, "teams"), where("email", "==", email)))
        if (existTeam.docs.length > 0) {
            dispatch(setParticipantDetails({ teamData: existTeam.docs[0].data() }))
            messageApi.open({
                type: 'success',
                content: "Login Successfully"
            })
            navigate('/dashboard')
        }
        else {
            messageApi.open({
                type: 'error',
                content: "No team found with your email"
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}
export const getParticipantDetails = async (dispatch, email, navigate) => {
    try {
        const existTeam = await getDocs(query(collection(db, "teams"), where("email", "==", email)))
        if (existTeam.docs.length > 0) {
            dispatch(setParticipantDetails({ teamData: existTeam.docs[0].data() }))
            navigate('/dashboard')
        }
    }
    catch (err) {
        console.log(err);
    }
}

export const updateTeamMembers = async (dispatch, data, messageApi, navigate) => {
    try {
        const { email, lotNo } = store.getState()?.participant.data.teamData;
        const docRef = await getDocs(query(collection(db, "teams"), where("email", "==", email), where("lotNo", "==", lotNo)))
        const res = await updateDoc(docRef.docs[0].ref, { teamMembers: data })
        messageApi.open({
            type: "success",
            content: "Team members changes saved"
        })
        getParticipantDetails(dispatch, email, navigate)

    } catch (err) {
        console.log(err)
    }
}

export const updateEventMembers = async (dispatch, data, messageApi, navigate) => {
    try {
        const { email, lotNo } = store.getState()?.participant.data.teamData;
        const docRef = await getDocs(query(collection(db, "teams"), where("email", "==", email), where("lotNo", "==", lotNo)))
        const res = await updateDoc(docRef.docs[0].ref, { eventParticipants: data })
        messageApi.open({
            type: "success",
            content: "Event Participants updated"
        })
        getParticipantDetails(dispatch, email, navigate)

    } catch (err) {
        console.log(err)
    }
}

export const logoutParticipant = async (dispatch, navigate, messageApi) => {
    signOut(auth).then(() => {
        dispatch(setLogoutParticipant())
        messageApi.open({
            type:"success",
            content:"Logout Successfully"
        })
        navigate('/register')
    }).catch((error) => {
        console.log(error);
    });
}