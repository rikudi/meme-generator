import React, { useEffect, useState } from "react";

export default function MemeBox() 
{
    /*Declaring the useState hook for memeImage*/
    const [memeImage, setMemeImage] = useState("")


    /*Declaring and using the useEffect state hook to fetch public MEME API data and save the fetched data in 'posts' state variable */
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        /*retrieving the data in JSON format then printing the data to console*/
      fetch('https://api.imgflip.com/get_memes')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })

         /*in case there's an error fetching the API data*/
         .catch((err) => {
            console.log(err.message);
         });
    }, []);

    /*This function picks a random number of the length of the meme data array (saved as 'posts') and stores it into a variable called 'randomNumber'.
    Then uses the setMemeImage state setter function to get the url key-value using the 'randomNumber' as a condition.   */
    function getMemeImage() 
    {
        const memesArray = posts.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        console.log(randomNumber)
        setMemeImage(memesArray[randomNumber].url)
    }

    /* Rendering the component elements, styled with TailwindCSS */
    return (
        <section className="w-full flex justify-center flex-col">
            <div className="flex justify-center w-full gap-4 mb-4 mt-24">
                <input className="block py-3 px-4 border-gray-500 rounded bg-gray-300" type="text"></input>
                <input className="block py-3 px-4 border-gray-500 rounded bg-gray-300" type="text"></input>
            </div>
            <div className="flex justify-center mt-14">
                <button className="p-6 bg-purple-300 w-56 rounded" onClick={getMemeImage}>Get a new Meme Image</button>
            </div>
            <div className="flex justify-center my-6">
                <img src={memeImage} className="h-96 w-auto" alt="meme" />
            </div>
        </section>
    )
}