import React, { useEffect } from "react";
import color from "../../color";
import Button from "../Button";
import { useState } from 'react';


const FormModalGroup = (props) => {

    const [groupes, setGroup] = useState([]);
    const [data, setData] = useState([]);

    const [fields, setState] = useState({
        nomPromotion: '',
        niveauFormation: '',
        nomGroupe: []
    });
    console.log("IS GROUP", fields);

    function handleChange (event) {
        const { target: {name, value}} = event;
        console.log("groupe select: " , event);
        if(fields.nomGroupe.includes(value)) {
          fields.nomGroupe.splice(fields.nomGroupe.indexOf(value), 1)
          setState({
            ...fields,
          });
        } else {
          fields.nomGroupe.push(value);
          setState({
            ...fields,
          });
        }
    }

    const removeToGroups = (e) => {
        e.preventDefault();
        // route pour la suppression d'un groupe
        // envoie le nom du groupe , le nom de la promo et le niveau de formation 
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
        };
        fetch('http://localhost:8000/api/planning/deleteGroup', requestOptions)
            .then(response => response.json())
            .then();
    };

  
    useEffect( () => {
        console.log("debuttttt")
        const fetchData = async () =>  {
        const data = await fetch("http://localhost:8000/api/planning/bloc/S38")
        .then(response => response.json())
        .then(data =>  data);
         console.log(' DATA IN FETCH', data[0].nom_promotion);
            setData(data);
            setGroup(data[0].jours[0].matieres[0].groupes)
            setState({
                ...fields,
                nomPromotion: data[0].nom_promotion,
                niveauFormation: data[0].niveau_formation
            })
        };
        fetchData()
        }, []
    );
  
    return (
        <form>
        <div className="form-group">
            <label className="form-group">Groupe(s) concerné(s)</label>
            <br/>
            { groupes.map(group => {
                return (
                    <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="group"
                        value={`${group.groupe_name}`}
                        checked={fields.nomGroupe.includes(group.groupe_name)}
                        onChange={e => handleChange(e)}
                    />{" "}
                    <br/>
                    <label className="form-check-label">{group.groupe_name}</label>
                    </div>
                )
            })}
        </div>
            <div>
            <Button 
                type="submit" 
                color="white"
                background={color.orange} 
                text="Supprimer"
                onClick={removeToGroups}
                radius 
            />
            </div>
        </form>
    );
};

export default FormModalGroup;
