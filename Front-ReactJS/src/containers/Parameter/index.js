import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar';
import Button from '../../components/Button';
import StyleParam from './StyleParam';
import color from '../../color';
import DateRangeChoice from '../../components/DateRangeChoice';
import { Redirect } from "react-router-dom";
import Modal from '../../components/Modal/index';
import FormModalGroup from '../../components/Form/FormGroupModal';
import moment from 'moment';

const Parameter = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [groupName, setGroupName] = useState();
    const [numWeek, setNumWeek] = useState();
    const [isSend, setIsSend] = useState(false);

    const [fields, setState] = useState({
        nomPromotion: "",
        niveauFormation: "Classes préparatoires",
        nomGroupe: [],
        dateDebut: startDate,
        dateFin: endDate,
        semConges: [],
        debutSem: "",
        finSem: ""
    });

    const {nomPromotion, niveauFormation, nomGroupe, dateDebut, dateFin, debutSem, finSem} = fields;

    const handleFields = (event) => {
        const {
            target: { name, value },
        } = event;
        //console.log(name, " = ", value);
        if (name === "semConges") { 
            setNumWeek(value);                            
            
        } else if (name === "nomGroupe") {
            setGroupName(value);
        } else {
            //console.log('IS NOT GROUP', name);
            setState({
              ...fields,
              [name]: value
            });
        }
        console.log("semaines conges : ", fields);
    };

    const hideForm = () => {
        setShowForm(false);
      }
    
    const getDateRange = (date) => {
        setState({
            ...fields,
            dateDebut: moment(date.startDate).format("DD-MM-YY"),
            dateFin: moment(date.endDate).format("DD-MM-YY"),
            debutSem: `S${moment(date.startDate).week()}`,
            finSem: `S${moment(date.endDate).week()}`,
        });
    };

    function sendParameter(e) { 
        e.preventDefault();
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
        };
        fetch('http://localhost:8000/api/add_promo', requestOptions)
            .then(response => response.json())
            .then();
            
        setIsSend(!isSend);
    }

    function addGroup() {
        console.log("nomGroupe", fields.nomGroupe);
        if(!fields.nomGroupe.includes(groupName)){
            fields.nomGroupe.push(groupName);
            setState({
              ...fields,
            });
        }
    }

    function addSemConges() {
        if(!fields.semConges.includes(`S${numWeek}`)){
            fields.semConges.push(`S${numWeek}`);
            setState({
              ...fields,
            });
        }
    }

    function removeGroup() {
        setShowForm(!showForm);
    }

    if(isSend){
       return <Redirect to={`/agenda?name=${nomPromotion}&level=${niveauFormation}&week=${debutSem}`} />
       //return <Redirect to={`/agenda?name=${fields}`} />
    }
    return (   
        <div>
            <NavBar text="PARAMETRES"/>
            <StyleParam>
                <div className="param1">
                    <form>
                        <div className="form-group">
                            <label className="form-label" for="nomPromotion">
                                <p> Nom de la Promotion</p> 
                            </label>
                            <input
                                type="text"
                                placeholder="Nom de la Promotion"
                                className="form-control"
                                name="nomPromotion"
                                id="nomPromotion"
                                value={nomPromotion}
                                onChange={(e) => handleFields(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="NiveauFormation">
                                <p> Niveau Formation</p>
                            </label>
                            <select className="form-control"
                                name="niveauFormation"
                                value={niveauFormation}
                                onChange={(e) => handleFields(e)}
                            >
                                <option className="form-control" value="Classes préparatoires">Classes préparatoires</option>
                                <option className="form-control" value="Ingénieur">Ingénieur</option>
                                <option className="form-control" value="Spécialisé">Spécialisé</option>
                            </select>

                        </div> 
                        <div className="form-group">
                            <label className="form-label" for="dateDebutFin">
                                <p> Date de Debut et de Fin</p>
                            </label>
                            <DateRangeChoice 
                                className="form-control"
                                changeRange={date => getDateRange(date)}
                            ></DateRangeChoice>

                        </div> 
                        <div className="form-group">
                            <label className="form-label" for="nomPromotion">
                                <p> Nom groupe</p> 
                            </label>
                            <div className="formGroup">
                                <input
                                    type="text"
                                    placeholder="groupe"
                                    className="form-control"
                                    name="nomGroupe"
                                    id="nomGroupe"
                                    onChange={(e) => handleFields(e)}
                                    required
                                />
                                <div className="boutonGroup">
                                    <Button
                                        type="button"
                                        color="white"
                                        background={color.orange}
                                        text="+"
                                        onClick={() => addGroup()}
                                        radius
                                    />
                                    <Button
                                        type="button"
                                        color="white"
                                        background={color.orange}
                                        text="-"
                                        onClick={() => removeGroup()}
                                        radius
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="semConges">
                                <p> Semaines Congés </p>
                            </label>
                            <div className="formGroup">
                                <input
                                    type="number"
                                    placeholder="Semaines Congés"
                                    className="form-control"
                                    name="semConges"
                                    id="semConges"
                                    onChange={(e) => handleFields(e)}
                                    required
                                />
                                <div className="boutonGroup">
                                    <Button
                                        type="button"
                                        color="white"
                                        background={color.orange}
                                        text="+"
                                        onClick={() => addSemConges()}
                                        radius
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <Button
                                type="submit"
                                color="white"
                                background={color.orange}
                                text="Valider"
                                onClick={sendParameter}
                                radius
                            />
                        </div>
                    </form>
                </div>
            </StyleParam>
            <Modal
                isShowing={showForm}
                title="Supprimer un groupe"
                hide={hideForm}
            >
                <FormModalGroup/>
            </Modal>
        </div>
    )
}
export default Parameter;