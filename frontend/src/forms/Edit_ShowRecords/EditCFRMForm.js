import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import Modals from "../../components/modal";
import _ from 'lodash';

/////////Form////////////
import CFRMServiceEditForm from "../CFRM/CFRMEditForm"

////////Controls////////
import CFRMPatientSearchBar from "../../components/controls/CFRMPatientSearchBar";

////////API////////
import * as edit from '../../modals/editcfrmshow'

const EditCFRMForm = props => {
    //FPPatientData
  
  const [searchData, setSearchData] = useState([])
  const [tableData, setTableData] = useState([])
    
    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [editPage, setEditPage] = useState(false)

    useEffect(() => {
        const fn = async () => {
          setLoading(true)
          //const patient = await edit.getAllRHPatient()
          const searchData = await edit.editCFRMShow()
          if(searchData)
          {
            setSearchData(searchData.data.data.editCFRMShow)
            //setRHPatientData(patient.data.data.getAllRHPatient)
            console.log("CFRM getPatientForSearch => ", searchData.data.data.editCFRMShow)
          }
          setLoading(false)
        }
    
        fn();
    
      }, []) 

      useEffect(() => {
        const fn = async () => {
    
          const edit = sessionStorage.getItem('editCFRM')
          setEditPage(edit)
          console.log("CFRM edit form show", edit)
        }
        fn();
      }, [sessionStorage.getItem('editCFRM')])


    return(
        <div style={{ background: '#fcf0f2' }}>
      <Modals open={loading} />
      <Card style={{ background: '#fcf0f2' }}>
        {(editPage === "false") ?
          <><Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
            CFRM Information</Typography>
            <CFRMPatientSearchBar placeholder="Enter Patient Name..."  searchData={searchData} /* tableData={RHPatientData} *//></>

          : <CFRMServiceEditForm editPage={editPage}></CFRMServiceEditForm>}


      </Card >

    </div >
    )
}

export default EditCFRMForm;