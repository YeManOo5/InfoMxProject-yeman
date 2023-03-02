import axios from 'axios';
import {api} from '../utils/helper';

//****************** insert CFRM ******************//
export const insertCFRM = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertCFRM`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insertCFRM controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insertCFRM controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** update CFRM ******************//
export const updateCFRM = async (a) => {
  try{
      const resrep = await axios.put(`${api}/updateCFRM`,a, {
          headers: {
            authorization: sessionStorage.getItem('token'),
          },
        },);
        console.log('updateCFRM controller res: ', resrep);
        return resrep;
  }catch (error) {
      console.log('updateCFRM controller error: ', error?.response?.data);
      alert(error?.response?.data?.message);
  }

}

//****************** delete CFRM ******************//
export const deleteCFRM = async (a) => {
  try{
      const resrep = await axios.put(`${api}/deleteCFRM`,a, {
          headers: {
            authorization: sessionStorage.getItem('token'),
          },
        },);
        console.log('deleteCFRM controller res: ', resrep);
        return resrep;
  }catch (error) {
      console.log('deleteCFRM controller error: ', error?.response?.data);
      alert(error?.response?.data?.message);
  }

}