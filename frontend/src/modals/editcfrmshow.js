import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All CFRM ******************//
export const editCFRMShow = async () => {
    try{
      const a = { orgID: sessionStorage.getItem('org')}
    const resrep = await axios.post(
      `${api}/editcfrmshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`editCFRMShow controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`editCFRMShow controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}

//****************** GET Search CFRM Patient ******************//
export const getCFRMPatient = async () => {
  try{
    const a = { ID: sessionStorage.getItem('searchPatientBtn')}
  const resrep = await axios.post(
    `${api}/getcfrmpatient`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
        console.log(`getCFRMPatient controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getCFRMPatient controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}

//****************** GET CFRM Patient after edit btn clicked ******************//
export const getCFRM = async () => {
  try{
    const a = { ID: sessionStorage.getItem('editServicePatientID')}
  const resrep = await axios.post(
    `${api}/getcfrm`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
        console.log(`getCFRM controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getCFRM controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}