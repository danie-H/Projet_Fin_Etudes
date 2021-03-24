import React from "react";
import color from "../../color";
import Button from "../Button";
import { useState } from 'react';
import StyledNavbar from "../Navbar/StyleNavbar";
import StyleForm from "./StyleForm";


const FormModal = (props) => {

  const groupes = props.groups;

  const { item, data } = props;

  //console.log(' GROUPS ', groupes);


  console.log('data', data);


  const [fields, setState] = useState({
    nom: item.subject,
    type: item.type,
    prof: item.teacher,
    jour: item.day,
    heure: item.hour,
    semaine: item.week,
    groups: [item.name]
  });

  const {nom, type, prof, jour, heure, group, groups} = fields;
  //console.log('fields', fields);


  function handleChange (event) {
    const { target: {name, value}} = event;

    if (name === "group") {
      console.log("IS GROUP", name);
      if(fields.groups.includes(value)) {
        fields.groups.splice(fields.groups.indexOf(value), 1)
        setState({
          ...fields,
        });
      } else {
        fields.groups.push(value);
        setState({
          ...fields,
        });
      }
    } else {
      //console.log('IS NOT GROUP', name);
      setState({
        ...fields,
        [name]: value
      });
    }
  }

  const addToCalendar = (e) => {
    e.preventDefault();
    // route pour l'ajout d'un créneau
      // console.log("fields= ", fields);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      };
      fetch('http://localhost:8000/api/planning/'+data[0].nom_promotion+'_'+data[0].niveau_formation+'/ajouterCours', requestOptions)
          .then(response => response.json())
          .then();
  };

  const removeToCalendar = (e) => {
    e.preventDefault();
    // route pour la suppression d'un créneau
      console.log("fields= ", fields);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      };
      fetch('http://localhost:8000/api/planning/'+data[0].nom_promotion+'_'+data[0].niveau_formation+'/supprimerCours', requestOptions)
          .then(response => response.json())
          .then();
  };

  //console.log("**** FIELD ****", fields);
  return (
    <StyleForm>
    <form>
      <div className="form-group">
        <label className="form-group" for="matiere">
          Séance
        </label>
        <input
          type="text"
          placeholder="Nom de la séance"
          className="form-control"
          name="nom"
          id="matiere"
          value={nom}
          onChange={e => handleChange(e)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-group" for="type">
          Type
        </label>
          <input
            className="form-control"
            placeholder="Type de séance"
            type="text"
            name="type"
            value={type}
            id="type"
            onChange={e => handleChange(e)}
          />
      </div>

      <div className="form-group">
        <label className="form-group" for="prof">Enseignant</label>
          <input
            className="form-control"
            type="text"
            name="prof"
            placeholder="Nom de l'enseignant"
            id="prof"
            value={prof}
            onChange={e => handleChange(e)}
          />
      </div>

      <div className="form-group">
        <label className="form-group">Groupe(s) concerné(s)</label>
          <br/>
          { groupes.map(group => {
              return(
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="group"
                    value={`${group.groupe_name}`}
                    checked={fields.groups.includes(group.groupe_name)}
                    onChange={e => handleChange(e)}
                  />{" "}
                  <br/>
                  <label className="form-check-label">{group.groupe_name}</label>
                </div>
              );
            })
          }
      </div>

      <div className="modal-boutons">
        <div>
          <Button 
            type="submit" 
            color="white"
            width="80px"
            background={color.orange} 
            text="Valider"
            onClick={addToCalendar}
            radius 
          />
        </div>
        <div>
          <Button 
            type="submit" 
            color="white"
            width="80px"
            background={color.orange} 
            text="Supprimer"
            onClick={removeToCalendar}
            radius 
          />
        </div>
      </div>
    </form>
    </StyleForm>
  );
};

export default FormModal;
