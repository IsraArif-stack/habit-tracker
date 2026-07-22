"use client";
import WeeklyChart from "../components/WeeklyChart";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import Heatmap from "../components/Heatmap";
import DarkModeToggle from "../components/DarkModeToggle";

import { loadHabits, saveHabits } from "../utils/storage";


export default function Home() {

  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);


  // Load habits
  useEffect(() => {
    setHabits(loadHabits());
  }, []);


  // Save habits
  useEffect(() => {
    saveHabits(habits);
  }, [habits]);


  // Load Dark Mode
  useEffect(() => {

    const savedMode = localStorage.getItem("darkMode");

    if(savedMode === "true"){
      setDarkMode(true);
    }

  }, []);



  // Apply Dark Mode
  useEffect(() => {

    if(darkMode){
      document.body.classList.add("dark");
    }
    else{
      document.body.classList.remove("dark");
    }

    localStorage.setItem(
      "darkMode",
      darkMode
    );

  },[darkMode]);



  // Add Habit
  const addHabit = (name)=>{

    const trimmedName = name.trim();


    if(!trimmedName){
      toast.error("Please enter habit name");
      return;
    }


    const alreadyExists = habits.some(
      (habit)=>
        habit.name.toLowerCase() ===
        trimmedName.toLowerCase()
    );


    if(alreadyExists){

      toast.error(
        "Habit already exists!"
      );

      return;
    }


    const newHabit = {

      id: Date.now(),

      name: trimmedName,

      completedDates: []

    };


    setHabits((prev)=>[
      ...prev,
      newHabit
    ]);


    toast.success(
      "Habit added successfully 🎉"
    );

  };



  // Delete Habit
  const deleteHabit=(id)=>{

    setHabits((prev)=>
      prev.filter(
        (habit)=>habit.id !== id
      )
    );


    toast.success(
      "Habit deleted"
    );

  };



  // Complete Habit
  const completeHabit=(id)=>{


    const today = new Date()
      .toISOString()
      .split("T")[0];


    setHabits((prev)=>

      prev.map((habit)=>{


        if(habit.id !== id)
          return habit;



        if(
          habit.completedDates.includes(today)
        ){

          toast.error(
            "Already completed today!"
          );

          return habit;

        }



        toast.success(
          "Great job! Habit completed 🔥"
        );



        return {

          ...habit,

          completedDates:[
            ...habit.completedDates,
            today
          ]

        };


      })

    );


  };



  // Reset All
  const resetHabits=()=>{


    const confirmReset =
      window.confirm(
        "Delete all habits?"
      );


    if(!confirmReset)
      return;



    setHabits([]);

    localStorage.removeItem(
      "habits"
    );


    toast.success(
      "All habits removed"
    );

  };



  // Stats

  const totalHabits =
    habits.length;


  const totalCompleted =
    habits.reduce(
      (sum,habit)=>
        sum + habit.completedDates.length,
      0
    );


  const today =
    new Date()
    .toISOString()
    .split("T")[0];


  const completedToday =
    habits.filter(
      (habit)=>
      habit.completedDates.includes(today)
    ).length;



  const filteredHabits =
    habits.filter(
      (habit)=>
      habit.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
    );



  const allCompletedDates =
    habits.flatMap(
      (habit)=>
      habit.completedDates
    );



  return (

    <main className="container">


      <Toaster
        position="top-right"
        reverseOrder={false}
      />



      <header className="header">

        <h1>
          🔥 Habit Tracker
        </h1>


        <p>
          Build better habits,
          maintain your streak every day.
        </p>



        <DarkModeToggle

          darkMode={darkMode}

          setDarkMode={setDarkMode}

        />

      </header>




      <div className="dashboard">


        <div className="dashboard-card">

          <h2>
            {totalHabits}
          </h2>

          <p>
            📚 Total Habits
          </p>

        </div>



        <div className="dashboard-card">

          <h2>
            {completedToday}
          </h2>

          <p>
            ✅ Today
          </p>

        </div>




        <div className="dashboard-card">

          <h2>
            {totalCompleted}
          </h2>

          <p>
            🏆 Completed
          </p>

        </div>


      </div>




      <div className="reset-container">

        <button

          className="reset-btn"

          onClick={resetHabits}

        >

          🗑 Reset All Habits

        </button>


      </div>




      <section className="app-box">


        <HabitForm
          addHabit={addHabit}
        />



        <div className="search-box">


          <input

            type="text"

            placeholder="🔍 Search Habit..."

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }

          />


        </div>




        <HabitList

          habits={filteredHabits}

          deleteHabit={deleteHabit}

          completeHabit={completeHabit}

        />



      </section>


<section className="heatmap-section">

  <WeeklyChart
    completedDates={allCompletedDates}
  />

</section>





      <section className="heatmap-section">


        <h2>
          📅 Overall Activity Heatmap
        </h2>



        <Heatmap

          completedDates={
            allCompletedDates
          }

        />


      </section>



    </main>

  );

}