import calendarIcon from '@images/dashboard/account/calendarIcon.svg'
import datePointer from '@images/dashboard/account/datePointer.svg'
import axios from 'axios'
import { useState } from 'react'
import { getMonthNameFromNumber, getMonthNumber } from '../../../utils'
import { datalist, div, param } from 'motion/react-client'

export default function Account({ lifetimeAuth, lifetimeMeditationTime,
  lifetimeExercise, lifetimeLevel,
  lifetimeMusicTime }) {
  const [auth, setAuth] = useState(lifetimeAuth)
  const [meditationTime, setMeditationTime] = useState(lifetimeMeditationTime)
  const [exercise, setExercise] = useState(lifetimeExercise)
  const [level, setLevel] = useState(lifetimeLevel)
  const [musicTime, setMusicTime] = useState(lifetimeMusicTime)
  const [category, setCategory] = useState('lifetime')
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState('January')
  const [currentDay, setCurrentDay] = useState(12)
  const [clickedDropdown, setClickedDropDown] = useState(null)
  const [yearList, setYearList] = useState([])
  const [monthList, setMonthList] = useState([])
  const [dayList, setDayList] = useState([])

  const dateList = {
    yearList,
    monthList,
    dayList
  }

  const setDateList = {
    setYearList,
    setMonthList,
    setDayList
  }

  const lifetimeData = {
    lifetimeAuth,
    lifetimeMeditationTime,
    lifetimeExercise,
    lifetimeLevel,
    lifetimeMusicTime
  }
  const setterDataObj = {
    setAuth,
    setMeditationTime,
    setExercise,
    setLevel,
    setMusicTime
  }

  const currentDate = {
    currentYear,
    currentMonth,
    currentDay
  }

  const setterCurrentDate = {
    setCurrentYear,
    setCurrentMonth,
    setCurrentDay
  }

  return (
    <div className="w-[1080px] flex flex-col pl-[60px] pt-[60px]">
      <h2 className="font-Poppins-Medium text-[32px] text-[#2E5077] leading-none mb-[30px]">Account Details</h2>
      <AccountNameAndEmail auth={auth} />
      <div className="flex flex-col w-[840px] h-[577px] bg-[#D9D9D9] rounded-[20px] p-[20px]">
        <div className="flex justify-between mb-[30px] z-20">
          <ToggleButtonSection category={category} setCategory={setCategory}
            setterDataObj={setterDataObj} setClickedDropDown={setClickedDropDown}
            setDateList={setDateList}
            setterCurrentDate={setterCurrentDate} lifetimeData={lifetimeData} />
          <DateButtonSection currentDate={currentDate} category={category}
            clickedDropdown={clickedDropdown} setClickedDropDown={setClickedDropDown}
            dateList={dateList} setDateList={setDateList} setterDataObj={setterDataObj}
            setterCurrentDate={setterCurrentDate} />
        </div>
        <AccumulatedCard exercise={exercise}
          meditationTime={meditationTime} musicTime={musicTime} />
        <div className="flex gap-[30px]  ">
          <BreathingExerciseCountCard exercise={exercise} />
          <LevelUpCard level={level} />
        </div>
      </div>

    </div>
  )
}

function AccountNameAndEmail({ auth }) {
  return (
    <div className="flex pl-[20px] flex-col gap-[22px] mb-[40px]">
      <div className="flex gap-[30px] items-center">
        <p className="font-Poppins-Medium text-[24px] text-[#727272] leading-none">Name:</p>
        <p className="font-Poppins-SemiBold text-[32px] text-[#272628] leading-none">{auth.username}</p>
      </div>
      <div className="flex gap-[37px] items-center">
        <p className="font-Poppins-Medium text-[24px] text-[#727272] leading-none">Email:</p>
        <p className="font-Poppins-Medium text-[32px] text-[#272628] leading-none">{auth.email}</p>
      </div>
    </div>

  )
}

function AccumulatedCard({ exercise, meditationTime, musicTime }) {
  function getTotalCount(count) {
    return (count.beginner + count.intermediate + count.advance)
  }
  return (
    <>
      <div className="w-[800px] h-[186px] bg-white p-[20px] flex flex-col gap-[50px] rounded-[10px]
       drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-[30px]">
        <h3 className=" text-[#272628] font-Poppins-Medium text-[20px]">Accumulated Data</h3>
        <div className="flex justify-between pr-[30px]">
          <div className="flex flex-col gap-[15px]">
            <p className="font-Poppins-SemiBold text-[32px] text-[#272628] leading-none">{getTotalCount(exercise.count)}</p>
            <p className="font-Poppins-Regular text-[20px] text-[#979CA6] leading-none">Exercises</p>
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="font-Poppins-SemiBold text-[32px] text-[#272628] leading-none">{meditationTime}</p>
            <p className="font-Poppins-Regular text-[20px] text-[#979CA6] leading-none">Meditation Time</p>
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="font-Poppins-SemiBold text-[32px] text-[#272628] leading-none">{musicTime}</p>
            <p className="font-Poppins-Regular text-[20px] text-[#979CA6] leading-none">Music Time</p>
          </div>
        </div>
      </div>
    </>
  )
}

function BreathingExerciseCountCard({ exercise }) {
  const { beginner, intermediate, advance } = exercise.count
  return (
    <div className="w-[350px] h-[240px] flex flex-col bg-white rounded-[10px]
         drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="h-[60px] border-b-[1px] border-[#979CA6] p-[20px] pt-[21px]
          text-[#272628] text-[20px] leading-none font-Poppins-Medium">
        Breathing Exercises Count
      </div>
      <div className="h-full px-[50px] pt-[30px] flex flex-col text-[20px] font-Poppins-Regular text-[#272628] gap-[30px]">
        <div className="flex justify-between">
          <div className="leading-none">Beginner</div>
          <div className="leading-none">{beginner}</div>
        </div>
        <div className="flex justify-between">
          <div className="leading-none">Intermediate</div>
          <div className="leading-none">{intermediate}</div>
        </div>
        <div className="flex justify-between">
          <div className="leading-none">Advance</div>
          <div className="leading-none">{advance}</div>
        </div>
      </div>
    </div>

  )
}

function LevelUpCard({ level }) {
  const { title, exp, expNeeded } = level
  return (
    <div className="w-[420px] h-[240px] flex flex-col bg-white rounded-[10px]
         drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="h-[60px] border-b-[1px] border-[#979CA6] p-[20px] pt-[21px]
          text-[#272628] text-[20px] leading-none font-Poppins-Medium">
        Meditation Title
      </div>
      <div className="flex flex-col px-[50px] pt-[30px] gap-[25px] text-[#272628]">
        <h2 className="text-[30px] font-Poppins-SemiBold leading-none">{title}</h2>
        <div className="flex flex-col gap-[13px]">
          <div className="flex justify-between font-Poppins-Regular text-[20px]">
            <p className="leading-none">Experience Pts:</p>
            <p className="leading-none">{exp}exp</p>
          </div>
          <div className="flex justify-between font-Poppins-Regular text-[#979CA6]">
            <p className="text-[16px] max-w-[150px] leading-none">Experience points needed to ascend:</p>
            <p className="text-[20px]">{expNeeded}exp</p>
          </div>
        </div>
      </div>
    </div>

  )
}

function ToggleButtonSection({ category, setCategory, setterCurrentDate, lifetimeData,
  setterDataObj, setClickedDropDown, setDateList
}) {
  const {
    setYearList,
    setMonthList,
    setDayList
  } = setDateList
  const {
    lifetimeAuth,
    lifetimeMeditationTime,
    lifetimeExercise,
    lifetimeLevel,
    lifetimeMusicTime
  } = lifetimeData;
  const {
    setCurrentYear,
    setCurrentMonth,
    setCurrentDay
  } = setterCurrentDate
  const {
    setAuth,
    setMeditationTime,
    setExercise,
    setLevel,
    setMusicTime
  } = setterDataObj
  async function getLatestDateActivity() {
    const response = await axios.get('/account/latestDate');
    const { data } = response
    const cardDataResponse = await axios.get('/account/getDataByDate', {
      params: {
        year: data.year,
        month: data.month,
        day: data.day
      }
    })
    const cardData = cardDataResponse.data
    await setLatestAvailableYearMonthDay(setCurrentYear, setCurrentMonth, setCurrentDay)
    setMeditationTime(cardData.meditationTime)
    setMusicTime(cardData.musicTime)
    setExercise(cardData.exercise)
    setLevel(cardData.level)
    setCategory('date')
  }

  function handleLifetimeClick() {
    setAuth(lifetimeAuth)
    setMeditationTime(lifetimeMeditationTime)
    setExercise(lifetimeExercise)
    setLevel(lifetimeLevel)
    setMusicTime(lifetimeMusicTime)
    setClickedDropDown(null)
  }

  async function setLatestAvailableYearMonthDay(
    setCurrentYear, setCurrentMonth, setCurrentDay) {
    const getAvailableYearsResponse = await axios.get('/account/getAvailableYears')
    const getAvailableYears = getAvailableYearsResponse.data
    const getAvailableMonthsResponse = await axios.get('/account/getMonthsByYear', {
      params: {
        year: getAvailableYears[getAvailableYears.length - 1]
      }
    })
    const getAvailableMonths = getAvailableMonthsResponse.data
    const getAvailableDaysByMonthAndYearResponse =
      await axios.get('/account/getDaysByMonthAndYear', {
        params: {
          year: getAvailableYears[getAvailableYears.length - 1],
          month: getAvailableMonths[getAvailableMonths.length - 1]
        }
      })
    const getAvailableDaysByMonthAndYear =
      getAvailableDaysByMonthAndYearResponse.data
    const latestYear = getAvailableYears[getAvailableYears.length - 1]
    const latestMonth =
      getAvailableMonths[getAvailableMonths.length - 1]
    const parsedMonthName = getMonthNameFromNumber(latestMonth)
    const latestDay =
      getAvailableDaysByMonthAndYear[getAvailableDaysByMonthAndYear.length - 1]
    setCurrentYear(latestYear)
    setCurrentMonth(parsedMonthName)
    setCurrentDay(latestDay)
    const monthsNameList = getAvailableMonths.map((number) => getMonthNameFromNumber(number))
    console.log(monthsNameList)
    setYearList(getAvailableYears)
    setMonthList(monthsNameList)
    setDayList(getAvailableDaysByMonthAndYear)
  }

  return (
    <>
      <div className="w-[300px] h-[60px] bg-white rounded-[10px]
            px-[12px] py-[10px] flex gap-[8px]
            drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <button
          onClick={() => {
            handleLifetimeClick()
            setCategory('lifetime')
          }}
          className={`${category === 'lifetime' ? 'bg-[#2E5077] text-[#F6F4F0]' :
            'hover:bg-[#F0F0F0] text-[#979CA6]'} flex rounded-[8px]
            font-Poppins-SemiBold text-[20px] leading-none
             justify-center items-center w-[134px] h-[40px]`}>
          Lifetime</button>
        <button
          onClick={() => {
            getLatestDateActivity()
          }}
          className={`${category === 'date' ? 'bg-[#2E5077] text-[#F6F4F0]' :
            'hover:bg-[#F0F0F0] text-[#979CA6]'
            }
        w-[134px] h-[40 px] flex justify-center items-center
            rounded-[8px] leading-none
             font-Poppins-SemiBold text-[20px]`}>
          Date
        </button>
      </div>
    </>
  )
}

function DateButtonSection({ category, currentDate, clickedDropdown, setClickedDropDown,
  dateList, setDateList, setterCurrentDate, setterDataObj
}) {
  const {
    yearList,
    monthList,
    dayList
  } = dateList
  const {
    setYearList,
    setMonthList,
    setDayList
  } = setDateList
  const {
    currentYear,
    currentMonth,
    currentDay
  } = currentDate

  const {
    setCurrentYear,
    setCurrentMonth,
    setCurrentDay
  } = setterCurrentDate

  const {
    setMeditationTime,
    setExercise,
    setLevel,
    setMusicTime
  } = setterDataObj

  const handleYearListClick = async (year) => {
    const getAvailableYearsResponse = await axios.get('/account/getAvailableYears')
    const availableYears = getAvailableYearsResponse.data
    const getAvailableMonths = await axios.get('account/getMonthsByYear', {
      params: {
        year: year
      }
    })
    const monthsData = getAvailableMonths.data
    const latestMonth = monthsData[monthsData.length - 1]
    const latestMonthName = getMonthNameFromNumber(latestMonth)
    const getAvaibleDay = await axios.get('/account/getDaysByMonthAndYear', {
      params: {
        year: year,
        month: latestMonth
      }
    })
    const dayData = getAvaibleDay.data
    const latestDay = dayData[dayData.length - 1]
    const cardDataResponse = await axios.get('/account/getDataByDate', {
      params: {
        year: year,
        month: latestMonthName,
        day: latestDay
      }
    })
    const cardData = cardDataResponse.data
    setMeditationTime(cardData.meditationTime)
    setMusicTime(cardData.musicTime)
    setExercise(cardData.exercise)
    setLevel(cardData.level)
    setCurrentYear(year)
    setCurrentMonth(getMonthNameFromNumber(monthsData[monthsData.length - 1]))
    setCurrentDay(dayData[dayData.length - 1])
    const monthsNameList = monthsData.map((number) => getMonthNameFromNumber(number))
    setYearList(availableYears)
    setMonthList(monthsNameList)
    setDayList(dayData)
    setClickedDropDown(null)
  }


  const handleMonthClick = async (month) => {
    const getAvailableYearsResponse = await axios.get('/account/getAvailableYears')
    const availableYears = getAvailableYearsResponse.data
    const getAvailableMonths = await axios.get('account/getMonthsByYear', {
      params: {
        year: currentYear
      } 
    })
    const monthsData = getAvailableMonths.data
    const monthNumber = getMonthNumber(month)
    const getAvaibleDay = await axios.get('/account/getDaysByMonthAndYear', {
      params: {
        year: currentYear,
        month: monthNumber,
      }
    })

    const dayData = getAvaibleDay.data
    const latestDay = dayData[dayData.length - 1]
    const cardDataResponse = await axios.get('/account/getDataByDate', {
      params: {
        year: currentYear,
        month: month,
        day: latestDay
      }
    })
    const cardData = cardDataResponse.data
    setMeditationTime(cardData.meditationTime)
    setMusicTime(cardData.musicTime)
    setExercise(cardData.exercise)
    setLevel(cardData.level)
    setCurrentYear(currentYear)
    setCurrentMonth(month)
    setCurrentDay(dayData[dayData.length - 1])
    const monthsNameList = monthsData.map((number) => getMonthNameFromNumber(number))
    setYearList(availableYears)
    setMonthList(monthsNameList)
    setDayList(dayData)
    setClickedDropDown(null)
  }
  
  const handleDayClick = async (day) => {
    const getAvailableYearsResponse = await axios.get('/account/getAvailableYears')
    const availableYears = getAvailableYearsResponse.data
    const getAvailableMonths = await axios.get('account/getMonthsByYear', {
      params: {
        year: currentYear
      } 
    })
    const monthsData = getAvailableMonths.data
    const latestMonth = monthsData[monthsData.length - 1]
    const monthNumber = getMonthNumber(currentMonth)
    const getAvaibleDay = await axios.get('/account/getDaysByMonthAndYear', {
      params: {
        year: currentYear,
        month: monthNumber,
      }
    })

    const dayData = getAvaibleDay.data
    const cardDataResponse = await axios.get('/account/getDataByDate', {
      params: {
        year: currentYear,
        month: currentMonth,
        day: day,
      }
    })
    const cardData = cardDataResponse.data
    setMeditationTime(cardData.meditationTime)
    setMusicTime(cardData.musicTime)
    setExercise(cardData.exercise)
    setLevel(cardData.level)
    setCurrentYear(currentYear)
    setCurrentMonth(currentMonth)
    setCurrentDay(day)
    const monthsNameList = monthsData.map((number) => getMonthNameFromNumber(number))
    setYearList(availableYears)
    setMonthList(monthsNameList)
    setDayList(dayData)
    setClickedDropDown(null)
  }

  return (

    <div className={`w-[470px] h-[60px] bg-white rounded-[14px] flex gap-[5px]
          text-[#272628] ${category === 'date' ? 'visible' : 'invisible'}
          pl-[12px] py-[10px] font-Poppins-SemiBold text-[20px] items-center
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}>
      <div className='relative'>
        <button
          onClick={() => {
            if (clickedDropdown === 'year') {
              setClickedDropDown(null)
            } else {
              setClickedDropDown('year')
            }
          }}
          className={`w-[100px] h-[40px] ${clickedDropdown === 'year' ? 'bg-[#2E5077] text-[#F6F4F0]'
            : 'text-[#979CA6] hover:bg-[#F6F4F0] hover:text-[#272628]'} flex  rounded-[8px]
            justify-center items-center  relative`}>
          {currentYear}

        </button>
        <img className={`absolute top-[40px]
        ${clickedDropdown === 'year' ? 'visible' : 'invisible'}
      left-1/2 -translate-x-1/2 -z-10 w-[30px] h-[30px]`} src={datePointer} alt="" />
        <div className={`w-full max-h-[210px] overflow-auto absolute top-[63px]
        rounded-[3px] accountDateList flex flex-col items-center 
        ${clickedDropdown === 'year' ? 'visible' : 'invisible'}
        bg-[#2E5077]`}>
          {yearList.map((year) => {
            return (
              <div onClick={() => {
                handleYearListClick(year)
              }}
                key={year + "year"}
                className='leading-none w-full text-center text-[#F6F4F0] pl-[10px] mb-[5px]
           cursor-pointer text-[20px] h-[43px] hover:underline pt-[15px]'>{year}</div>

            )
          })}

        </div>
      </div>
      <div className='w-[1px] h-[50px] bg-[#CCCCCC] rounded-full'></div>
      <div className='relative'>
        <button
          onClick={() => {
            if (clickedDropdown === 'month') {
              setClickedDropDown(null)
            } else {
              setClickedDropDown('month')
            }
          }}
          className={`w-[180px] h-[40px] ${clickedDropdown === 'month' ? 'bg-[#2E5077] text-[#F6F4F0]'
            : 'text-[#979CA6] hover:bg-[#F6F4F0] hover:text-[#272628]'} flex  rounded-[8px]
            justify-center items-center  relative`}>
          {currentMonth}


        </button>
        <img className={`absolute top-[40px]
        ${clickedDropdown === 'month' ? 'visible' : 'invisible'}
      left-1/2 -translate-x-1/2 -z-10 w-[30px] h-[30px]`} src={datePointer} alt="" />
        <div className={`w-full max-h-[210px] overflow-auto absolute top-[63px]
        rounded-[3px] accountDateList flex flex-col items-center 
        ${clickedDropdown === 'month' ? 'visible' : 'invisible'}
        bg-[#2E5077]`}>
          {monthList.map((month, index) => {
            return (
              index !== monthList.length - 1 ? (
                <div
                  onClick={() => {
                    handleMonthClick(month)
                  }}
                  key={month + "month"} className='leading-none
                w-full text-center text-[#F6F4F0] pl-[10px]
                  cursor-pointer text-[20px] h-[43px] hover:underline pt-[15px]'>{month}</div>

              ) : (
                <div
                  onClick={() => {
                    handleMonthClick(month)
                  }}
                  key={month + "month"} className='leading-none
                w-full text-center text-[#F6F4F0] pl-[10px]
              cursor-pointer  text-[20px] h-[43px] hover:underline mb-[5px] pt-[15px]'>{month}</div>

              )

            )
          })}
        </div>
      </div>
      <div className='w-[1px] h-[50px]  bg-[#CCCCCC] rounded-full'></div>
      <div className='relative'>
        <button
          onClick={() => {
            if (clickedDropdown === 'day') {
              setClickedDropDown('null')
            } else {
              setClickedDropDown('day')
            }
          }}
          className={`w-[100px] h-[40px] ${clickedDropdown === 'day' ? 'bg-[#2E5077] text-[#F6F4F0]'
            : 'text-[#979CA6] hover:bg-[#F6F4F0] hover:text-[#272628]'} flex  rounded-[8px]
            justify-center items-center  relative`}>{currentDay}



        </button>
        <img className={`absolute top-[40px]
        ${clickedDropdown === 'day' ? 'visible' : 'invisible'}
      left-1/2 -translate-x-1/2 -z-10 w-[30px] h-[30px]`} src={datePointer} alt="" />
        <div className={`w-full max-h-[210px] overflow-auto absolute top-[63px]
        rounded-[3px] accountDateList flex flex-col items-center 
        ${clickedDropdown === 'day' ? 'visible' : 'invisible'}
        bg-[#2E5077]`}>
          {dayList.map((day, index) => {
            return (
              index !== dayList.length - 1 ? (

                <div
                onClick={()=>{
                  handleDayClick(day)
                }} 
                key={day + "day"}
                  className='leading-none text-[#F6F4F0] pl-[10px] w-full text-center
                 cursor-pointer text-[20px] h-[43px] hover:underline pt-[15px]'>{day}</div>
              ) : (
                <div key={day + "day"}
                onClick={()=>{
                  handleDayClick(day)
                }}
                  className='leading-none text-[#F6F4F0] mb-[10px] pl-[10px] 
                w-full text-center
                 cursor-pointer text-[20px] h-[43px] hover:underline pt-[15px]'>{day}</div >
              )

            )
          })}

        </div>

      </div>
      <img className='w-[30px] ml-[5px] h-[30px]' src={calendarIcon} alt="" />
    </div>
  )
}