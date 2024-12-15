import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"
// import Headline from "./components/Headline"

export const MyContext=createContext()

export const ContextPorovider=({ children })=>{

    const [search, setSearch]=useState('')
    const colour=["#f56042","#3e82f7","#3e57f7","#f7973e"]
    const [error, setError]=useState(false)
    const [headlines, setHeadline]=useState(null)
    const [general,setGeneral]=useState(null)
    const [business,setBuisness]=useState(null)
    const [sports, setSports]=useState(null)
    const [entertainment, setEntertainment]=useState(null)
    const [health, setHealth]=useState(null)
    const [science, setScience]=useState(null)
    const [technology, setTechnology]=useState(null)

    const fetchAll=()=>{
        const headlines=import.meta.env.VITE_HEADLINES+import.meta.env.VITE_APIKEY
        const generalAPI=import.meta.env.VITE_LINK_BUISNESS+"general&apiKey="+import.meta.env.VITE_APIKEY
        const businessAPI=import.meta.env.VITE_LINK_BUISNESS+"business&apiKey="+import.meta.env.VITE_APIKEY
        const sportsAPI=import.meta.env.VITE_LINK_BUISNESS+"sports&apiKey="+import.meta.env.VITE_APIKEY
        const entertainmentAPI=import.meta.env.VITE_LINK_BUISNESS+"entertainment&apiKey="+import.meta.env.VITE_APIKEY
        const healthAPI=import.meta.env.VITE_LINK_BUISNESS+"health&apiKey="+import.meta.env.VITE_APIKEY
        const scienceAPI=import.meta.env.VITE_LINK_BUISNESS+"science&apiKey="+import.meta.env.VITE_APIKEY
        const technologyAPI=import.meta.env.VITE_LINK_BUISNESS+"technology&apiKey="+import.meta.env.VITE_APIKEY

        const zero=axios.get(headlines)
        const one=axios.get(generalAPI)
        const two=axios.get(businessAPI)
        const three=axios.get(sportsAPI)
        const four=axios.get(entertainmentAPI)
        const five=axios.get(healthAPI)
        const six=axios.get(scienceAPI)
        const seven=axios.get(technologyAPI)
        
        
        axios.all([zero, one, two, three, four, five, six, seven]).then(
            axios.spread((...data)=>{
                const zero =data[0].data.articles
                const one=data[1].data.articles
                const two=data[2].data.articles
                const three=data[3].data.articles
                const four=data[4].data.articles
                const five=data[5].data.articles
                const six=data[6].data.articles
                const seven=data[7].data.articles
                
                setHeadline(zero)
                setGeneral([ "General", one])
                setBuisness([ "Buisness", two])
                setSports([ "Sports", three])
                setEntertainment([ "Entertainment", four])
                setHealth([ "Health", five])
                setScience([ "Science", six])
                setTechnology([ "Technology", seven])
            })
        ).catch(err=>{
            console.log("Error occured= "+err)
            setError(true)
        })

    }

    // const fetchAll = async () => {
    //     const apiEndpoints = [
    //       'headlines',
    //       'general',
    //       'business',
    //       'sports',
    //       'entertainment',
    //       'health',
    //       'science',
    //       'technology'
    //     ];
      
    //     const fetchApiData = (category) => {
    //       return axios.get(`${import.meta.env.VITE_BACKEND_FETCHAPI_URL}${category}`);
    //     };
      
    //     try {
    //       const responses = await Promise.all(apiEndpoints.map(fetchApiData));
    //       const data = responses.map(response => response.data.articles);
            
    //       const [
    //         headlineData,
    //         generalData,
    //         businessData,
    //         sportsData,
    //         entertainmentData,
    //         healthData,
    //         scienceData,
    //         technologyData
    //       ] = data;
          
    //       setHeadline(headlineData);
    //       setGeneral(["General", generalData]);
    //       setBuisness(["Business", businessData]);
    //       setSports(["Sports", sportsData]);
    //       setEntertainment(["Entertainment", entertainmentData]);
    //       setHealth(["Health", healthData]);
    //       setScience(["Science", scienceData]);
    //       setTechnology(["Technology", technologyData]);
      
    //     } catch (error) {
    //       console.error("Error occurred: ", error);
    //     }
    // };


    useEffect(()=>{
        fetchAll()
        // setHeadline(Headline.articles)
    },[])

    return(
        <MyContext.Provider value={{ headlines, search, setSearch, colour, general, business, sports, entertainment, health, science, technology, error }}>
            { children }
        </MyContext.Provider>
    )

}