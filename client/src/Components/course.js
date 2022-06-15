import react from "react"
import Card from "./card"

const Coureses = (props) => {
   for (let couresName of props){
      return <Card name={couresName}></Card>
   }

}