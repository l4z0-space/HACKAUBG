import React, { useEffect, useState } from 'react'
import { get_transactions } from '../services'

const AllTransactions = () => {


    const[transactions, set_transactions] = useState([])

    const fetch_transactions = async () => {
        const data = await get_transactions();
        set_transactions(data);
    }

    useEffect(()=>{
        fetch_transactions();
    },[])


    console.log(transactions);

    return (
        
        <div className='p-3'>
            
            <table id='alltransactkions'>

                <tbody>
                <tr>
                    <td>Amount</td>
                    <td>Currency</td>
                    <td>Date</td>
                    <td>Merchant</td>
                    <td>Payment Channel</td>
                    <td>Category</td>
                    <td>Institution</td>
                </tr>
        
                
                {transactions.map(t => {
                    <tr>
                        <td>{t.amount}</td>
                        <td>{t.currency}</td>
                        <td>{t.date}</td>
                        <td>{t.merchant_name}</td>
                        <td>{t.payment_channel}</td>
                        <td>{t.category}</td>
                        <td>{t.institution}</td>
                    </tr>
                })}
                </tbody>
            </table>
            {/* <script>
            $('#alltransactions').DataTable();

            </script> */}
        </div>

    )
}

export default AllTransactions;
