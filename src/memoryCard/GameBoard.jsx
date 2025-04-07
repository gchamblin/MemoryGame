import { useState, useEffect } from "react";
import Burrito from '../Food/burrito.jpg'
import Chef from '../Food/chef.jpg';
import Cherries from '../Food/cherries.jpg';
import Cutlet from '../Food/chicken-cutlets-featured.webp';
import Cutlet2 from '../Food/Chicken-cutlets-for-feature-1.jpg';
import Croissant from '../Food/croissant.jpg';
import Lambchop from '../Food/lambchop.jpg';
import FrenchToast from '../Food/FrenchToast.webp';
import Salmon from '../Food/salmon.jpg';
import Sandwich from '../Food/sandwich.jpg';
import Steak from '../Food/steak.jpg';
import SearedChop from '../Food/searedChop.jpg';
import HerbCrusted from  '../Food/Herb-Crusted-Lamb-Chops-in-Butter-Sauce.jpg';
import LambCutlets from '../Food/lamb-cutlets-with-green-mash-mint-sauce-99030-1.jpg';
import Popsicle from '../Food/popsicle.jpg';
import ChickenKarahi from '../Food/Chicken-Karahi.webp';
import MargherittaPizza from '../Food/Margherita-Pizza.webp';
import Cookies from '../Food/Chocolate-Chip-Cookies.webp';
import Brazillian from '../Food/Brazillian-Caipirinha.webp';
import Shrimp from '../Food/Shrimp-Scampi-Pasta.webp';


const pictures = [Burrito, Chef, Cherries, Cutlet, Cutlet2, Croissant, Lambchop, FrenchToast, Salmon, Sandwich, Steak, SearedChop, HerbCrusted, LambCutlets, Popsicle, ChickenKarahi, MargherittaPizza, Cookies, Shrimp, Brazillian];

export default function GameBoard() {

    const [pics, setPics] = useState([...pictures]);
    const [clickPic, setClickPic] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);


    useEffect(() => {
        setPics([...shuffleArray(pictures)]);

    }, [clickPic]);

    useEffect(() => {
       if (score > JSON.parse(localStorage.getItem('highScore'))) {
            setHighScore(score);
            localStorage.setItem('highScore', JSON.stringify(highScore))
        }
    }, [score]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        } return array
    };

    const clickHandler = (e) => {
        console.log(e.target.src);
        if (!clickPic.includes(e.target.src)) {
            setClickPic([...clickPic, e.target.src]);
            setScore(score + 1)
        } else  {
            // console.log('You lose')
            setClickPic([]);
            setScore(0)
            setGameOver(true);
        }
    };


    function restart() {
        setGameOver(false)
        setScore(0)
        setClickPic([]);
    };
    
    function clearBest() {
        localStorage.clear('highScore');
        setClickPic([]);
        setScore(0);
        setHighScore(0)
    };


    const display = pics.map((pic, index) => {
        return <div key={index} className="picCard" onClick={clickHandler}>
            <img src={pic} className="images" alt='pic' />
        </div>
    });

    // console.log(display)
    return (
        <>
            <header>
                <div className="headerFlex">
                    <div className="titleDiv">
                        <h1 className="title">Memory Game</h1>
                    </div>
                    <div className="scoreDiv">
                        <h2 className="score">Score:{score} </h2>
                        <div className="highScore"><h2>High Score:{highScore}</h2></div>
                        <button className="button highScoreBtn" onClick={clearBest}>Clear High Score</button>
                    </div>
                </div>
            </header>
            <main className="container">
                <section className="cardDisplay">
                    {gameOver ? (<div className="gameOver"><h1>Game Over</h1></div>) : display}
                </section>
                <div>
                    <button className="button restartBtn" onClick={restart}>Restart</button>
                </div>
            </main>
        </>

    )
}