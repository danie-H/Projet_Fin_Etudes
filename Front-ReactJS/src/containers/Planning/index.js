import moment from 'moment';
import React from 'react'
import AgendaStyle from './AgendaStyle';
import NavBar from '../../components/Navbar/index';
import Modal from '../../components/Modal/index';
import FormModal from '../../components/Form/FormModal';
import Button from '../../components/Button';
import color from '../../color';
import { useState, useEffect } from 'react';
import Parameter from '../Parameter/index'; 
import Draggable from 'react-draggable';
import {
  useLocation
} from "react-router-dom";
const Agenda = (props) => {
  const aujourdhui = moment();

  console.log("parameter ::");

  const [modif, setModif] = useState(true);
  const [nameWeek, setNameWeek] = useState(`S${aujourdhui.week()}`);

  const params = new URLSearchParams(useLocation().search);
  const [nameFilter, setNameFilter] = useState(params.get('name'));
  const [levelFilter, setLevelFilter] = useState(params.get('level'));
  const [weekFilter, setWeekFilter] = useState(params.get('week'));

  console.log(' NAME FILTER ', levelFilter);
  console.log(' WEEK FILTER ', weekFilter);

  const timeline = [
    {id: "m1", value: "8h30-10h00"},
    {id:"m2", value: "10h30-12h00"},
    {id: "m3", value: "13h30-15h00"},
    { id: "m4", value: "15h15-16h45"},
    {id: "m5", value: "17h00-18h30"}
  ]
  const days = [
    {id:1, value:"Lundi"},
    {id: 2, value: "Mardi"},
    {id: 3, value: "Mercredi"},
    {id:4, value: "Jeudi"},
    {id: 5, value: "Vendredi"}
  ];
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState([]);

  const widthWeek = groups.length;

  const [showForm, setShowForm] = useState(false);

  const [item, setItem] = useState({
    subject:'',
    type:'',
    teacher: '',
    id: ''
  });
  
  function showModal(groupTime = null, group, modif, groups) {
    console.log("groupssssssss", groups);
    setShowForm(!showForm);
    if (groupTime && group && modif) {
      setItem({
        subject: groupTime.nom,
        type: groupTime.type,
        teacher: groupTime.profs,
        id: group.id,
        name: group.groupe_name,
        day: groupTime.day,
        hour: `m${groupTime.time}`,
        week: groupTime.week,
      });
    } else {
      setItem({
        subject:'',
        type:'',
        teacher: '',
        id: '',
        day: groupTime.day,
        hour: `m${groupTime.time}`,
        week: groupTime.week,
        name: group.groupe_name
      })
    }

  }

  const hideForm = () => {
    setShowForm(false);
  }

  const nextWeek = () => {
    //setNameWeek(`S${aujourdhui.week()-1}`);
    const fetchData = async () =>  {
      const data = await fetch("http://localhost:8000/api/planning/nextBloc/"+nameFilter+"_"+levelFilter+"/"+weekFilter)
        .then(response => response.json())
        .then(data => data);
          setData(data);
          setGroups(data[0].jours[0].matieres[0].groupes)     
    };
    fetchData()
    
    console.log("reponse nextWeek :", data);
  }

  const previoustWeek = () => {
    //setNameWeek(`S${aujourdhui.week()-1}`);
    const fetchData = async () =>  {
      const data = await fetch("http://localhost:8000/api/planning/previousBloc/"+nameFilter+"_"+levelFilter+"/"+weekFilter)
        .then(response => response.json())
        .then(data => data);
          setData(data);
          setGroups(data[0].jours[0].matieres[0].groupes)
    };
    fetchData()
  }

  useEffect( () => {
    console.log("debuttttt")
    const fetchData = async () =>  {
    const data = await fetch("http://localhost:8000/api/planning/monBloc/"+nameFilter+"_"+levelFilter+"/"+weekFilter)
    .then(response => response.json())
    .then(data =>  data);
      setData(data);
      //console.log(' DATA IN FETCH', data);
      setGroups(data[0].jours[0].matieres[0].groupes)
    };
    fetchData()
      console.log('DATA\n', data)
    }, []
  );
  console.log("groups::::", groups);

  return (
    <div>
      <NavBar text="PLANNING" />
      <AgendaStyle width={300/widthWeek}>
        <div className="npButton">
          <div className="previousButton">
            <Button onClick={() => previoustWeek()} color="white" background={color.orange} text="<< Previous" radius /> 
          </div>
          <div className="nextButton">
            <Button onClick={() => nextWeek()} color="white" background={color.orange} text="Next >>" width="70px" radius /> 
          </div>
        </div>
        <div className="tabPlanning" >
          <table >
            <thead>
              <tr>
                <th scope="col"></th>
                {data.map(week => {
                  return (
                  <th scope="col" className="thWeek">
                    {week.nom}
                    {groups.map(group => {
                      return <td className="tdGroup">{group.groupe_name}</td>
                    })}
                  </th>)
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="trBody">
                  {days.map(day => {
                    return (
                      <tr className="trDay">
                        <th scope="row">{day.value}</th>
                        {timeline.map(time => {
                          return <tr className="trTime">{time.value}</tr>
                        })}
                      </tr>
                    )
                  })}
                  { data && data.length > 0 &&
                    data.map(week => {
                      return(
                      <th className="thWeekTBody">
                      { week.jours.map(day => {
                        return (
                        <tr>
                        {day.matieres.map(time => {
                          return (
                            <tr> 
                              {time.groupes.map(group => {
                                return <td className="tdValue" datafoo={week.nom}>
                                  {group.timeline.map(groupTime => {
                                    if(groupTime.week === week.nom && groupTime.day === day.jour_name && `m${groupTime.time}` === time.matiere_name && groupTime.nom) {
                                              return(
                                                  <div className="tdColor box" style={{
                                                    backgroundColor: color[groupTime.type]
                                                  }}  onClick={() => showModal(groupTime, group, modif)}>
                                                    <Draggable onDrag onStart={ ()=> console.log('starting')} onStop={ e => console.log('stop', e)}>
                                                          <div>
                                                            <span className="span">{groupTime.nom}</span>
                                                          </div>
                                                    </Draggable>
                                                  </div>
                                              )
                                    }
                                    return(
                                      <div className="tdColor box" onClick={() => showModal(groupTime, group)} >
                                        <Draggable>
                                          <div>
                                            <span className="span"></span>
                                          </div>
                                        </Draggable>
                                      </div>
                                    )
                                  })}
                                </td> })
                              }
                            </tr>
                          )
                        })}
                        </tr>
                        )
                      })}
                      </th>)
                    })
                  }

              </tr>
            </tbody>
          </table>
        </div>
      </AgendaStyle>
      <Modal
          isShowing={showForm}
          title="Plannifier une séance"
          hide={hideForm}
      >
        <FormModal groups={groups} item={item} data={data}/>
      </Modal>
    </div>
  )
}


export default Agenda;