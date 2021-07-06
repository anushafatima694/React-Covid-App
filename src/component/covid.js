import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Covid = () => {
    const [allData, setAllData] = useState([])
    const [cities, setCities] = useState([])
    const [citiesFullname, setCitiesFullName] = useState([])
    const [positiveCases, setPositiveCases] = useState(0)
    const [negativeCases, setNegativeCases] = useState(0)
    const [totalTestResult, setTotalTestResult] = useState(0)
    const [probableCases, setProbableCases] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [death, setDeath] = useState(0)
    const [currentCityName, setCurrentCityName] = useState('')

    //

    useEffect(() => {
        axios.get(`https://api.covidtracking.com/v1/states/current.json`)
            .then(res => {
                const persons = res.data;

                console.log(persons)
                setAllData(persons)
                axios.get(`https://restcountries.eu/rest/v2/all`)
                    .then(val => {
                        const city = val.data;

                        console.log(city)
                       
                        setCitiesFullName(city)

                    })

            })
    }, [])
    function showData(e){
        console.log(e.target.value)
        let val = e.target.value
        allData.map((e)=>{
            if(e.state.toLowerCase() == val.toLowerCase()){
                console.log(e)
                setPositiveCases(e.positive)
                setNegativeCases(e.negative)
                setTotalTestResult(e.totalTestResults)
                setProbableCases(e.probableCases)
                setRecovered(e.recovered)
                setDeath(e.death)
            }
        })
        citiesFullname.map((j)=>{
            if(j.alpha2Code === val){
                setCurrentCityName(j.name)
            }
        })
    }

    return (
        <>
            <div className='bg-info'>
                <div className='container p-5 text-center'>
                    <div className='py-5'>
                        <h2 className='py-3'>Covid-19 Tracker App</h2>
                        <select onChange={(e)=>showData(e)} className='inp'>
                            <option>Select Countries</option>
                            {allData.map((e, i) => {
                                return <option key={i}>{e.state}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: 'rgba(0,0,0,.2)' }} className='py-3'>
                <div className='container py-3'>
                    <p className='rounded-pill d-inline bg-dark text-white p-3 px-5 font-weight-bold'>{currentCityName}</p>
                </div>
            </div>
            <div className='container py-3'>
                <div className='row'>
                    <div className='col-md-4 py-3'>
                        <div className='rounded shadow bg-info border text-center'>
                            <div className='p-3'>
                                <h3>Positive Cases</h3>
                            </div>
                            <div className='p-3'>
                                <h4>{positiveCases?positiveCases:'--'}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 py-3'>
                        <div className='rounded shadow bg-info border text-center'>
                            <div className='p-3'>
                                <h3>Negative Cases</h3>
                            </div>
                            <div className='p-3'>
                                <h4>{negativeCases?negativeCases:'--'}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 py-3'>
                        <div className='rounded shadow bg-info border text-center'>
                            <div className='p-3'>
                                <h3>Total Test Result</h3>
                            </div>
                            <div className='p-3'>
                                <h4>{totalTestResult?totalTestResult:'--'}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 py-3'>
                        <div className='rounded shadow bg-info border text-center'>
                            <div className='p-3'>
                                <h3>Probable Case</h3>
                            </div>
                            <div className='p-3'>
                                <h4>{probableCases?probableCases:'--'}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 py-3'>
                        <div className='rounded shadow bg-info border text-center'>
                            <div className='p-3'>
                                <h3>Recovered</h3>
                            </div>
                            <div className='p-3'>
                                <h4>{recovered?recovered:'--'}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 py-3'>
                        <div className='rounded shadow bg-info border text-center'>
                            <div className='p-3'>
                                <h3>Death</h3>
                            </div>
                            <div className='p-3'>
                                <h4>{death}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Covid;
