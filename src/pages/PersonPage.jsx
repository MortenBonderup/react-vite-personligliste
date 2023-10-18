import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, onSnapshot} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function PersonPage() {
    const params = useParams();
    const brugernavn = params.brugernavn;
    const [dataFraPersonligliste, setDataFraPersonligliste] = useState([]);
    const navigerTil = useNavigate();

    useEffect(() => {
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

    function haandterKlik() {
        navigerTil(`/content/${brugernavn}`);
    }

    // Her finder jeg de madretter som personen med det pågældende brugernavn allerede har smagt.
    // OBS! Alle brugernavne skal være forskellige. Der må ikke være to brugere, som har det samme
    // brugernavn.
    const personligliste = dataFraPersonligliste.filter((madret) => madret.brugernavn === brugernavn);

    return (
      <div className="page">
       <ul style={{"display" : "flex","flexDirection" : "column" }}> 
        {personligliste.map((item) => (
          <li key={item.id} style={{ "listStyleType": "none" }}>
            {item.madret}
          </li>
        ))}
      </ul>
      <button type="button" onClick={haandterKlik}>Tilbage til liste med madretter</button>
    </div>
    );
}

