import { useEffect } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/workoutForm'

const Home=()=>{
    const {workouts,dispatch}=useWorkoutContext();
    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response=await fetch('/api/workouts')
            const json=await response.json()

            if(response.ok){
                console.log("boom");
                dispatch({type:'SET_WORKOUTS', payload:json});
                // setWorkouts(json)
            }else{
                
            }
        }
        fetchWorkouts()
    },[dispatch])//using '[]' as second arg make it fire only once
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