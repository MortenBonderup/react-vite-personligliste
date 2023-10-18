import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, onSnapshot} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ContentPage() {

    const params = useParams();
    const brugernavn = params.brugernavn;
    const [data, setData] = useState([]);
    const [dataFraPersonligliste, setDataFraPersonligliste] = useState([]);
    const navigerTil = useNavigate();

    useEffect(() => {
        async function fetchData() {
          onSnapshot(collection(db, "madretter"), data => {
            const madretter = [];
            data.forEach((madret) => {
              madretter.push({ id: madret.id, ...madret.data() });
            });
            setData(madretter);
          });
        }
        fetchData();

        async function fetchDataFraPersonligliste() {
          onSnapshot(collection(db, "personligliste"), data => {  
            const madretter = [];
            data.forEach((madret) => {
              madretter.push({ id: madret.id, ...madret.data() });
            });
            setDataFraPersonligliste(madretter);
          });
        }
        fetchDataFraPersonligliste();                   
      }, []);


      async function valgAfMadret(e) {    
        const madret = e.currentTarget.getAttribute("data-id");
    
        const nyvare = {
          madret: madret,
          brugernavn: brugernavn
        }
    
        try {
          const vareRef = await addDoc(collection(db, "personligliste"), nyvare);
          console.log("Madret tilføjet til personlig liste med ID: ", vareRef.id);
        } catch (e) {
          console.error("FEJL - Kunne ikke tilføje vare: ", e);
        }
      }

    function haandterKlik() {
        navigerTil(`/person/${brugernavn}`);
    }


    const dataSkyggeliste = [];
    data.forEach((madret) => {
        const paaPersonligliste = dataFraPersonligliste.find((madretten) => madretten.madret === madret.madret && madretten.brugernavn===brugernavn);
        if (!paaPersonligliste) {
          dataSkyggeliste.push(madret);
        }
      })

    return (
      <div className="page">
       <ul style={{"display" : "flex","flexDirection" : "column" }}> 
        {dataSkyggeliste.map((item) => (
          <li key={item.id} style={{ "listStyleType": "none" }}>
            <span style={{ "marginRight": "10px" }}>{item.madret}</span>
            <button type="button" data-id={item.madret} onClick={valgAfMadret} style={{display: "inline-block", marginRight: "10px"}}>Har smagt</button>
            <button type="button" data-id={item.madret} style={{display: "inline-block"}}>Afvis</button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={haandterKlik}>Se allerede smagte madretter</button>
    </div>
    );
}
