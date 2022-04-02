import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { error_message, success_message } from '../global_state';
import { get_institutions, get_link, link_institution } from '../services';

const Home = () => {

    const [institutions, set_institutions] = useState([]);

    const [link_token, set_link_token] = useState(null);

    const [success, set_success] = useRecoilState(success_message)
    const [error, set_error] = useRecoilState(error_message)
    // const [public_token, set_public_token] = useState(null);

    const link = async () => {
        try{
            const response = await get_link();
            set_link_token(response.link_token)
        }catch(err){
            console.log(err);
        }
    }

    const my_institutions = async () => {
        try{
            const response = await get_institutions();
            set_institutions(response)
            
        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        link();
        my_institutions();
        
    },[])


    const link_bank = async (public_token) => {
        try{
            const response = await link_institution(public_token);
            my_institutions();
            set_success('Successfully added bank account!')
            setTimeout(()=>{set_success('')},4000)
        }catch(err){
            console.log(err);
            set_error('Problem adding bank account!')
            setTimeout(()=>{set_error('')},4000)
        }
    }
    // console.log(link_token);


    const handle_connect = (e) => {
        e.preventDefault()
        const plaid_create =Plaid.create({
            token: link_token,
            onSuccess: (public_token, metadata) => {
                // console.log('SUCESSSS');
                // console.log(public_token);
                link_bank(public_token);
    
            },
            onLoad: () => {
    
            },
            onExit: (err, metadata) => {
                console.log(err);
            },
            onEvent: (eventName, metadata) => {},
            receivedRedirectUri: null,
        });
        plaid_create.open()
    }



    return(
        <div style={{margin: '5%'}} className='p-3'>
            <p className='h2 text-primary'>MY INSTITUTIONS</p>

            
            <div>
                {institutions.map(name => (
                    <div key={name} className='institution-list-item mt-3'>
                        <img src="https://raw.githubusercontent.com/l4z0-space/cdn/0bf6d9ac44a85c6617828d91ce3d1a7b256a2fc6/bgdark.svg"/>
                        <span className='h4'>{name}</span>
                    </div>
                ))}
            </div>

            <div className='btn mt-4 m-auto text-center institution-list-item'>
                <button onClick={handle_connect} className='btn h4'>+ Connect Bank</button>
            </div>

        </div>
    )
}

export default Home;
