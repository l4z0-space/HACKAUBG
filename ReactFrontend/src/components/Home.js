import React from 'react'

const Home = () => {

    let institutions = [
        {name: 'SANTANDER'},
        {name: 'RAIFFAISEN'},
    ]

    return(
        <div style={{margin: '5%'}} className='p-3'>
            <p className='h2 text-primary'>MY INSTITUTIONS</p>

            
            <div>
                {institutions.map(i => (
                    <div key={i.name} className='institution-list-item '>
                        <img src="https://raw.githubusercontent.com/l4z0-space/cdn/0bf6d9ac44a85c6617828d91ce3d1a7b256a2fc6/bgdark.svg"/>
                        <span className='h4'>{i.name}</span>
                    </div>
                ))}
            </div>

            <div className='btn mt-4 m-auto text-center institution-list-item'>
                <span className='h4'>+ Connect Bank</span>
                
            </div>

        </div>
    )
}

export default Home;
