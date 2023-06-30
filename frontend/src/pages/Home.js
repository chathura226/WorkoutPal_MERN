import { useEffect } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/workoutForm'
import {useAuthContext} from '../hooks/useAuthContext'
const Home=()=>{
    const {workouts,dispatch}=useWorkoutContext();
    const {user}=useAuthContext();
    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response=await fetch('/api/workouts',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json=await response.json()

            if(response.ok){
                console.log("boom");
                dispatch({type:'SET_WORKOUTS', payload:json});
                // setWorkouts(json)
            }else{
                
            }
        }
        if(user){
            fetchWorkouts()
        }
    },[dispatch,user])//using '[]' as second arg make it fire only once
    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
        
        
    )
}

export default Home