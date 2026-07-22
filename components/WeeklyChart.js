"use client";

import { subDays, format } from "date-fns";

export default function WeeklyChart({ completedDates }) {

  const today = new Date();


  const last7Days = Array.from(
    { length: 7 },
    (_, index) =>
      subDays(today, 6 - index)
  );


  const getCount = (date) => {

    const formattedDate = format(
      date,
      "yyyy-MM-dd"
    );


    return completedDates.filter(
      (item) => item === formattedDate
    ).length;

  };


  const hasActivity = completedDates.length > 0;


  return (

    <div className="weekly-chart">


      <h2>
        📊 Weekly Activity
      </h2>



      {!hasActivity ? (

        <p className="empty-chart">
          No activity yet.
          <br />
          Start completing habits to see your progress 🚀
        </p>

      ) : (


        last7Days.map((day)=>{


          const count = getCount(day);


          return (

            <div
              className="chart-row"
              key={day.toString()}
            >


              <span>
                {format(day,"EEE")}
              </span>



              <div className="bar-container">

                <div

                  className="bar"

                  style={{
                    width:`${Math.min(count * 25,150)}px`
                  }}

                ></div>

              </div>



              <span>
                {count}
              </span>


            </div>

          );


        })


      )}


    </div>

  );

}