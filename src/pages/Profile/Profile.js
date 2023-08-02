import 'bootstrap/dist/css/bootstrap.css';


import classes from './Profile.module.css'
import { useState,useEffect } from 'react';
import { getCustomers, putProfile } from '../../api';
import BookNow from '../BookNow';



function Profile(){
    const [input,setInput]=useState({
        first_name: '',
        last_name: '',
        rate_code: '',
        address: '',
        street_name: '',
        apartment: '',
        contact_number: '',
        email: '',
      });
   
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const data = await getCustomers();
            const serialNo = localStorage.getItem('serialNo');
            
            
            data.some(obj => {
               
                if (obj.serialNo === serialNo  ){
                    setInput(obj)
                    console.log(obj)
                    return true
                }else{
                    console.log('doesnt work')
                    return false
                }
            })
            
    
            
          } catch (error) {
            console.error('Error fetching user data:', error);
            
          }
        };
    
        fetchUserData();
      },[]);
    


    
      
    const SubmitHandler=async(e)=>{
        e.preventDefault();
        console.log(input)
        try{
            const response=await putProfile(input)
            console.log(response)
            
        }catch(error){
            console.error(error)
        }
       
    }
    const inputhandler=(input,value)=>{
        setInput((prevInput) => {
            return {
              ...prevInput,
              [input]: value,
            };
          });
    }
    return(
        <>
        <div className='container-fluid' style={{padding:'0px'}}>
            <form onSubmit={SubmitHandler}>
                <div className='row ' style={{margin:'10px',padding:'10px'}}>
                    <div className='col-md-6 form-group'>
                        <label>First name</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['first_name']} 
                        onChange={(e)=>{inputhandler('first_name',e.target.value)}}/>
                    </div>
                    <div className='col-md-6 form-group'>
                        <label>Last name</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['last_name']}
                        onChange={(e)=>{inputhandler('last_name',e.target.value)}}/>
                    </div>
                </div>
                <div className='row ' style={{margin:'10px',padding:'10px'}}>
                    <div className='col-md-6 form-group'>
                        <label>Emirate</label>
                        <br/>
                        
                        <select id="Emirate" className='form-control' onChange={(event) =>
                                    inputhandler('rate_code', event.target.value)}
                                    defaultValue={input['rate_code']}>
                                <option value="">Choose Emirates</option>
                                <option value="Sharjah">Sharjah</option>
                                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                <option value="Dubai">Dubai</option>
                                <option value="Umm Al Quwain">Umm Al Quwain</option>
                                <option value="Ajman">Ajman</option>
                                onChange
                            </select>
                    </div>
                    <div className='col-md-6 form-group'>
                        <label>Address</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['address']}
                        onChange={(e)=>{inputhandler('address',e.target.value)}}/>
                    </div>
                </div>
                <div className='row ' style={{margin:'10px',padding:'10px'}}>
                    <div className='col-md-6 form-group'>
                        <label>Street name</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['street_name']}
                        onChange={(e)=>{inputhandler('street_name',e.target.value)}}/>
                    </div>
                    <div className='col-md-6 form-group'>
                        <label>Apartment/Building</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['apartment']}
                        onChange={(e)=>{inputhandler('apartment',e.target.value)}}/>
                    </div>
                </div>
                <div className='row ' style={{margin:'10px',padding:'10px'}}>
                    <div className='col-md-6 form-group'>
                        <label>Contact Number</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['contact_number']}
                        onChange={(e)=>{inputhandler('contact_number',e.target.value)}}/>
                    </div>
                    <div className='col-md-6 form-group'>
                        <label>Email</label>
                        <br/>
                        <input type='email' className='form-control' defaultValue={input['email']}
                        onChange={(e)=>{inputhandler('email',e.target.value)}}/>
                    </div>
                </div>
                <div className='text-center'>

                
                <button type='submit' name='button' className={classes.buttons}>Update Profile</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Profile